<?php
include('conect.php');

if (isset($_POST['iniciar_sesion'])) {

    $nick = $_POST['i_usuario'];
    $pass = $_POST['i_pass'];
    // echo "usuario: $nick";
    // echo "Contrasena: $pass";

    $query = "SELECT count(*) FROM alumno WHERE nickname='$nick' AND contrasena='$pass'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 1) {
        // echo "Datos validos";
        $_SESSION['nick'] = $_POST['i_usuario'];
        header("Location: ../form_menu_usuario.php");
        echo $nick;
    } else {
        // die("Datos invalidos");
        $_SESSION['temp'] = $nick;
        $_SESSION['message'] = 'Usuario o contraseña incorrecta';
        // $_SESSION['message_type'] = 'warning';
        header("Location: ../form_login.php");
    }
} else {
    echo "no entra al if";
}
