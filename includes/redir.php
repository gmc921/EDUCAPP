<?php
include('conect.php');

if (isset($_POST['empezar'])) {
    if (empty($_POST['tipo_juego'])) {
        $_SESSION['message'] = 'Debe elegir una opción para jugar';
        // $_SESSION['message_type'] = 'warning';
        header("Location: ../form_menu_usuario2.php");
    } else
        if ($_POST['tipo_juego'] == "quiz") {
        //$_SESSION['nick']= $_POST['i_usuario'];
        header("Location: ../form_carrera.php");
    } else  if ($_POST['tipo_juego'] == "memorama") {
        header("Location: ../form_memorama.php");
    }
}
