/*
   author:  Edsel Serrano Montiel
*/

$(document).ready(function() {

    //Variables Globales
    var labels_graf = new Array();
    var array_capital = new Array();
    var array_interes = new Array();
    var array_iva = new Array();
    var array_pago = new Array();
    var NO_IMPL = "Funcionalidad no Implementada";

    //Inicializa el formulario
    init();

    $("#ok").click(function() {




        tipo = $("#tipo").val();
        modalidad = $("#modalidad").val();
        //meses =$( "#meses" ).val();
        monto = $("#monto").val();
        txtModalidad = $("#textModalidad").val();
        txtModalidad = parseFloat($("#textModalidad").val());


        // alert($("#tresMes").attr("name"));

        if ($("#tresMes").attr("name") == "1") {
            meses = 3;
        } else if ($("#seisMes").attr("name") == "1") {
            meses = 6;
        } else {
            meses = 12;
        }

        htmlTable = '';

        modalidad = 1;
        tipo = 1;

        //Modalidad con tasa de interes
        if (modalidad == 1) {
            //Tipo Simple
            var tasa_interes = txtModalidad / 100.00;
            if (tipo == 1) {

                array_pago = new Array();
                array_capital = new Array();
                array_interes = new Array();
                array_iva = new Array();

                var monto_men = interesSimple(monto, meses, tasa_interes);
                var tabla = $("#tabla");
                tabla.empty();
                htmlTable = "<thead ><tr><th>Mes</th><th>Capital</th><th>Interes</th><th class='visible-sm visible-md visible-lg'>Iva</th><th>Pago Mensual</th><th class='visible-sm visible-md visible-lg'>Saldo</th></tr></thead>";
                //tabla.append("<thead><tr><th>Mes</th><th>Capital</th><th>Interes</th><th>Pago Mensual</th><th>Saldo</th></tr></thead>");

                //tabla.append("<tbody>");
                htmlTable = htmlTable + "<tbody>";
                for (var i = 0; i < meses; i++) {
                    interes_mes = Math.round((monto * tasa_interes) * 100) / 100;
                    capital_mes = Math.round((monto_men - interes_mes) * 100) / 100;
                    iva_mes = interes_mes * 0.16;
                    monto -= capital_mes;

                    //Se Trunca el saldo final a 0
                    if (monto < 0) {
                        monto = 0;
                    }

                    //Agrego datos al Array
                    array_capital[i] = capital_mes;
                    array_interes[i] = interes_mes;
                    array_iva[i] = iva_mes
                    array_pago[i] = monto_men;
                    htmlTable = htmlTable + "<tr><td>" + (i + 1) + "</td><td>$" + capital_mes + "</td><td>$" + interes_mes + "</td><td class='visible-sm visible-md visible-lg'>$" + Math.round(iva_mes * 100) / 100 + "</td><td>$" + Math.round(monto_men * 100) / 100 + "</td><td class='visible-sm visible-md visible-lg'>$" + Math.round(monto * 100) / 100 + "</td></tr>";
                    //tabla.append("<tr><td>"+(i+1)+"</td><td>$"+ capital_mes + "</td><td>$"+ interes_mes +"</td><td>$"+ Math.round(monto_men*100) /100 +"</td><td>"+Math.round(monto*100) /100+"</td></tr>");
                    labels_graf[i] = "Mes " + (i + 1);
                }
                htmlTable = htmlTable + "<tr><td>Total</td><td>$" + Math.round((monto_men * meses) * 100) / 100 + "</td></tr>";
                htmlTable = htmlTable + "</tbody>";
                tabla.html(htmlTable);


                //tabla.html("<thead><tr><th>#</th><th>First Name</th><th>Last Name</th><th>Username</th></tr></thead><tbody><tr><td>1</td><td>Mark</td><td>Otto</td><td>@mdo</td></tr><tr><td>2</td><td>Jacob</td><td>Thornton</td><td>@fat</td></tr></tbody>");


                //tabla.append("<tr><td>Total</td><td>$"+ Math.round((monto_men*meses) * 100) / 100 + "</td></tr>");
                ///tabla.append("</tbody>");
                //alert(htmlTable);
                //tabla.css("display", "block");
                // $().ready();
                $("#tabla").show();
                $("#container").hide();
                $("#resultado").show();
                $("#botonGrafico").show();
                $("#botonTabla").show();

            }
            //Tipo Compuesto
            else if (tipo == 2) {
                /*var monto_par2 = monto;
        monto = monto/meses;
        var tabla = $("#resultado");
        tabla.empty();
        tabla.append("<thead><tr><th>Mes</th><th>Pago</th></tr></thead>");
        for(var i=0; i< meses; i++){
          monto_par = monto * txtModalidad / 100.00;
          monto = parseFloat(monto) + parseFloat(monto_par); 
          tabla.append("<tr><td>"+(i+1)+"</td><td>"+ Math.round(monto * 100) / 100 + "</td></tr>");
          //alert(monto_par);
        }

        tabla.css("display", "block");
      */
                alert(NO_IMPL);
            }

        } else if (modalidad == 2) {

            tasa_interes = tasaSimple(meses, monto, Math.round((txtModalidad * 10) / 10));

            var tabla = $("#tabla");
            tabla.empty();
            tabla.append("<thead><tr><th>Mes</th><th>Capital</th><th>Interes</th><th>Pago Mensual</th><th>Saldo</th></tr></thead>");

            for (var i = 0; i < meses; i++) {
                interes_mes = Math.round((monto * tasa_interes) * 100) / 100;
                capital_mes = Math.round((txtModalidad - interes_mes) * 100) / 100;
                monto -= capital_mes;

                //Se Trunca el saldo final a 0
                if (monto < 0) {
                    monto = 0;
                }

                //Agrego datos al Array
                array_capital[i] = capital_mes;
                array_interes[i] = interes_mes;
                array_pago[i] = Math.round(txtModalidad);

                tabla.append("<tr><td>" + (i + 1) + "</td><td>$" + capital_mes + "</td><td>$" + interes_mes + "</td><td>$" + Math.round(txtModalidad * 100) / 100 + "</td><td>" + Math.round(monto * 100) / 100 + "</td></tr>");
                labels_graf[i] = "Mes " + (i + 1);
            }
            tabla.append("<tr><td>Total</td><td>$" + Math.round((txtModalidad * meses) * 100) / 100 + "</td></tr>");
            tabla.css("display", "block");

            $("#tasaInt").append('');
            $("#tasaInt").append("Tasa de Interes: " + (Math.round(tasa_interes * 100) / 100) * 100 + "% Mensual");

            $("#tabla").show();
            $("#tasaInt").show();
            $("#container").hide();
            $("#resultado").show();

        }


    });

    $("#modalidad").change(function() {
        modalidad = $("#modalidad").val();
        if (modalidad == 1) {
            $("#labelModalidad").html("Tasa de Interes Mensual (%)");
            $("#labelModalidad").show();
            $("#textModalidad").show();
        } else if (modalidad == 2) {
            $("#labelModalidad").html("Monto Mensual");
            $("#labelModalidad").show();
            $("#textModalidad").show()
            $("#tipo option[value='2']").remove();
        }

    });

    $("form").submit(function() {
        //aqui podemos llamar alguna funcion por defecto o nada. 
        //El return false va igual


        return false;
    });

    $("#botonGrafico").click(function() {

        $("#tabla").hide();
        $("#container").show();


        //$("#canvas").css("display", "block");
        //Grafica con Chart.js
        //graficaChartjs(labels_graf,array_pago,array_capital,array_interes);

        //Grafica con Hightchart.js
        graficaHighchart(labels_graf, array_pago, array_capital, array_interes, array_iva);

    });


    $("#botonTabla").click(function() {

        $("#tabla").show();
        $("#canvas").hide();
        $("#container").hide();

    });


    $("#botonFormula").click(function() {



    });

    $("#limpiar").click(function() {

        init();



    });


    $("#doceMes").click(function() {
        // alert("12 meses");
        // $("#doceMes").css("background-image","-webkit-linear-gradient(top, #FF0202 0%, #FF2020 40%, #FF0000 100%");
        $("#doceMes").attr("name", "1");
        alert("DOCE");
        //background-image: -webkit-linear-gradient(top, #FF0202 0%, #FF2020 40%, #FF0000 100%);
        // $("#tresMes").css("background-image","-webkit-linear-gradient(top, #363636 0%, #313234 40%, #2f2f2f 100%");
        // $("#seisMes").css("background-image","-webkit-linear-gradient(top, #363636 0%, #313234 40%, #2f2f2f 100%");
        //background-image: -webkit-linear-gradient(top, #363636 0%, #313234 40%, #2f2f2f 100%);
        $("#tresMes").attr("name", "0");
        $("#seisMes").attr("name", "0");
    });

    $("#tresMes").click(function() {
        // alert("12 meses");
        // $("#tresMes").css("background-image","-webkit-linear-gradient(top, #FF0202 0%, #FF2020 40%, #FF0000 100%");
        $("#tresMes").attr("name", "1");
        //background-image: -webkit-linear-gradient(top, #FF0202 0%, #FF2020 40%, #FF0000 100%);
        // $("#docesMes").css("background-image","-webkit-linear-gradient(top, #363636 0%, #313234 40%, #2f2f2f 100%");
        // $("#seisMes").css("background-image","-webkit-linear-gradient(top, #363636 0%, #313234 40%, #2f2f2f 100%");
        $("#docesMes").attr("name", "0");
        $("#seisMes").attr("name", "0");
    });

    $("#seisMes").click(function() {
        // alert("12 meses");
        // $("#seisMes").css("background-image","-webkit-linear-gradient(top, #FF0202 0%, #FF2020 40%, #FF0000 100%");
        $("#seisMes").attr("name", "1");
        //background-image: -webkit-linear-gradient(top, #FF0202 0%, #FF2020 40%, #FF0000 100%);
        // $("#doceMes").css("background-image","-webkit-linear-gradient(top, #363636 0%, #313234 40%, #2f2f2f 100%");
        // $("#tresMes").css("background-image","-webkit-linear-gradient(top, #363636 0%, #313234 40%, #2f2f2f 100%");
        $("#doceMes").attr("name", "0");
        $("#tresMes").attr("name", "0");
    });


    function init() {
        labels_graf = new Array();
        array_capital = new Array();
        array_interes = new Array();
        array_pago = new Array();
        array_iva = new Array();
        $("#tipo").val("");
        $("#modalidad").val("");
        $("#meses").val("");
        $("#monto").val("");
        $("#textModalidad").val("");
        // $("#labelModalidad").hide();
        // $("#textModalidad").hide();
        $("#canvas").hide();
        $("#resultado").hide();
        $("#container").hide();
        $("#tasaInt").hide();
        $("#botonGrafico").hide();
        $("#botonTabla").hide();

        // $("#doceMes").css("background-image","-webkit-linear-gradient(top, #363636 0%, #313234 40%, #2f2f2f 100%");
        // $("#tresMes").css("background-image","-webkit-linear-gradient(top, #363636 0%, #313234 40%, #2f2f2f 100%");
        // $("#seisMes").css("background-image","-webkit-linear-gradient(top, #363636 0%, #313234 40%, #2f2f2f 100%");
    }


    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });



});