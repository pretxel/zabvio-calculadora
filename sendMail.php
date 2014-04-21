<?php
	$nombre = $_POST['nombre'];
 	$opinion = $_POST['opinion'];

	$to = "edsel@zabvio.com";
 	$subject = "¡Nueva Opinion Calculadora Zabvio!";

	$message = '<html><body>';
	$message .= '<table><tr><th>Nombre</th><th>Opinión</th></tr>';
	$message .= '<tr><td>'.$nombre.'</td><td>'.$opinion.'</td>';
	$message .= '</table>';

	$body = "Hola mi nombre es: ".$nombre." mi oponión sobre la calculadora de zabvio es la siguiente: ".$opinion;

 	if (mail($to, $subject, $body)) {
	   	echo 0;
  	} else {
    	echo 1;
   	}
 ?>