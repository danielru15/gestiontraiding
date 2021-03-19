const $btnExportar = document.querySelector("#excel"),
    $tabla = document.querySelector("#tabla");

$btnExportar.addEventListener("click", function() {
    let tableExport = new TableExport($tabla, {
        exportButtons: false, // No queremos botones
        filename: "tabla amortizacion fija", //Nombre del archivo de Excel
        sheetname: "tabla amortizacion fija", //Título de la hoja
    });
    let datos = tableExport.getExportData();
    let preferenciasDocumento = datos.tabla.xlsx;
    tableExport.export2file(preferenciasDocumento.data, preferenciasDocumento.mimeType, preferenciasDocumento.filename, preferenciasDocumento.fileExtension, preferenciasDocumento.merges, preferenciasDocumento.RTL, preferenciasDocumento.sheetname);
});


// PDF
const pdf = document.getElementById('pdf')
pdf.addEventListener('click',exportpdfs)
function exportpdfs() {
  // pdf
  html2canvas(document.getElementById('tabla'), {
   onrendered: function (canvas) {
       var data = canvas.toDataURL();
       var docDefinition = {
           content: [{
               title:'plantraiding',
               image: data,
               width: 500
           }]
       };
       pdfMake.createPdf(docDefinition).download("plantraiding.pdf");
   }
});
}