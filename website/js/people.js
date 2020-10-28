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
*   @description Hold reference roles list .
*/
let rolesList = document.querySelector("#roles");

/** @constant
*   @type {object}
*   @global
*   @description Hold reference crew list .
*/
let crewList = document.querySelector("#crew");

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

        fragment = new DocumentFragment();

        for(item of data){
            const x = item.person;
            console.log(x.name);
            fragment.appendChild( createImageFromUrl(imageExistNotCreateTemp(x.image),x.name,x.url,JSON.stringify(x)));
        }
        contentDiv.appendChild(fragment);

    }catch(error){
        createAlertWithMessage("alert-danger",3000,"Error  " ,error,contentDiv);
    }
}




/**
* @function  getPeopleCastCredits
* @description get cast createdits of an person using it's id .
* @param id of people we search for 
*/
getPeopleCastCredits = async id => {
    results=[];
    const response = await fetch(` http://api.tvmaze.com/people/${id}/castcredits?embed=show`);
    clearBySelector("#roles");
    fillListHeaderFromContentUsingRefrence(rolesList,"Roles ")
   
    
    try{
        const data = await response.json();
        
        for(item of data){

            let tempLi = document.createElement("li");
            tempLi.innerHTML=item._embedded.show.name;
            tempLi.setAttribute("href",item._embedded.show.url);
            tempLi.classList.add("list-group-item");
            rolesList.appendChild(tempLi);
     
            results.push({"name":item._embedded.show.name,"url":item._embedded.show.url});
        }
       
    }catch(error){
        console.log(error);
        createAlertWithMessage("alert-danger",3000,"Error  " ,error,contentDiv);
    }
}

/**
* @function  getPeopleCastCredits
* @description get cast createdits of an person using it's id .
* @param id of people we search for 
*/
getPeopleCrewCredits = async id => {
    clearBySelector("#crew");
    fillListHeaderFromContentUsingRefrence(crewList,"Crew ")

    results=[];
    const response = await fetch(` http://api.tvmaze.com/people/${id}/crewcredits?embed=show`);

    try{
        const data = await response.json();
        
        for(item of data){

            let tempLi = document.createElement("li");
            tempLi.innerHTML=item._embedded.show.name+`(${item.type})` ;
            
            tempLi.classList.add("list-group-item");
            crewList.appendChild(tempLi);
     
            results.push({"name":item._embedded.show.name,"url":item._embedded.show.url});
        }
       
    }catch(error){
        console.log(error);
        createAlertWithMessage("alert-danger",3000,"Error  " ,error,contentDiv);
    }
}


/**
 * @description Handle click event of the contentDiv
 */
searchButton.addEventListener('click', (e) =>{
    
    
    if(searchInput.checkValidity()){
      
        getPeopleRequest("http://api.tvmaze.com/search/people?q="+searchInput.value);

    }else{
        createAlertWithMessage("alert-danger",3000,"Error  " ,"please fill in required search field",contentDiv);
    }
  });


contentDiv.addEventListener("click", (e)=>{

    console.log(e.target);
    const data = JSON.parse(e.target.getAttribute("data-value"));
    console.log(data);

    clearBySelector(".modal-title");
changeInnerHtmlContentUsingSelector(".modal-title",data.name)

let content =""; 

   getPeopleCastCredits(data.id);
   getPeopleCrewCredits(data.id); 

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
    if(data.image!==null){
         imageCreationIfExist(data.image,data.image.medium,"../website/images/missing.png","#modalImage");
    }else{
        document.querySelector("#modalImage").src="../website/images/missing.png";
    }
    if(data.country!==null){
        flageImg.setAttribute("src",imageFlageFromCode( data.country.code));
    }else{
        flageImg.setAttribute("src",imageFlageFromCode( "un"));
    }
    changeHrefContentUsingSelector("#Tvmaz",data.url);
    console.log("Cast Credits ",results);
    //fillList(results);
  });
