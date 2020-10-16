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

callOnStart("People");
createTempDivsOnContentDiv(10,"temp","#content");

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
 * @description Handle click event of the searchButton
 */
searchButton.addEventListener('click', (e) =>{
    
    
    if(searchInput.checkValidity()){
      
        getPeopleRequest("http://api.tvmaze.com/search/people?q="+searchInput.value);

    }else{
        createAlertWithMessage("alert-danger",3000,"Error  " ,"please fill in required search field",contentDiv);
    }
  });
