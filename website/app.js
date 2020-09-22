
themes = [{text:'orange'}, {text:'brown'}, {text:'light'},{text:'white'}, {text:'orangeLight'}, {text:'biege'},
{text:'yellow'}, {text:'paleBlue'}, {text:'paleBiege'}, {text:'green'},{text:'pale'}, {text:'blue'}];




let dropdown = document.querySelector(".dropdown-menu");

for( theme of themes){
    let temp = document.createElement("a");
   // temp.setAttribute("innerHTML",theme.text);
    temp.classList.add("dropdown-item");
    temp.appendChild(document.createTextNode(theme.text));
    
    dropdown.appendChild(temp);
}

dropdown.addEventListener('click', (e) =>{
  let className  = e.target.innerHTML ;
  document.documentElement.className=className;


})