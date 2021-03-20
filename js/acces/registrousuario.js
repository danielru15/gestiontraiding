const crear = document.getElementById('registrar')
crear.addEventListener('submit',registrar)
function registrar() {
    //se reciben las variables de las cajas de texto
    let email = document.getElementById('Email').value;
    let contrasena = document.getElementById('password').value;
    let repicontrasena = document.getElementById('repitpassword').value;
   

    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
        .then(function () {
            // si se registro correctamente en firebase
            alert('Usuario registrado correctamente: ' + email)
            verificarCorreo();
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/email-already-in-use') {
                alert('El usuario ya existe, por favor inicia sesión \nSi olvidaste tu cotraseña puedes recuperarla');
            } else {
                alert('Error de codigo:\n ' + errorCode + ' Mensaje de Error:\n ' + errorMessage);
            }

        });

}
// función que sirve enviar un correo a un usuario que se registre por primera vez
function verificarCorreo() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
        // Email sent.
        console.log('Se ha enviado un correo de notificación');
        alert('Se ha enviado un correo de verificación de correo');
    }).catch(function (error) {
        // An error happened.
        console.log('Error, no se ha podido enviar un correo de notificación');
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('Error de codigo:\n ' + errorCode + ' Mensaje de Error:\n ' + errorMessage);
    });
}
