const Datos = document.getElementById('tabla')
const calcular = document.getElementById('enviar')
calcular.addEventListener('submit', Calcular)
function Calcular (e) {
    e.preventDefault()
    // variables
    const inversionInicial = document.getElementById('Inversion').value
    const inversionOperacion = document.getElementById('Interes').value
    const profit = document.getElementById('profit').value
    const Tiempo = document.getElementById('Tiempo').value
    let PlanTraiding = []
    let Cuenta = 0
    let inversion = 0
    let Ganancia = 0
    let Total = 0
    //declaramos un arreglo para la fechas
    let Fechas = []
    let FechaActual = Date.now()
    let DiaActual = moment(FechaActual)
    DiaActual.add('day')
    // inicializamos cuenta en inversion inicial
    Cuenta = parseFloat(inversionInicial)
    
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
        Cuenta = Total 
     
       
        //Formato fechas
        Fechas[i] = DiaActual.format('DD-MM-YYYY');
        DiaActual.add(1, 'day');
        //llenar tabla
        let plan ={
          Numero:Fechas.length,
          Fechas:Fechas[i],
          Cuenta:Cuenta,
          inversionOperacion:inversionOperacion,
          inversion:inversion,
          profit:profit,
          Ganancia:Ganancia
        }
        PlanTraiding.push(plan)
        console.log(PlanTraiding)
        const llenartabla = document.createElement('tr')
        llenartabla.innerHTML=`
            <td>${Fechas.length}</td>
            <td>${Fechas[i]}</td>
            <td>${Cuenta}</td>
            <td>${inversionOperacion + '%'}</td>
            <td>${inversion.toFixed(2)}</td>
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