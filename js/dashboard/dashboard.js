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

// boton-arriba
const backToTopButton = document.querySelector("#up");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  if (window.pageYOffset > 400) { // Show backToTopButton
    if(!backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnExit");
      backToTopButton.classList.add("btnEntrance");
      backToTopButton.style.display = "block";
    }
  }
  else { // Hide backToTopButton
    if(backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnEntrance");
      backToTopButton.classList.add("btnExit");
      setTimeout(function() {
        backToTopButton.style.display = "none";
      }, 250);
    }
  }
}

backToTopButton.addEventListener("click", smoothScrollBackToTop);


function smoothScrollBackToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 750;
  let start = null;
  
  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};
