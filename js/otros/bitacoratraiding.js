const crear = document.getElementById('enviar')
const si = document.getElementById('si')
let showTotal = document.getElementById('cuenta-total')
let totalGanadas = document.getElementById('total-ganadas')
let totalPerdidas = document.getElementById('total-perdidas')
let divisaRentable = document.getElementById('divisa-rentable')
let divisaNorentable = document.getElementById('divisa-menosrentable')
let EstadoDeCuenta

// crear registro bitacora
crear.addEventListener('submit', async function (e) {
    e.preventDefault()
    // variables
    const inversion = document.getElementById('Inversion').value
    const profit = document.getElementById('profit').value
    const opcion = document.getElementById('opcion').value
    const win = document.getElementById('Ganada').value
    const seleccione = document.getElementById('seleccione').value
    const seleccionar = document.getElementById('seleccionar').value
    const cuenta = document.getElementById('Cuenta').value
    const divisa = document.getElementById('opcion-divisa').value
    const comentario = document.getElementById('comentario').value
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

    // acumulador
    if (cuenta !== '') {
        EstadoDeCuenta = parseFloat(cuenta)
    }else {
        
        let Count = 0
        let docs = await db.collection(usuario).orderBy("Timestamp", "desc").limit(1).get().catch(err => console.log(err))
        docs.forEach(doc => {
            Count += doc.data().EstadoDeCuenta
            //console.log(doc.data().EstadoDeCuenta)
        })
        EstadoDeCuenta = Count
       

    }

    if (opcion === win && opcion !== seleccione  && divisa != seleccionar && profit !== '' && profit <= 100 && inversion <= EstadoDeCuenta && EstadoDeCuenta > 0) {
        Ganada = parseFloat(inversion * profit / 100)
        Perdida = 0
        Result = Ganada - Perdida
        EstadoDeCuenta += Result
        db.collection(usuario).add({
            Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            Fecha: DiaActual,
            Hora: Hora,
            inversion: inversion,
            profit:profit,
            EstadoDeCuenta: EstadoDeCuenta,
            Ganadaoperdida: opcion,
            Comentario:comentario,
            Divisa:divisa,
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
                    title: 'No se pudo registrar, porfavor ingresa un valor en profit, un profit menor igual a 100% y verifique que la inversion no supere el monto de la cuenta',
                    icon: "error",
                })
            })
    } else if (opcion !== win && opcion !== seleccione && divisa !== seleccionar && EstadoDeCuenta > 0 && inversion <= EstadoDeCuenta) {
        Perdida = parseFloat(inversion)
        Ganada = 0
        Result = parseFloat(Ganada - Perdida)
        EstadoDeCuenta += Result
        db.collection(usuario).add({
            Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            Fecha: DiaActual,
            Hora: Hora,
            inversion: inversion,
            profit:profit,
            EstadoDeCuenta: EstadoDeCuenta,
            Ganadaoperdida: opcion,
            Comentario:comentario,
            Divisa:divisa,
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
                Swal.fire({
                    title: 'verifique que la inversion no supere el monto de la cuenta',
                    icon: "error",
                })
            })
    } else {
        Swal.fire({
            title: 'No se pudo registrar, porfavor selecciona si es ganada o perdida y la divisa y que la cuenta no este en 0',
            icon: "error",
        })

    }
})


const Datos = document.getElementById('datos')

let user = firebase.auth().onAuthStateChanged(async function (user) {
    let usuario = user.email + ' bitacora'
    
    // Ganadas
    db.collection(usuario).where("Ganadaoperdida", "==", "Ganada")
    .onSnapshot((querySnapshot) => {
        let Ganadas = []
        querySnapshot.forEach((doc) => {
            Ganadas.push(doc.data().Divisa);
        });
        function dup(arrr) {
            let max = { item: 0, count: 0 };
            for (let i = 0; i < arrr.length; i++) {
                let arrOccurences = arrr.filter(item => { return item === arrr[i] }).length;
                if (arrOccurences > max.count) {
                    max = { item: arrr[i], count: arrr.filter(item => { return item === arrr[i] }).length };
                }
            }
            return max.item;
        }
        divisaRentable.innerHTML = dup(Ganadas)
        totalGanadas.innerHTML = Ganadas.length
    });
    // Perdidas
    db.collection(usuario).where("Ganadaoperdida", "==", "Perdida")
    .onSnapshot((querySnapshot) => {
        let Perdidas = []
        querySnapshot.forEach((doc) => {
            Perdidas.push(doc.data().Divisa);
        });
        function dup(arrr) {
            let max = { item: 0, count: 0 };
            for (let i = 0; i < arrr.length; i++) {
                let arrOccurences = arrr.filter(item => { return item === arrr[i] }).length;
                if (arrOccurences > max.count) {
                    max = { item: arrr[i], count: arrr.filter(item => { return item === arrr[i] }).length };
                }
            }
            return max.item;
        }
        divisaNorentable.innerHTML = dup(Perdidas)
        totalPerdidas.innerHTML = Perdidas.length
    });

    // Mostramos la cuenta
        let Count = 0
        let docs = await db.collection(usuario).orderBy("Timestamp", "desc").limit(1).get().catch(err => console.log(err))
        docs.forEach(doc => {
            Count += doc.data().EstadoDeCuenta
        })
        EstadoDeCuenta = Count

    db.collection(usuario).orderBy("Timestamp", "desc").onSnapshot((querySnapshot) => {
        // me pinta cada fila de a 1
        Datos.innerHTML = "";
        querySnapshot.forEach((doc) => {

            Datos.innerHTML += `
              <tr>                      
                    <td>${doc.data().Fecha}</td>
                    <td>${doc.data().Hora}</td>
                    <td>${doc.data().inversion}</td>
                    <td>${doc.data().Divisa}</td>
                    <td>${doc.data().profit}%</td>
                    <td>${doc.data().Ganadaoperdida}</td>
                    <td>${doc.data().Comentario}</td>
                    <td>${doc.data().Result.toFixed(2)}</td>
                    <td><button id="Eliminar" class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
              </tr>
            `;
            // ocultamos y mostramos el input de la cuenta
            if(EstadoDeCuenta > 0){
                si.style.display = 'none'
            }else if (EstadoDeCuenta === 0){
                si.style.display = 'block'
            }
            showTotal.innerHTML = EstadoDeCuenta + ' USD';
        });
    });

})

// eliminar 
function eliminar(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-secondary'
        },
        buttonsStyling: true
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Esta seguro que desea eliminar esta operacion?',
        text: "Esta operacion no se puede revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            // usuario activo
            let user = firebase.auth().currentUser;
            let usuario = user.email + ' bitacora'
            db.collection(usuario).doc(id).delete().then(function () {
                // alerta
                swalWithBootstrapButtons.fire({
                 title: 'operaciom eliminada correctamente',
                 icon: "success",
                }) 
                window.location.reload()
             }).catch(function (error) {
                 console.error("Error removing document: ", error);
             });   
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: 'Operacion cancelada',
                icon: "error",
               }) 
        }
      })
}

// PDf
const pdf = document.getElementById('pdf')
pdf.addEventListener('click',exportpdfs)
function exportpdfs() {
  // pdf
  html2canvas(document.getElementById('datos'), {
   onrendered: function (canvas) {
       var data = canvas.toDataURL();
       var docDefinition = {
           content: [{
               title:'Bitacoratraiding',
               image: data,
               width: 500
           }]
       };
       pdfMake.createPdf(docDefinition).download("Bitacoratraiding.pdf");
   }
});
}