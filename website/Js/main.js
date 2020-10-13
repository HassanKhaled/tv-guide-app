/** @constant
*   @type {array}
*   @global
*   @description Hold themes' names.
*/
const themes = [{text:'orange'}, {text:'brown'}, {text:'light'},{text:'white'}, {text:'orangeLight'}, {text:'biege'},
{text:'yellow'}, {text:'paleBlue'}, {text:'paleBiege'}, {text:'green'},{text:'pale'}, {text:'blue'}];

/** @constant
*   @type {array}
*   @global
*   @description Hold fonts' names.
*/
const fonts = [{text:'Acme'},{text:'Oswald'},{text:"Ubuntu"},{text:"Bebas Neue"}, {text:"Luckiest Guy"},
             {text:"Jockey One"},{text:"Quantico"},{text:"Black Ops One"},{text:"Boogaloo"},{text:"Shrikhand"}  ];


/** @constant
    @type {array}
    @global
    @description Hold links' names and hrefs.
*/
links = [ {href:"../website/index.html",text:"Search"},
          {href:"../website/schedule.html",text:"Schedule"},
          {href:"../website/shows.html",text:"Shows"},
          {href:"../website/episodes.html",text:"Episodes"},
          {href:"../website/people.html",text:"People"}];

/** @constant
*   @type {object}
*   @global
*   @description Hold reference drop down menu.
*/
let dropdown = document.querySelector(".themes");


/** @constant
*   @type {object}
*   @global
*   @description Hold reference drop down menu.
*/
let dropdownFonts = document.querySelector(".fonts");

/** @constant
*   @type {object}
*   @global
*   @description Hold reference search button .
*/
let navbar = document.querySelector(".navbar-nav");


/**
* @function  fillInDropDownFromList
* @description fill in the themes in the dropdown list .
* @param dropdownSelector selects the correct drowpdown to be filled in 
* @param list of items to be filled in the dropdown 
* @param localStorageSelector to set active item in the dropdown 
* @param setFontStyle to set font style when it is true 
*/
fillInDropDownFromList = (dropdownSelector, list, localStorageSelector,setFontStyle)=> {

    let dDown = document.querySelector(dropdownSelector);

    for(item of list){
        let temp = document.createElement("a");
        temp.classList.add("dropdown-item");
        setActiveItemInDropDown(item,localStorageSelector,temp);
        if(setFontStyle===true)
            temp.style.fontFamily=item.text;
        
        temp.appendChild(document.createTextNode(item.text));
        dDown.appendChild(temp);
    }
}


/**
* @function  setActiveItemInDropDown
* @description set crosspronding theme name in dropdownn to active.
* @param item by which we choose the right element to add active class to 
* @param storage item from localstorage name 
* @param temp element with a specific theme to adding active class to 
*/
setActiveItemInDropDown = (item ,storage,temp)=> {        
        if(item.text===localStorage.getItem(storage)){
            temp.classList.add("active");
        }
}



/**
* @function  saveTolocalStorage
* @description save selected font into the local storage .
* @param item to be saved to the local storage
* @param key to be save teh data under 
*/
saveTolocalStorage = (key,item)=>{
    localStorage.setItem(key,item);
}

/**
* @function  loadFontFromlocalStorage
* @description load selected theme into the local storage .
*/
loadFontFromlocalStorage = ()=>{
    document.body.style.fontFamily=localStorage.getItem("font");
}

/**
* @function  createAlertWithMessage
* @description creates new alert and make it disappear.
* @param type class of the alert affects the color of the alert 
* @param time before the the alert will disappear 
* @param head message to be shown on the page 
* @param msg message to be shown on the page 
* @param parent of the alert to be shown inside 
*/
createAlertWithMessage = (type,time,head,msg,parent)=>{
    let alert = document.createElement("div");
        alert.classList.add("alert");
        alert.classList.add(type);
        alert.classList.add("alert-dismissible");
        alert.setAttribute("id","myAlert");
        
        let alertClose =  document.createElement("button");
        alertClose.setAttribute("type","button");
        alertClose.setAttribute("class","close");
        alertClose.setAttribute("data-dismiss","alert");
        alertClose.innerHTML="&times;";

        let strong = document.createElement("strong");
        strong.innerHTML=head;
        alert.appendChild(strong);

        alert.appendChild(alertClose);

        let message =  document.createTextNode(msg);
 
        alert.appendChild(message);
        parent.appendChild(alert);
        setInterval(function(){   $("#myAlert").alert("close"); }, time);
}

