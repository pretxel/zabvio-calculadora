<?php
 
 $nombre = $_POST['nombre'];
 $opinion = $_POST['opinion'];


 $to = "edsel@zabvio.com";
 $subject = "Hi!";
 $body = "Hi,\n\n ".$nombre." How are you?".$opinion;

 if (mail($to, $subject, $body)) {
   echo 0;
  } else {
    echo 1;
   }


 ?>