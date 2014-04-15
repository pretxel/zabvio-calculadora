$(document).ready(function() {


	$("#enviarOpinion").click(function(){

			nombre = $("#nombre").val();
			opinion = $("#opinion").val();

			var parametros = {
                        "nombre" : nombre,
                        "opinion" : opinion
                    };

			 $.ajax({  
                        data:  parametros,
                        url:   'sendMail.php',
                        type:  'post',
                        beforeSend: function () 
                        {
                                popupEsperar();
                        },
                        success:  function (response) 
                        {
                            $.unblockUI();
                            //$("#emailSus").val('');
                            //$("#terminos").attr('checked',false);

                            //alert(response);
                            //Cierro Popup Suscripción
                            //$("#Signup").css("display", "none");
                            //$(".modal-backdrop").css('opacity','0.0');
                            if (response == 0)
                            {
                                mensajePop("Confirmación","Gracias por mandarnos tu opinión.");
                            }
                            else if (response == 1)
                            {
                                mensajePop("Aviso","Upps ocurrio un problema al mandar tu opinión, intenta más tarde.");
                            } 
                            else if (response == 2)
                            {
                                mensajePop("Aviso","No es peticion AJAX");
                            }
                            
                        }
                    });


	});


function popupEsperar(){
    $.blockUI({message:  '<h1>Enviando...</h1>',
                 css: { 
                        border: 'none', 
                        padding: '15px', 
                        backgroundColor: '#000', 
                        '-webkit-border-radius': '10px', 
                        '-moz-border-radius': '10px', 
                        opacity: .5, 
                        color: '#fff',
                        'z-index': '1200'

    } });
}



function mensajePop(titulo, mensaje)
{
    $.blockUI({ 
                theme:     false, 
                title:    titulo, 
                message:  mensaje, 
                timeout:   3000,
                css: {
                    'z-index': '1300',
                    '-webkit-border-radius': '10px', 
                    '-moz-border-radius': '10px' 
                }
    });
}

});




