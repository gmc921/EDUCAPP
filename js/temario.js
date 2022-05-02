const nick = sessionStorage.getItem("nombre");

if (nick != null) {
    let nav = document.querySelector(".div_navegacion");
    nav.innerHTML = `<h1 class="encabezado"><b>EDUCAPP</b></h1>
    <nav class="nav">
        <a class="nav-menu" href="form_menu_usuario.html">Menú usuario</a>
        <a class="nav-cerrarSesion" href="index.html">Cerrar sesión</a>
    </nav>`;

    let cerrarSesion = document.querySelector(".nav-cerrarSesion");
    cerrarSesion.addEventListener("click", () => {
        sessionStorage.removeItem("nombre");
    });

} else {
    let nav = document.querySelector(".div_navegacion");
    nav.innerHTML = `<h1 class="encabezado"><b>EDUCAPP</b></h1>
    <nav class="nav">
        <a class="nav-cerrarSesion" href="index.html">Inicio</a>
    </nav>`
}

//! ******************************CERRAR SESION*******************************************
