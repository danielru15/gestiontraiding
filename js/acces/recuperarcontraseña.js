// Funcion recuperar contraseña
const passwordrecoverys = document.getElementById('passwordrecovery')
passwordrecoverys.addEventListener("submit",recuperarContraseña)

function recuperarContraseña(e) {
    e.preventDefault()
    const email = document.getElementById('Emails').value

    firebase.auth().sendPasswordResetEmail(email).then(function() {
         // Email sent.
        Swal.fire({
            text: "Te hemos enviado un correo de restablecimiento de contraseña",
            icon: 'success',
            timer: 1500
         })
         
    }).catch(function() {
    // An error happened.
    Swal.fire({
        title: 'Error',
        text: "No se pudo mandar correo de restablecimiento de contraseña, verifica que estes registrado en el sistema",
        icon: 'error',
    })
    });
}