/**
* @function  imageCreationIfExist
* @description image loads when exist in source other wise load alternatives .
* @param source of the image to check if exist 
* @param image in the source if exist to be shown  
* @param alternative if source does not exist load alternative image 
* @param selector selects the image container to present image in   
*/
imageCreationIfExist = (source, image, alternative,selector)=>{

    let imageFrame = document.querySelector(selector);   
    if(source!==null){ 
        imageFrame.src = image;
    }else{
        imageFrame.src = alternative;
    }
}

/**
* @function  changeInnerHtmlContentUsingSelector 
* @description change the innerHTML content of the selected element usinng selector.
* @param selector upone we select the element to change it's content 
* @param content of to be fill in the innerHTML of selected element 
  
*/
changeInnerHtmlContentUsingSelector = (selector,content)=>{ document.querySelector(selector).innerHTML=content; }

/**
* @function  changeHrefContentUsingSelector 
* @description change the href of the selected element usinng selector.
* @param selector upone we select the element to change it's content 
* @param href of to be fill in the href of selected element  
*/
changeHrefContentUsingSelector = (selector,href)=>{ document.querySelector(selector).href=href; }

/**
* @function  clearBySelector
* @description removed content of an element by removing all inner html content.
* @param selector to remove all of it's children
*/
clearBySelector = selector =>{ document.querySelector(selector).innerHTML="";}

/**
* @function  loadThemeFromlocalStorage
* @description load selected theme into the local storage .
*/
loadThemeFromlocalStorage = ()=>{
    document.documentElement.className=localStorage.getItem("theme");
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
* @description fill in the linkes in the nav bar and highlighted active link.
* @param text to be shown in the anchor.
* @param href of the anchor to be shown.
* @param activeLink to be highlighted active in nav bar
*/
createListItemWithAnchor = (text, href,activeLink) => {
    let tempLi = document.createElement("li");
    tempLi.classList.add("nav-item");
    if(activeLink===text){
        tempLi.classList.add("active");
    } 

    tempLi.appendChild(createAnchorFromTextAndHref(text,href));
    navbar.insertBefore(tempLi,navbar.childNodes[0]);
}

/**
* @function  fillInLinksInNavBar
* @description fill in the linkes in the nav bar and highlighted active link .
* @param activeLink to be highlighted active in nav bar
*/
fillInLinksInNavBar =(activeLink)=> {
    for( link of links){
        createListItemWithAnchor(link.text,link.href,activeLink);
    }
}

/**
* @function  callOnStart
* @description call on the start of the loading of the file .
*/
callOnStart = (selecteLink)=>{

    links= links.reverse();
    fillInDropDownFromList(".fonts", fonts, "font",true);
    fillInDropDownFromList(".themes", themes, "theme",false);
    fillInLinksInNavBar(selecteLink);
    loadThemeFromlocalStorage();
    loadFontFromlocalStorage();
    
}

/**
 * @description Handle click event of the dropdown list items
 */
dropdown.addEventListener('click', (e) =>{
    let className  = e.target.innerHTML ;
    document.documentElement.className=className;
    removeClassFromChildrenOFElem("active",dropdown);
    e.target.classList.add("active");
    saveTolocalStorage("theme",className);
  });
  

  /**
 * @description Handle click event of the dropdown list items
 */
dropdownFonts.addEventListener('click', (e) =>{
    let className  = e.target.innerHTML ;
    document.body.style.fontFamily = className;
    removeClassFromChildrenOFElem("active",dropdownFonts);
    e.target.classList.add("active");
    saveTolocalStorage("font",className);
  });
  
  
