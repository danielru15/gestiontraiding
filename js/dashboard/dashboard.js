// SHOW MENU
const showMenu = (toggleId, navbarId,mainId,headerId,footerId) =>{
    const toggle = document.getElementById(toggleId),
    navbar = document.getElementById(navbarId),
    Main = document.getElementById(mainId),
    Header = document.getElementById(headerId),
    Footer = document.getElementById(footerId)

    if(toggle && navbar){
        toggle.addEventListener('click', ()=>{
            // APARECER MENU
            navbar.classList.toggle('mostrar')
            // ROTATE TOGGLE
            toggle.classList.toggle('rotate')
            // PADDING BODY
            Main.classList.toggle('expander')
            Header.classList.toggle('expander')
            Footer.classList.toggle('expander')
        })
    }
}
showMenu('nav-toggle','navbar','main','header','footer')



const currentlocation = location.href
const menuItem = document.querySelectorAll('a')
const menulargo = menuItem.length
for(let i=0; i<menulargo ; i++){
    if(menuItem[i].href === currentlocation){
        menuItem[i].classList.add("active")
    }
}
