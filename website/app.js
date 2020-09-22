/** @constant
    @type {array}
    @global
    @description Hold themes' names.
*/
themes = [{text:'orange'}, {text:'brown'}, {text:'light'},{text:'white'}, {text:'orangeLight'}, {text:'biege'},
{text:'yellow'}, {text:'paleBlue'}, {text:'paleBiege'}, {text:'green'},{text:'pale'}, {text:'blue'}];


/** @constant
    @type {object}
    @global
    @description Hold reference drop down menu.
*/
let dropdown = document.querySelector(".dropdown-menu");


/**
* @function  fillInThemes
* @description fill in the themes in the dropdown list .
*/
fillInThemes = ()=>{
    for( theme of themes){
        let temp = document.createElement("a");
       // temp.setAttribute("innerHTML",theme.text);
        temp.classList.add("dropdown-item");
        temp.appendChild(document.createTextNode(theme.text));
        
        dropdown.appendChild(temp);
    }
}


/**
 * @description Handle click event of the dropdown list items
 */
dropdown.addEventListener('click', (e) =>{
  let className  = e.target.innerHTML ;
  document.documentElement.className=className;
})