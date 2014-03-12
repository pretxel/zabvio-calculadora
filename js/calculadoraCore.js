/*
	author: Edsel Serrano Montiel

*/


/* Función que calcula los pagos fijos que tiene que cubrir mensualmente */
/* La formular empleada es R = (A * i) / (1 - (1 + i)^-n)  */
function interesSimple(monto, meses, tasa){
  return (monto * tasa) / (1 - Math.pow((1 + tasa), -1 * meses)); 
}

function interesCompuesto(){

}

/* Funcion que calcula la tasa de interes, a partir del monto mensual , los meses y el monto total */
function tasaSimple(meses, monto_total, monto_men){
	
	// var i = 0.05;

	var resigual = monto_total / monto_men;
	var res = 0;
	i = 0.00;

	// alert("resigual: " + resigual);

	do{
		i += 0.01;
		res = (1 - (Math.pow((1 + i), -1 * meses))) / i ;
		// alert(res);
		
	}while(res>resigual);

	// if ((Math.round(res* 100) / 100 ) == (Math.round(resigual* 100) / 100 ) ){
	// 	// alert("Tasa de interes : " + i);
	// }else{
	// 	// alert("Tasa posible entre i: " + i + " y "+ (i-0.01));
	// }

	i1 = (1 - (Math.pow((1 + i), -1 * meses))) / i ;
	i2 = (1 - (Math.pow((1 + (i-0.01)), -1 * meses))) / (i-0.01) ;

	i1dif = resigual - i1;
	i2dif = i2 - resigual;

	interpol = 0.01 * i1dif / i2dif ;

	tasa_apro = i + interpol;

	//alert("Tasa Aproximada: " +(Math.round(tasa_apro* 100) ));

	return tasa_apro;
}

/* Funcion para Graficar con Chart.js*/
function graficaChartjs(labels_graf, array_pago, array_capital, array_interes){


	var barChartData = {
         labels : labels_graf,
         datasets : [
            {
               fillColor : "rgba(220,220,220,0.5)",
               strokeColor : "rgba(220,220,220,1)",
               data : array_pago
            },
            {
               fillColor : "rgba(151,187,205,0.5)",
               strokeColor : "rgba(151,187,205,1)",
               data : array_capital
            },
            {
               fillColor : "rgba(151,187,205,0.5)",
               strokeColor : "rgba(151,187,205,1)",
               data : array_interes
            }
         ]
         
      }

   var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Bar(barChartData);

}

/* Funcion para Graficar los pagos con hightchart*/
function graficaHighchart(labels_graf, array_pago, array_capital, array_interes){

	$('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Gráfica de Pagos'
            },
            subtitle: {
                text: 'Zabvio.com'
            },
            xAxis: {
                categories: labels_graf
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Pago (MXN)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} MXN</b></td></tr>',
                footerFormat: '</table>',
                shared: false,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Pago Mensual',
                data: array_pago
    
            }, {
                name: 'Capital',
                data: array_capital
    
            }, {
                name: 'Interes',
                data: array_interes
    
            }]
        });

}