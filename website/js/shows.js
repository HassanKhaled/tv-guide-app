
callOnStart("Shows");
createTempDivsOnContentDiv(10,"temp","#content");

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

/** @constant
*   @type {object}
*   @global
*   @description Hold reference episodeList list.
*/
let episodeList = document.querySelector("#episodes");


/** @type {array}
*   @global
*   @description Hold results of data.
*/
let results = "";

/** @type {array}
*   @global
*   @description Hold episodes of data.
*/
let episodes = "";

/** @type {array}
*   @global
*   @description Hold cast of data.
*/
let cast = "";


/** @type {array}
*   @global
*   @description Hold crew of data.
*/
let crew = "";

/** @type {array}
*   @global
*   @description Hold crew of data.
*/
let aka = "";


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
 * @description Handle click event of the contentDiv
 */
searchButton.addEventListener('click', (e) =>{
    
    
    if(searchInput.checkValidity()){
        getRequest("http://api.tvmaze.com/search/shows?q="+searchInput.value);

    }else{
        createAlertWithMessage("alert-danger",3000,"Error  " ,"please fill in required search field",contentDiv);
    }
  });


/**
* @function  getRequestandFill
* @description get data from endpoint and fill in a list .
* @param url to get data of 
* @param list
*/
getRequestandFill = async (url,list)=> {
    
    clearBySelector("#episodes");
    fillListHeaderFromContentUsingRefrence(episodeList,"Episodes ");

    list=[];
    const response = await fetch(url);

    try{
        const data = await response.json();
        console.log(data);
        for(item of data){

            let tempLi = document.createElement("li");
            tempLi.innerHTML=`${item.name} Ep:${item.number} S:${item.season} Aird: ${item.airdate} @ ${item.airstamp}  ${item.summary}` ;
            tempLi.classList.add("list-group-item");
            episodeList.appendChild(tempLi);
     
        }
       
    }catch(error){
        console.log(error);
        createAlertWithMessage("alert-danger",3000,"Error  " ,error,contentDiv);
    }
}


contentDiv.addEventListener("click", (e)=>{

    console.log(e.target);
    const data = JSON.parse(e.target.getAttribute("data-value"));
    getRequestandFill(`http://api.tvmaze.com/seasons/${data.id}/episodes`,episodes);

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
    console.log(episodes);

});
