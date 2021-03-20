// showpassword contraseña actual
const eyeBtns = document.getElementById("Eyes");
const passworshows = document.getElementById("passworduser");
eyeBtns.addEventListener("click", passwordshowse)
function passwordshowse (e) {
    if (passworshows.type === "password") {
        // cambia el icono del ojo a cerrado
        e.target.setAttribute("class", "bx bxs-low-vision");
        // cambia el tipo password a text
        passworshows.type = "text";
    }
    else {
        // cambiar el ojo a abierto
        e.target.setAttribute("class", "bx bx-show-alt");  
         // cambiar de text a password
       passworshows.type = "password"
    }
}
// showpassword nueva contraseña
const eyeBtn = document.getElementById("Eye");
const passworshow = document.getElementById("newpassword");
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

/* 
Funcion cambiar contraseña
*/
 // se trae la funcion de usuario activo
function observador () {
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const User = document.getElementById('user')
         // seleccionamos el form y le pasamos la funcion
        const change= document.getElementById('passwordchange')
        change.addEventListener('submit',changed)
        // si el usuario esta activo mostrar correo y ejecutar funcion.
        var email = user.email;
        User.innerHTML='Bienvenido(a): '+ email
        /* funcion que me permite cambiar contraseña, se captura el nuevo input y
         se le pasa al metodo dado por firebase */
        function changed (e) {
          e.preventDefault()
          const newPassword = document.getElementById('newpassword').value
          user.updatePassword(newPassword).then(function() {
            // Update successful.
            
              Swal.fire({
                title: 'Cambio exitoso',
                icon: 'success',
                text: "Contraseña cambiada correctamente, vuelve autentificarte para ingresar",
              })
              .then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  firebase.auth().signOut()
                }})
          }).catch(function(error) {
            // An error happened.
                Swal.fire({
                  title: 'Error',
                  text: "Error vuelve a intentarlo mas tarde",
                  icon: 'Error',
              })
          }); 
        

        }
      } else {
        // User is signed out.
        // ...
        window.location.href='/index.html'
      }
    });
}
observador();