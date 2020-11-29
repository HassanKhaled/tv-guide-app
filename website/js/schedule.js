/** @constant
*   @type {array}
*   @global
*   @description Hold Countries' names.
*/
const countries = [{text:'USA',value:'US'},{text:'Canada',value:'CA'},{text:'United Kingdom',value:"GB"},
             {text:'France',value:"FR"}, {text:'Germany',value:"DE"},
             {text:'Russia',value:"RU"}];


fillInDropDownFromList(".countries", countries, "",false);
callOnStart("Schedule",false);
createTempDivsOnContentDiv(10,"tempTop","#content");

/** @constant
*   @type {object}
*   @global
*   @description Hold reference search term textbox.
*/
let searchDateInput = document.querySelector("#searchDateTerm");

/** @constant
*   @type {object}
*   @global
*   @description Hold reference search button .
*/
let searchButton = document.querySelector("#search");

/** @constant
*   @type {object}
*   @global
*   @description Hold reference drop down countries.
*/
let countriesDropDown = document.querySelector(".countries");


/** @constant
*   @type {object}
*   @global
*   @description Hold reference drop down countries.
*/
let badageSpan = document.querySelector(".badge");

/** @constant
*   @type {string}
*   @global
*   @description selecte country.
*/
let selectedCountry = "";


/**
* @function  searchCountries
* @description fill in the linkes in the nav bar and highlighted active link .
* @param searchTerm to be searched by in the countries list 
* @return country code to be used later.
*/
searchCountries =(searchTerm)=> {
    for( country of countries){
        if(country.text===searchTerm)
            return country.value;
    }
}

countriesDropDown.addEventListener('click', (e) =>{
    
    let className  = e.target.innerHTML ;
    removeClassFromChildrenOFElem("active",countriesDropDown);
    selectedCountry = searchCountries(className);
    badageSpan.innerHTML=selectedCountry;
    e.target.classList.add("active");
    
  });


/**
* @function  getRequest
* @description get the data from the remote server.
* @param url to be called to get the data requested
*/
getRequest = async url => {
  
    const response = await fetch(url);
    
    try{
        const data = await response.json();
        results = data;

        //console.log(data);
        clearContentOfParentElement(contentDiv);
        fragment = new DocumentFragment();

        for(item of data){
            const x = item;
           
            fragment.appendChild(createImageFromUrlForSchedul(imageExistNotCreateTemp(x.show.image),x.name,x.url,x));
        }
        contentDiv.appendChild(fragment);
        

    }catch(error){
        console.error(error);
        createAlertWithMessage("alert-danger",3000,"Error  " ,error,contentDiv);
    }
}

  
/**
 * @description Handle click event of the searchButton
 */
searchButton.addEventListener('click', (e) =>{
    //searchDateInput.value=document.getElementById("birthday").value;
     
    if(searchDateInput.checkValidity()){
        if(selectedCountry===""){
            selectedCountry="US";
            badageSpan.innerHTML="US";
        }
        getRequest(`http://api.tvmaze.com/schedule?country=${selectedCountry}&date=${searchDateInput.value}`);

    }else{
        createAlertWithMessage("alert-danger",3000,"Error  " ,"please fill in required search field",contentDiv);
    }
  });
