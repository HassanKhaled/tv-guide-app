/** @constant
*    @type {array}
*   @global
*   @description Hold themes' names.
*/
const themes = [{text:'orange'}, {text:'brown'}, {text:'light'},{text:'white'}, {text:'orangeLight'}, {text:'biege'},
{text:'yellow'}, {text:'paleBlue'}, {text:'paleBiege'}, {text:'green'},{text:'pale'}, {text:'blue'}];

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
    @type {array}
    @global
    @description Hold links' names and hrefs.
*/
links = [ {link:"",text:"Search"},
          {link:"",text:"Schedule"},
          {link:"",text:"Shows"},
          {link:"",text:"Episodes"},
          {link:"",text:"People"}];


/** @constant
*   @type {object}
*   @global
*   @description Hold reference drop down menu.
*/
let dropdown = document.querySelector(".dropdown-menu");

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
let navbar = document.querySelector(".navbar-nav");


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
* @function  fillInThemes
* @description fill in the themes in the dropdown list .
*/
fillInThemes = ()=> {
    for( theme of themes){
        let temp = document.createElement("a");
        temp.classList.add("dropdown-item");
        temp.appendChild(document.createTextNode(theme.text));
        dropdown.appendChild(temp);
    }
}


/**
* @function  createAnchorFromTextAndHref
* @description fill in the linkes in the nav bar and highlighted active link .
* @param text to be shown inside the anchor 
* @param href to be used in teh anchor 
* @returns object to refrences to anchor 
*/
createAnchorFromTextAndHref = ( text, href)=>{
    let anchor = document.createElement("a");
    anchor.appendChild(document.createTextNode(text));
    anchor.setAttribute("href",href);
    anchor.classList.add("nav-link");
    return anchor;
}

/**
* @function  createListItemWithAnchor
* @description fill in the linkes in the nav bar and highlighted active link .
* @param activeLink to be highlighted active in nav bar
*/
createListItemWithAnchor = (text, href) => {
    let tempLi = document.createElement("li");
    tempLi.classList.add("nav-item");
    tempLi.appendChild(createAnchorFromTextAndHref(text,href));
    navbar.insertBefore(tempLi,navbar.childNodes[0]);
}


/**
* @function  fillInLinksInNavBar
* @description fill in the linkes in the nav bar and highlighted active link .
* @param activeLink to be highlighted active in nav bar
*/
fillInLinksInNavBar = ()=> {
    for( link of links){
        createListItemWithAnchor(link.text,link.href);
    }
}


/**
* @function  saveThemeTolocalStorage
* @description save selected theme into the local storage .
* @param theme to be saved to teh local storage
*/
saveThemeTolocalStorage = (theme)=>{
    localStorage.setItem("theme",theme);
}


/**
* @function  loadThemeFromlocalStorage
* @description save selected theme into the local storage .
* @param theme to be saved to teh local storage
*/
loadThemeFromlocalStorage = ()=>{
    document.documentElement.className=localStorage.getItem("theme");
}


/**
* @function  callOnStart
* @description call on the start of the loading of the file .
*/
callOnStart = ()=>{
    links= links.reverse();
    fillInThemes();
    fillInLinksInNavBar();
    loadThemeFromlocalStorage();
}

callOnStart();

/**
 * @description Handle click event of the dropdown list items
 */
dropdown.addEventListener('click', (e) =>{
  let className  = e.target.innerHTML ;
  document.documentElement.className=className;
  saveThemeTolocalStorage(className);
});

/**
 * @description Handle click event of the dropdown list items
 */
searchButton.addEventListener('click', (e) =>{
    getRequest(searchUrl+searchInput.value);
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
            
            createImageFromUrl(x.image.medium,x.name,x.url,JSON.stringify(x));
        }
    }catch(error){
        console.log(error);
    }
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
document.querySelector("#modalImage").src = data.image.medium;
document.querySelector("#official").href=data.officialSite;
document.querySelector("#Tvmaz").href=data.url;
console.log(data.summary);
document.querySelector("#summary").innerHTML=data.summary;
});

CreateImage =  src =>{
    const img = document.createElement("img");
    img.setAttribute("src",src);
    img.classList.add("img-thumbnail");
    img.classList.add("mb-1");
    img.classList.add("ml-1");
    return img
}

clearBySelector = selector =>{
    document.querySelector(selector).innerHTML="";
}

arrayIntoString = array =>{

return array.join(", ");
}

createDiv = text =>{

const div=  document.createElement("div");
const textNode = document.createTextNode(text);
div.innerHTML="";
div.appendChild(textNode);
return div;
}

imageFlageFromCode = code =>{
    return `https://flagcdn.com/32x24/${code.toLowerCase()}.png`;
}
