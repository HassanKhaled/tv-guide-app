
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

callOnStart("Setting",true);

dropdown.addEventListener('click', (e) =>{
    let className  = e.target.innerHTML ;
    document.documentElement.className=className;
    removeClassFromChildrenOFElem("active",dropdown);
    e.target.classList.add("active");
    saveTolocalStorage("theme",className);
});

dropdownFonts.addEventListener('click', (e) =>{
    let className  = e.target.innerHTML ;
    document.body.style.fontFamily = className;
    removeClassFromChildrenOFElem("active",dropdownFonts);
    e.target.classList.add("active");
    saveTolocalStorage("font",className);
  });