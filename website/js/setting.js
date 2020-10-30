
/** @type {object}
*   @global
*   @description Hold reference drop down menu.
*/
let dropdown = document.querySelector(".themes");

/**@type {object}
*   @global
*   @description Hold reference drop down menu.
*/
let dropdownFonts = document.querySelector(".fonts");


/**@type {object}
*   @global
*   @description Hold reference drop down menu.
*/
const selectedFont = document.getElementById("selectedFont");

/**@type {object}
*   @global
*   @description Hold reference drop down menu.
*/
const selectedTheme = document.getElementById("selectedTheme");


callOnStart("Setting",true);
selectedFont.value=localStorage.getItem("font");
selectedTheme.value=localStorage.getItem("theme");

dropdown.addEventListener('click', (e) =>{
    let className  = e.target.innerHTML ;
    document.documentElement.className=className;
    removeClassFromChildrenOFElem("active",dropdown);
    e.target.classList.add("active");
    saveTolocalStorage("theme",className);
    selectedTheme.value=localStorage.getItem("theme");
});

dropdownFonts.addEventListener('click', (e) =>{
    let className  = e.target.innerHTML ;
    document.body.style.fontFamily = className;
    removeClassFromChildrenOFElem("active",dropdownFonts);
    e.target.classList.add("active");
    saveTolocalStorage("font",className);
    selectedFont.value=localStorage.getItem("font");
  });


  createTempDivsOnContentDiv(4,"tempEmpty","#content");


 
  