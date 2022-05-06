<?php 

    session_start();

    $conn = mysqli_connect(
        'localhost',
        'root',
        '',
        'Educapp'

    ) 

    or die(mysqli_error($mysqli));
