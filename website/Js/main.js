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
* @function  fillInFonts
* @description fill in the fonts in the dropdown list .
*/
fillInFonts = ()=> {
    for( font of fonts){
        let temp = document.createElement("a");
        temp.classList.add("dropdown-item");
        temp.style.fontFamily=font.text;
        //setActiveThemeInDropDown(theme,temp);

        temp.appendChild(document.createTextNode(font.text));
        dropdownFonts.appendChild(temp);
    }
}

/**
* @function  fillInThemes
* @description fill in the themes in the dropdown list .
*/
fillInThemes = ()=> {
    for( theme of themes){
        let temp = document.createElement("a");
        temp.classList.add("dropdown-item");

        setActiveThemeInDropDown(theme,temp);

        temp.appendChild(document.createTextNode(theme.text));
        dropdown.appendChild(temp);
    }
}

/**
* @function  setActiveThemeInDropDown
* @description set crosspronding theme name in dropdownn to active.
* @param theme by which we choose the right element to add active class to 
* @param temp element with a specific theme to adding active class to 
*/
setActiveThemeInDropDown = (theme ,temp)=> {        
        if(theme.text===localStorage.getItem("theme")){
            temp.classList.add("active");
        }
}




/**
* @function  saveFontTolocalStorage
* @description save selected font into the local storage .
* @param font to be saved to the local storage
*/
saveFontTolocalStorage = (font)=>{
    localStorage.setItem("font",font);
}


/**
* @function  loadFontFromlocalStorage
* @description load selected theme into the local storage .
*/
loadFontFromlocalStorage = ()=>{
    document.body.style.fontFamily=localStorage.getItem("font");
}


/**
* @function  saveThemeTolocalStorage
* @description save selected theme into the local storage .
* @param theme to be saved to the local storage
*/
saveThemeTolocalStorage = (theme)=>{
    localStorage.setItem("theme",theme);
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

        //document.querySelector("#myAlert").display="block";
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
* @function  returnNoneIfDoesNotExist 
* @description if the source exist return it's content  otherwise returns None.
* @param source of the string to presente on the page  
* @returns string to be presented in the page   
*/
returnNoneIfDoesNotExist = (source,content,msg,container)=>{


   // return  source!==null?content:msg;
    if(source!==null){
        container+= content;
    }else{
        container+= msg;
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
callOnStart = ()=>{
    links= links.reverse();
    fillInThemes();
    fillInFonts();
    fillInLinksInNavBar("Search");
    loadThemeFromlocalStorage();
    loadFontFromlocalStorage();
    
}

callOnStart();

/**
 * @description Handle click event of the dropdown list items
 */
dropdown.addEventListener('click', (e) =>{
    let className  = e.target.innerHTML ;
    document.documentElement.className=className;
    removeClassFromChildrenOFElem("active",dropdown);
    
    e.target.classList.add("active");
    saveThemeTolocalStorage(className);
  });
  

  /**
 * @description Handle click event of the dropdown list items
 */
dropdownFonts.addEventListener('click', (e) =>{
    let className  = e.target.innerHTML ;
    document.body.style.fontFamily = className;
    removeClassFromChildrenOFElem("active",dropdownFonts);
    
    e.target.classList.add("active");
    saveFontTolocalStorage(className);
  });
  
  
