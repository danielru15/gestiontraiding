const crear = document.getElementById('enviar')
let showTotal = document.getElementById('cuenta-total')
let EstadoDeCuenta = 0


crear.addEventListener('submit', async function (e) {
    e.preventDefault()
    // variables
    const inversion = document.getElementById('Inversion').value
    const profit = document.getElementById('profit').value
    const opcion = document.getElementById('opcion').value
    const win = document.getElementById('Ganada').value
    const seleccione = document.getElementById('seleccione').value
    const cuenta = document.getElementById('Cuenta').value
    let Result
    let Ganada
    let Perdida
    /* Formula
    Ganada = inversion * profit
    Perdida = inversion
    Total = Ganada - Perdida*/
    // usuario activo
    let user = firebase.auth().currentUser;
    let usuario = user.email + ' bitacora'
    //Fecha y hora
    let FechaActual = Date.now()
    let DiaActual = moment(FechaActual).format('DD-MM-YYYY')
    let Hora = moment(FechaActual).format('LTS')
    if (cuenta !== '') {
        EstadoDeCuenta = parseFloat(cuenta)
    }else {
        
        let Count = 0
        let docs = await db.collection(usuario).orderBy("Timestamp", "desc").limit(1).get().catch(err => console.log(err))
        docs.forEach(doc => {
            Count += Number(doc.data().EstadoDeCuenta)
            console.log(doc.data().EstadoDeCuenta)
        })
        EstadoDeCuenta = Number(Count)
    }
    
    if (opcion === win && opcion !== seleccione && profit !== '' && profit <= 97) {
        Ganada = parseFloat(inversion * profit / 100)
        Perdida = 0
        Result = Ganada - Perdida
        EstadoDeCuenta += Result
        db.collection(usuario).add({
            Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            Fecha: DiaActual,
            Hora: Hora,
            inversion: inversion,
            EstadoDeCuenta: EstadoDeCuenta,
            Ganadaoperdida: opcion,
            Result: Result
        })
            .then((docRef) => {
                Toast.show({
                    message: "Registro añadido con exito",
                    background: "green",
                    position: Toast.POSITION_TOP,
                    align: Toast.ALIGN_RIGHT,
                    top: '100px',
                    appearTime: 0.5,
                    DURATION_LONG: 6000,
                });

                //resetiamos el formulario
                crear.reset()
                // cerrar el modal
                $('#staticBackdrop').modal('hide')
            })
            .catch((error) => {
                Swal.fire({
                    title: 'No se pudo registrar, porfavor ingresa un valor en profit o un profit valido valido',
                    icon: "error",
                })
            })
    } else if (opcion !== win && opcion !== seleccione  && profit <= 97) {
        Perdida = parseFloat(inversion)
        Ganada = 0
        Result = parseFloat(Ganada - Perdida)
        EstadoDeCuenta += Result
        db.collection(usuario).add({
            Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            Fecha: DiaActual,
            Hora: Hora,
            inversion: inversion,
            EstadoDeCuenta: EstadoDeCuenta,
            Ganadaoperdida: opcion,
            Result: Result
        })
            .then((docRef) => {
                Toast.show({
                    message: "Registro añadido con exito",
                    background: "green",
                    position: Toast.POSITION_TOP,
                    align: Toast.ALIGN_RIGHT,
                    top: '100px',
                    appearTime: 0.5,
                    DURATION_LONG: 6000,
                });
                crear.reset()
                // cerrar el modal
                $('#staticBackdrop').modal('hide')
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            })
    } else {
        Swal.fire({
            title: 'No se pudo registrar, porfavor selecciona si es ganada o perdida',
            icon: "error",
        })

    }
})


const Datos = document.getElementById('datos')

let user = firebase.auth().onAuthStateChanged(function (user) {
    let usuario = user.email + ' bitacora'

    db.collection(usuario).orderBy("Timestamp", "desc").onSnapshot((querySnapshot) => {
        // me pinta cada fila de a 1
        Datos.innerHTML = "";
        querySnapshot.forEach((doc) => {

            Datos.innerHTML += `
              <div class="info">                      
                <div>
                    <h3>Fecha:${doc.data().Fecha}</h3>
                    <h3>Hora:${doc.data().Hora}</h3>
                    <h3>Inversion:${doc.data().inversion}</h3>
                    <h3 class="info1">${doc.data().Ganadaoperdida}</h3>
                    <h3>Total:${doc.data().Result.toFixed(2)}</h3>
                </div>
              </div>
            `;
            showTotal.innerHTML = Number(EstadoDeCuenta);
        });
    });
})