// showpassword 
const eyeBtn = document.getElementById("Eye");
const passworshow = document.getElementById("password");

eyeBtn.addEventListener("click", passwordshow)
function passwordshow (e) {
    if (passworshow.type === "password") {
        // cambia el icono del ojo a cerrado
        e.target.setAttribute("class", "bx bxs-low-vision");
        // cambia el tipo password a text
        passworshow.type = "text";
    }
    else {
        // cambiar el ojo a abierto
        e.target.setAttribute("class", "bx bx-show-alt");  
         // cambiar de text a password
       passworshow.type = "password"
    }
}

// inisiar sesion
const ingreso = document.getElementById('ingresar')

ingreso.addEventListener("submit", ingresar)
function ingresar(e) {
        e.preventDefault()          
        const email = document.getElementById('Email').value
        const password = document.getElementById('password').value
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) { 
        window.location.href='/pages/plan-traiding.html'
    })
    .catch(function (error) {
        //error
        Swal.fire({
            title: 'Error',
            text: "Usuario o contraseña incorrecta",
            icon: 'warning',
         })
    });
}