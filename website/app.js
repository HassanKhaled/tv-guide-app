/** @constant
    @type {array}
    @global
    @description Hold themes' names.
*/
themes = [{text:'orange'}, {text:'brown'}, {text:'light'},{text:'white'}, {text:'orangeLight'}, {text:'biege'},
{text:'yellow'}, {text:'paleBlue'}, {text:'paleBiege'}, {text:'green'},{text:'pale'}, {text:'blue'}];



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
    @type {object}
    @global
    @description Hold reference drop down menu.
*/
let dropdown = document.querySelector(".dropdown-menu");


/** @constant
    @type {object}
    @global
    @description Hold reference nav bar.
*/
let navbar = document.querySelector(".navbar-nav");

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

fillInThemes();
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
    console.log(tempLi);

    navbar.appendChild(tempLi);
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


fillInLinksInNavBar();
loadThemeFromlocalStorage();





/**
 * @description Handle click event of the dropdown list items
 */
dropdown.addEventListener('click', (e) =>{
  let className  = e.target.innerHTML ;
  document.documentElement.className=className;
  saveThemeTolocalStorage(className);
})