let Fecha = new Date()
    let fechahoy = new Intl.DateTimeFormat('es-CO',{
        day:'2-digit',
        month:'long',
        year:'numeric',
        hour:'2-digit',
        minute:'2-digit',
        second:'numeric',
        hour12:true
    })
    let finalfecha = fechahoy.format(Fecha)
    console.log(finalfecha)

    // formatiar divisas
    const valordivisa =100
    const formatodivisa = new Intl.NumberFormat('es-CO',{
        style:'currency',
        currency:'COP'
    })
    const valorformatiado = formatodivisa.format(valordivisa)
    console.log(valorformatiado)


    const options = {method: 'GET', headers: {Accept: 'application/json'}};

fetch('https://api.fastforex.io/fetch-one?from=USD&to=COP&api_key=038be10e38-d8c9f8b906-qqid33', options)
  .then(usdcop => usdcop.json())
  .then(data => {
        const formatodivisa = new Intl.NumberFormat('es-CO',{
            style:'currency',
            currency:'COP'
        })
      console.log(data)
      const total = prompt('digite numero')
      console.log(total)
      const valordivisa = data.result.COP * parseInt(total)
      const totalcop = document.getElementById('COP')
      totalcop.innerHTML = formatodivisa.format(valordivisa)
      
    
  })
  .catch(err => console.error(err));