// función que valida si un usuario esta en el sistema
function observador () {
    firebase.auth().onAuthStateChanged(function(user) {
        const dropdownMenuButton = document.getElementById('dropdownMenuButton')
        if (user) {
          // si el usuario esta activo mostrar correo.
          var email = user.email;
          dropdownMenuButton.innerHTML=email
          console.log('el usuario es '+ email)
          // ...
        } else {
          // Devolver al inisio de sesion
          window.location.href='/pages/cuenta/logout.html'
        }
      });
}
observador();

// función que sirve para cerrar la sesión
const cerrar = document.getElementById('cerrarsesion')
cerrar.addEventListener('click',cerrarSesion)
function cerrarSesion() {
    firebase.auth().signOut()
        .then(
            function () {
                window.location.href="/pages/cuenta/logout.html"
            })
        .catch(function () {
            console.log('no se pudo cerrar');
        })
}