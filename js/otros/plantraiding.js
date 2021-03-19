/* 
- inversion inicial (viene del input)
- cuenta inicial 
- inversion x operacion (utilidad deseada de todas las operaciones) 
- profit = % q paga broker
- ganancia = ixo x profit
- total  = ci + ganancia

*/

/*
Variables
*/
const Datos = document.getElementById('tabla')
const calcular = document.getElementById('enviar')
calcular.addEventListener('submit', Calcular)
function Calcular (e) {
    e.preventDefault()
    const inversionInicial = document.getElementById('Inversion').value
    const inversionOperacion = document.getElementById('Interes').value
    const profit = document.getElementById('profit').value
    const Tiempo = document.getElementById('Tiempo').value
    let PlanTraiding = []
    let Cuenta = 0
    let inversion = 0
    let Totales = 0
    let Ganancia = 0
    let Total = 0
    //declaramos un arreglo para la fechas
    let Fechas = []
    let FechaActual = Date.now()
    let DiaActual = moment(FechaActual)
    DiaActual.add('day')
    
    
    Cuenta = parseFloat(inversionInicial)

    for (let i= 0 ; i< Tiempo && i < profit && i < inversionOperacion; i ++){
         //formula para calcular el total de la cuenta
        inversion = parseFloat((Cuenta * inversionOperacion)/100)
        Ganancia = parseFloat((inversion * profit)/100)
        Total = parseFloat(Ganancia + inversion)
        Cuenta = parseFloat(Cuenta + Total)
        //Formato fechas
        Fechas[i] = DiaActual.format('DD-MM-YYYY');
        DiaActual.add(1, 'day');
        //llenar tabla
        const llenartabla = document.createElement('tr')
        llenartabla.innerHTML=`
            <td>${Fechas[i]}</td>
            <td>${Cuenta.toFixed(2)}</td>
            <td>${inversionOperacion + '%'}</td>
            <td>${profit + '%'}</td>
            <td>${Ganancia.toFixed(2)}</td>
            <td>${Total.toFixed(2)}</td>
         
        `
      Datos.appendChild(llenartabla)
        
    }
 //resetiamos el formulario
    calcular.reset()
    // cerrar el modal
    $('#staticBackdrop').modal('hide')
}