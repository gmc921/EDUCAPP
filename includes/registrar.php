<?php

include('conect.php');

if (isset($_POST['btn_registro'])) {
  $nick = $_POST['i_usuario'];
  $pass = $_POST['i_pass'];
  $confirm_pass= $_POST['i_confirmPass'];

  $query = "SELECT nickname FROM alumno WHERE nickname='$nick'";
  $result = mysqli_query($conn, $query);

  if ($row= mysqli_num_rows($result) == 1) {
    $_SESSION['temp'] = $nick;
    $_SESSION['message'] = 'El nombre de usuario ingresado ya existe';
    // $_SESSION['message_type'] = 'warning';
    header("Location: ../form_registrar.php"); 
  }else if ($pass == $confirm_pass) {

    $query = "INSERT INTO alumno VALUES ('$nick','$pass')";
    $result = mysqli_query($conn, $query);

    if(!$result) {
      die("Query Failed.");
    }

    $_SESSION['nick']= $_POST['i_usuario'];
    header("Location: ../form_menu_usuario.php"); 
  }else{
    $_SESSION['temp'] = $nick;
    $_SESSION['msj_pass'] = 'Las contraseñas no coinciden';
    // $_SESSION['message_type'] = 'warning';
    header("Location: ../form_registrar.php"); 
  }

}

?>
