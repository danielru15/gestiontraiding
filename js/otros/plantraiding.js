const Datos = document.getElementById('tabla-de-traiding')
const promedioTotal = document.getElementById('promedio-total')
const operacionPromedio = document.getElementById('operacion-promedio') 
const totalGanado = document.getElementById('total-ganado') 
const calcular = document.getElementById('enviar')
let PlanTraiding = []
calcular.addEventListener('submit', Calcular)
function Calcular (e) {
    e.preventDefault()
    while(Datos.firstChild){
      Datos.removeChild(Datos.firstChild);}
    // variables
    const inversionInicial = document.getElementById('Inversion').value
    const inversionOperacion = document.getElementById('Interes').value
    const operacion = document.getElementById('Interesoperacion').value
    const profit = document.getElementById('profit').value
    const Tiempo = document.getElementById('Tiempo').value
    let Cuenta = 0
    let inversion = 0
    let Ganancia = 0
    let Total = 0
    let OperacionPromedio = 0
    let PromedioTotal = 0
    //declaramos un arreglo para la fechas
    let Fechas = []
    let FechaActual = Date.now()
    let DiaActual = moment(FechaActual)
    DiaActual.add('day')
    // inicializamos cuenta en inversion inicial
    Cuenta = parseFloat(inversionInicial)
    if(Tiempo <= 90){
    for (let i= 0 ; i< Tiempo; i ++){
        /*(Formula para calcular el total de la cuenta) .
          -  cuenta inicia en inversion inical
          - inversion = cuenta x el inversion de operacion
          - ganancia = inversion x el profit
          -  total = cuenta + la ganancia
          - cuenta = total
        */
        inversion = parseFloat((Cuenta * inversionOperacion)/100) 
        Ganancia = parseFloat((inversion * profit)/100)
        Total = parseFloat(Cuenta + Ganancia) 
        //iniciamos una variable temporal para guardar el ultimo valor de la cuenta
        let currentCount =Cuenta
        Cuenta = Total
        // operaciones promedio
        OperacionPromedio = Math.round(inversionOperacion/operacion)
        // PromedioTotal
        PromedioTotal = (Tiempo * OperacionPromedio )
       
        //Formato fechas
        Fechas[i] = DiaActual.format('DD-MM-YYYY');
        DiaActual.add(1, 'day');
        //lenar tabla
        let plan ={
          Numero:Fechas.length,
          Fechas:Fechas[i],
          Cuenta:currentCount,
          inversionOperacion:inversionOperacion,
          inversion:inversion,
          profit:profit,
          Ganancia:Ganancia,
          Total:Total,
          totalGanado:Total,
          OperacionPromedio:OperacionPromedio,
          PromedioTotal:PromedioTotal
        }
        PlanTraiding.push(plan)
        // ese arreglo lo enviamos al localstorage
        localStorage.setItem('plan',JSON.stringify(PlanTraiding)) 
       
        const llenartabla = document.createElement('tr')
        llenartabla.innerHTML=`
            <td>${Fechas.length}</td>
            <td>${Fechas[i]}</td>
            <td>${currentCount.toFixed(2)}</td>
            <td>${inversionOperacion + '%'}</td>
            <td>${inversion.toFixed(2)}</td>
            <td>${profit + '%'}</td>
            <td>${Ganancia.toFixed(2)}</td>
            <td>${Total.toFixed(2)}</td>
        `
      Datos.appendChild(llenartabla)

      // Mostrar total-ganado, operacion promedio, totaloperaciones
      totalGanado.innerHTML = Total.toFixed(2)
      operacionPromedio.innerHTML = OperacionPromedio
      promedioTotal.innerHTML = PromedioTotal

    }}else{
      Swal.fire({
        title: 'No se pudo generar plan de traiding',
        text: 'El plan de traiding esta diseñado para un lapso de tiempo menor o igual a 90 días, porfavor selecciona un tiempo menor o igual a 90 días',
        icon: "error",
      })
    }
   //resetiamos el formulario
    calcular.reset()
    // cerrar el modal
    $('#staticBackdrop').modal('hide')
}

// Comprueba que haya elementos en Local Storage
function obtenerTablaLocalStorage() {
  let Plans;

  // comprobamos si hay algo en localStorage
  if(localStorage.getItem('plan') === null) {
      Plans= []
  } else {
      Plans = JSON.parse( localStorage.getItem('plan') )
  }
  return Plans
}
document.addEventListener('DOMContentLoaded', leerLocalStorage);
function leerLocalStorage() {
    let Plans;

    Plans = obtenerTablaLocalStorage();

    Plans.forEach(function(plan){
      
        // constrir el template
        const llenartabla = document.createElement('tr')
        llenartabla.innerHTML=`
        <td>${plan.Numero}</td>
        <td>${plan.Fechas}</td>
        <td>${plan.Cuenta.toFixed(2)}</td>
        <td>${plan.inversionOperacion + '%'}</td>
        <td>${plan.inversion.toFixed(2)}</td>
        <td>${plan.profit + '%'}</td>
        <td>${plan.Ganancia.toFixed(2)}</td>
        <td>${plan.Total.toFixed(2)}</td>
        `
      Datos.appendChild(llenartabla)

      // Mostrar total-ganado, operacion promedio, totaloperaciones
      totalGanado.innerHTML = plan.Total.toFixed(2)
      operacionPromedio.innerHTML = plan.OperacionPromedio
      promedioTotal.innerHTML = plan.PromedioTotal
      
    }) 
    
}