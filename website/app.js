/** @constant
    @type {array}
    @global
    @description Hold themes' names.
*/
themes = [{text:'orange'}, {text:'brown'}, {text:'light'},{text:'white'}, {text:'orangeLight'}, {text:'biege'},
{text:'yellow'}, {text:'paleBlue'}, {text:'paleBiege'}, {text:'green'},{text:'pale'}, {text:'blue'}];


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
    
    try{
        const data = await response.json();
        console.log(data);
        for(item of data){
            const x = item.show;
            console.log(x.name);
            
            createImageFromUrl(x.image.medium,x.name);
        }


    }catch(error){

    }
}

/**
* @function  createImageFromUrl
* @description get url and convert into an image element and added to the content div.
* @param url to be convernted into an image 
* @param alt to be the name of the show
*/
createImageFromUrl = (url,alt) =>{
    const img = document.createElement("img");
    img.setAttribute("src",url);
    img.setAttribute("alt",alt);
    img.setAttribute("title",alt);
    img.classList.add("img-thumbnail");
    img.classList.add("mb-1");
    

    console.log(img);
    contentDiv.appendChild(img);
}

