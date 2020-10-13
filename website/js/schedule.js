/** @constant
*   @type {array}
*   @global
*   @description Hold Countries' names.
*/
const countries = [{text:'USA',value:'US'},{text:'Canada',value:'CA'},{text:'United Kingdom',value:"GB"},
             {text:'France',value:"FR"}, {text:'Germany',value:"DE"},
             {text:'Russia',value:"RU"}];


fillInDropDownFromList(".countries", countries, "",false);
callOnStart("Schedule");
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
        console.log(error);
    }
}

  
/**
 * @description Handle click event of the searchButton
 */
searchButton.addEventListener('click', (e) =>{

    if(searchDateInput.checkValidity()){
        
        getRequest(`http://api.tvmaze.com/schedule?country=${selectedCountry}&date=${searchDateInput.value}`);

    }else{
        createAlertWithMessage("alert-danger",3000,"Error  " ,"please fill in required search field",contentDiv);
    }
  });
