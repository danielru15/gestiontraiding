const crear = document.getElementById('registrar')
crear.addEventListener('submit',registrar)
async function registrar(e) {
    e.preventDefault()
    //se reciben las variables de las cajas de texto
    let email = document.getElementById('Email').value;
    let contrasena = document.getElementById('password').value;
    let repicontrasena = document.getElementById('repitpassword').value;
   
    if(contrasena === repicontrasena){
    await firebase.auth().createUserWithEmailAndPassword(email, contrasena)
        .then( async function () {
            // si se registro correctamente en firebase
           await Swal.fire({
                title: 'Registro exitoso',
                text: `Usuario registrado correctamente:  ${email}, se te enviara un correo de verificacion, y se te redireccionara 
                al portal de inicio`,
                icon: 'success',
            })
            .then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    window.location.href='/index.html'
                    verificarCorreo()
                }})
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/email-already-in-use') {
                Swal.fire({
                    title: 'Error',
                    text: `El usuario ya existe, por favor inicia sesión \nSi olvidaste tu cotraseña puedes recuperarla`,
                    icon: 'Error',
                })
            } else {
                Swal.fire({
                    title: 'Error',
                    text: `Error de codigo:\n ' + errorCode + ' Mensaje de Error:\n ' + errorMessage`,
                    icon: 'Error',
                })
               
            }

        });
    }else {
        Swal.fire({
            title: 'Error',
            text: "Las contraseñas no coinciden, verifica e intenta nuevamente",
            icon: 'Error',
        })
    }
}
// función que sirve enviar un correo a un usuario que se registre por primera vez
function verificarCorreo() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
        // Email sent.
        console.log('Se ha enviado un correo de notificación');
    }).catch(function (error) {
        // An error happened.
        console.log('Error, no se ha podido enviar un correo de notificación');
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('Error de codigo:\n ' + errorCode + ' Mensaje de Error:\n ' + errorMessage);
    });
}
