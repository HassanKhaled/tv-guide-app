/** @type {array}
*   @global
*   @description Hold results of data.
*/
let results = "";

/** @constant
*   @type {object}
*   @global
*   @description Hold reference drop down menu.
*/
let dropdownOptions = document.querySelector(".options");

/** @constant
*   @type {object}
*   @global
*   @description Hold reference options button .
*/
let optionsButton = document.querySelector("#optionsButton");

/** @constant
*   @type {string}
*   @global
*   @description url search in the api.
*/
 const searchUrl = "http://api.tvmaze.com/search/shows?q=";


/** @constant
*   @type {object}
*   @global
*   @description Hold reference search button .
*/
let searchButton = document.querySelector("#search");


/** @constant
*   @type {object}
*   @global
*   @description Hold reference search term textbox.
*/
let searchInput = document.querySelector("#searchTerm");


/**
 * @description Handle click event of the searchButton
 */
searchButton.addEventListener('click', (e) =>{
   
    let searchUrl  = searchQuery;
    
    if(searchInput.checkValidity()){
        if(searchUrl==="all"){ 
          
            getRequest("http://api.tvmaze.com/search/shows?q="+searchInput.value);

        }else if(searchUrl==="people"){

            getPeopleRequest("http://api.tvmaze.com/search/people?q="+searchInput.value);

        }else if(searchUrl==="tvdb"){
            getSingleRequest(" http://api.tvmaze.com/lookup/shows?thetvdb="+searchInput.value);


        }else if(searchUrl==="imdb"){
            getSingleRequest("http://api.tvmaze.com/lookup/shows?imdb="+searchInput.value);

        }else if(searchUrl==="tvrage"){
            getSingleRequest("http://api.tvmaze.com/lookup/shows?tvrage="+searchInput.value);

        }else if(searchUrl==="single"){
            getSingleRequest("http://api.tvmaze.com/singlesearch/shows?q="+searchInput.value);
        }else{
            createAlertWithMessage("alert-danger",3000,"Error  " ,"please choose a search option before proceeding",contentDiv);
        }

    }else{
        createAlertWithMessage("alert-danger",3000,"Error  " ,"please fill in required search field",contentDiv);
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
            createImageFromUrl(imageExistNotCreateTemp(x.image),x.name,x.url,JSON.stringify(x));
        }
    }catch(error){
        createAlertWithMessage("alert-danger",3000,"Error  " ,error,contentDiv);
    }
}

/**
* @function  getPeopleRequest
* @description get the data from the remote server.
* @param url to be called to get the data requested
*/
getPeopleRequest = async url => {
  
    const response = await fetch(url);
    clearContentOfParentElement(contentDiv);
    try{
        const data = await response.json();
        console.log(data);
        results = data;
        for(item of data){
            const x = item.person;
            console.log(x.name);
            createImageFromUrl(imageExistNotCreateTemp(x.image),x.name,x.url,JSON.stringify(x));
        }
    }catch(error){
        createAlertWithMessage("alert-danger",3000,"Error  " ,error,contentDiv);
    }
}


/**
* @function  getSingleRequest
* @description get the data from the remote server.
* @param url to be called to get the data requested
*/
getSingleRequest = async url => {
  
    const response = await fetch(url);
    clearContentOfParentElement(contentDiv);
    try{
        const data = await response.json();
        console.log(data);
        results = data;
        
            const x = data;
            console.log(x.name);

            createImageFromUrl(imageExistNotCreateTemp(x.image),x.name,x.url,JSON.stringify(x));

        
    }catch(error){
        createAlertWithMessage("alert-danger",3000,"Error  " ,error,contentDiv);
    }
}


createTempDivsOnContentDiv(10,"temp","#content");


/**
 * @description Handle click event of the contentDiv
 */
contentDiv.addEventListener("click", (e)=>{

console.log(e.target);
const data = JSON.parse(e.target.getAttribute("data-value"));
console.log(data);

if(searchQuery==="all"){
    clearBySelector(".modal-title")
    changeInnerHtmlContentUsingSelector(".modal-title",data.name)

    let content =""; 
    content += data.type+" | ";
    content += data.runtime+" Min | ";
    content += data.language+" | ";
    content += arrayIntoString(data.genres)+" | ";
    content += data.premiered+" | ";

    if(data.network!==null){
        content+=data.network.country.name+" | ";
    }else{
        content += "No Network |";
    }
    content += data.status;

    changeInnerHtmlContentUsingSelector("#info",content);
    changeInnerHtmlContentUsingSelector("#summary",data.summary);
    imageCreationIfExist(data.image,data.image.medium,"../website/images/missing.png","#modalImage");

    if(data.network!==null){
        flageImg.setAttribute("src",imageFlageFromCode( data.network.country.code));
    }else{
        flageImg.setAttribute("src",imageFlageFromCode( "un"));
    }
    changeHrefContentUsingSelector("#official",data.officialSite);
    changeHrefContentUsingSelector("#Tvmaz",data.url);

}else if(searchQuery==="people"){

clearBySelector(".modal-title");
changeInnerHtmlContentUsingSelector(".modal-title",data.name)

let content =""; 
    if(data.birthday!==null){
        content += data.birthday+" | ";
    }else {
        content +="No birthday | "
    }

    if( data.country!==null){
        content += data.country.name+" | ";
    }else{
        content +="No Country | ";
    }
    if(data.gender!==null){
        content += data.gender;
    }else{
        content +="No Gender | ";    
    }

changeInnerHtmlContentUsingSelector("#info",content);
changeInnerHtmlContentUsingSelector("#summary","We do not have any biography for this actor or actress");
imageCreationIfExist(data.image,data.image.medium,"../website/images/missing.png","#modalImage");

    if(data.country!==null){
        flageImg.setAttribute("src",imageFlageFromCode( data.country.code));
    }else{
        flageImg.setAttribute("src",imageFlageFromCode( "un"));
    }
changeHrefContentUsingSelector("#Tvmaz",data.url);
}else {
    console.log(data);

    clearBySelector(".modal-title")
    changeInnerHtmlContentUsingSelector(".modal-title",data.name)

    let content =""; 
    content += data.type+" | ";
    content += data.runtime+" Min | ";
    content += data.language+" | ";
    content += arrayIntoString(data.genres)+" | ";
    content += data.premiered+" | ";

    if(data.network!==null){
        content+=data.network.country.name+" | ";
    }else{
        content += "No Network |";
    }

    content += data.status;

    changeInnerHtmlContentUsingSelector("#info",content);
    changeInnerHtmlContentUsingSelector("#summary",data.summary);
    imageCreationIfExist(data.image,data.image.medium,"../website/images/missing.png","#modalImage");

    if(data.network!==null){
        flageImg.setAttribute("src",imageFlageFromCode( data.network.country.code));
    }else{
        flageImg.setAttribute("src",imageFlageFromCode( "un"));
    }
    changeHrefContentUsingSelector("#official",data.officialSite);
    changeHrefContentUsingSelector("#Tvmaz",data.url);

}
});

dropdownOptions.addEventListener('click', (e) =>{
    searchQuery = e.target.innerHTML ;
    removeClassFromChildrenOFElem("active",dropdownOptions);
    e.target.classList.add("active");
    optionsButton.innerHTML= searchQuery;

  });

fillInDropDownFromList(".options", options, "option",false);

callOnStart("Search");
