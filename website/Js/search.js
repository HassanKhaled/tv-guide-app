/** @type {array}
*   @global
*   @description Hold results of data.
*/
let results = "";

/** @constant
*   @type {string}
*   @global
*   @description url search in the api.
*/
 const searchUrl = "http://api.tvmaze.com/search/shows?q=";

/** @constant
*   @type {object}
*   @global
*   @description Hold reference glage image 
*/
let flageImg = document.querySelector("#flage");


/** @constant
*   @type {object}
*   @global
*   @description Hold reference search button .
*/
let searchButton = document.querySelector("#search");

/** @constant
*   @type {object}
*   @global
*   @description Hold reference to content div .
*/
let contentDiv = document.querySelector("#content");


/** @constant
*   @type {object}
*   @global
*   @description Hold reference search term textbox.
*/
let searchInput = document.querySelector("#searchTerm");


/**
* @function  removeClassFromChildrenOFElem
* @description removes a specific class from children of the elem .
* @param cal class to be removed from the children of the elem
* @param elem father of the element we want ot remove cal from 
*/
removeClassFromChildrenOFElem = (cal , elem) => {        
   
        for(theme of elem.children){
            theme.classList.remove(cal);
        }
    
}






/**
 * @description Handle click event of the searchButton
 */
searchButton.addEventListener('click', (e) =>{
    if(searchInput.value!==""){
    getRequest(searchUrl+searchInput.value);
    }else{
        getRequest(searchUrl+"missing");
    }
  });

/**
* @function  getRequest
* @description get the data from the remote server.
* @param url to be called to get the data requested
*/
getRequest = async url => {
  
    const response = await fetch(url);
    clearContentOfParentElement(contentDiv);
    try{
        const data = await response.json();
        console.log(data);
        results = data;
        for(item of data){
            const x = item.show;
            console.log(x.name);
            createImageFromUrl(imageExistNotCreateTemp(x.image),x.name,x.url,JSON.stringify(x));
        }
    }catch(error){
        console.log(error);
    }
}
/**
* @function  imageExistNotCreateTemp
* @description get url and convert into an image element and added to the content div.
* @param image to be convernted into an image 
* @returns image path to be shown on the page
*/
imageExistNotCreateTemp = image =>{
    let temp="";
    if(image===null){
        temp ="../website/images/missing.png";
    }else{
        temp=image.medium;
    }
return temp;
}

/**
* @function  createImageFromUrl
* @description get url and convert into an image element and added to the content div.
* @param src to be convernted into an image 
* @param alt to be the name of the show
*/
createImageFromUrl = (src,alt,href,info) =>{
    const div = document.createElement("div");
    div.classList.add("cont");
  
    const img = document.createElement("img");
    img.setAttribute("src",src);
    img.setAttribute("href",href);
    img.setAttribute("alt",alt);
    img.setAttribute("title",alt);
    img.setAttribute("data-value",info);
    img.setAttribute("data-toggle","modal");
    img.setAttribute("data-target","#myModal");
    img.classList.add("img-thumbnail");
    img.classList.add("mb-1");
    img.classList.add("ml-1");
    const text = document.createElement("div");
    text.classList.add("text-block");
    text.innerHTML=alt;

    div.appendChild(img);
    div.appendChild(text);
    contentDiv.appendChild(div);
}



/**
* @function  createTempDivsOnContentDiv
* @description adds as mnay as number of temp elements to the Content Div.
* @param num number of elements added
*/
createTempDivsOnContentDiv = num =>{

    for(let i =0 ; i<num;i++){
        let div =document.createElement("div");
        div.classList.add("ml-1");
        div.classList.add("mb-1");
        div.classList.add("temp");
        contentDiv.appendChild(div);
    }

}

createTempDivsOnContentDiv(10);

/**
* @function  clearContentOfParentElement
* @description removed content of an element by removing all of it's children.
* @param ele to remove all of it's children
*/
clearContentOfParentElement = ele =>{    
     ele.innerHTML="";
}


contentDiv.addEventListener("click", (e)=>{
console.log(e.target);
const data = JSON.parse( e.target.getAttribute("data-value"));
console.log(data);
clearBySelector(".modal-title")
document.querySelector(".modal-title").innerHTML= data.name;


//document.querySelector(".modal-subtitle").innerHTML=data.runtime+"Min | "+arrayIntoString(data.genres)+" | "+data.premiered+" | "+data.network.country.name;
flageImg.setAttribute("src",imageFlageFromCode(data.network.country.code));
//clearBySelector(".modal-body");
document.querySelector("#info").innerHTML= data.type+" | "+data.runtime+" Min | "+data.language+" | "+arrayIntoString(data.genres)+" | "+data.premiered+" | "+data.network.country.name+" | "+data.status;
if(data.image!==null){ 
    document.querySelector("#modalImage").src = data.image.medium;
}else{
    document.querySelector("#modalImage").src = "../website/images/missing.png";
}
document.querySelector("#official").href=data.officialSite;
document.querySelector("#Tvmaz").href=data.url;
console.log(data.summary);
document.querySelector("#summary").innerHTML=data.summary;
});


/**
* @function  clearBySelector
* @description removed content of an element by removing all inner html content.
* @param selector to remove all of it's children
*/
clearBySelector = selector =>{ document.querySelector(selector).innerHTML="";}

/**
* @function  arrayIntoString
* @description convert array of strings into a string .
* @param array to be converted into string 
* @returns array as a continous array 
*/
arrayIntoString = array =>{ return array.join(", ");}

/**
* @function  imageFlageFromCode
* @description takes code of the country and convert it into a flag using flagcdn.
* @param code of the country 
* @returns  url of the flagcdn of the requested country's flag
*/
imageFlageFromCode = code =>{ return `https://flagcdn.com/32x24/${code.toLowerCase()}.png`; }
