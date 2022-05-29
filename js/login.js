const formRegistrar = document.getElementById("form_registrar");
const formIngresar = document.getElementById("form_ingresar");
const regresar = document.getElementById("cancelar")
let arrayUsuarios = [];

//! Funciones *************************************************************************

const regUsuario = (nom_usuario, contrasena, pntosCarrera, pntosMemoria) => {

    let datos = {
        nom_usuario: nom_usuario,
        contrasena: contrasena,
        pntosCarrera: pntosCarrera,
        pntosMemoria: pntosMemoria,
    }
    arrayUsuarios.push(datos);
    return datos;
}

const GuardarDB = () => {

    localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));
    // mostrarDatos();
}

const mostrarDatos = () => {
    let nick = document.querySelector('.caja-usuario_input--text').value.trim();
    let pass = document.getElementById("pass").value.trim();
    arrayUsuarios = JSON.parse(localStorage.getItem('usuarios'));
    let cont = 0;
    if (arrayUsuarios === null) {
        alert("Usuario inexistente");
    } else {
        arrayUsuarios.forEach(element => {
            if (element.nom_usuario == nick && element.contrasena == pass) {
                //console.log("logeado");
                sessionStorage.setItem("nombre", nick);
                document.location = "form_menu_usuario.html";
                cont++;
            }
        });
        if (cont === 0) {
            alert("Usuario o contraseña incorrectos");
        }
    }
}

const registrar = () => {
    arrayUsuarios = JSON.parse(localStorage.getItem('usuarios'));
    let nombre = document.querySelector('.caja-usuario_input--text').value.trim();
    let pass = document.getElementById("pass").value.trim();
    let confirmPass = document.getElementById("confirm_pass").value.trim();
    let cont = 0;
    if (pass === confirmPass && pass != "" && confirmPass != "" & nombre != "") {
        if (arrayUsuarios === null) {
            arrayUsuarios = [];
            // console.log("Registro guardado");
            regUsuario(nombre, pass, "N/A", "N/A");
            GuardarDB();
            sessionStorage.setItem("nombre", nombre);
            document.location = "form_menu_usuario.html";
        } else {
            arrayUsuarios.forEach(element => { //?entrar directo al menu sin guardar datos en local || en otro caso agregar contraseña
                if (element.nom_usuario == nombre) {
                    alert("nombre existente: " + element.nom_usuario);
                    cont++;
                }
            });
            if (cont == 0) {
                regUsuario(nombre, pass, "N/A", "N/A");
                GuardarDB();
                formRegistrar.reset();
                //console.log("Registro guardado");
                sessionStorage.setItem("nombre", nombre);
                document.location = "form_menu_usuario.html";
            }
        }
    } else {
        alert("Las contraseñas no coinciden");
    }
}
//! EventListener

regresar.addEventListener("click", (e) => {
    e.preventDefault();
    document.location = "index.html";
})

if (formRegistrar !== null) { //Entra a registrar
    formRegistrar.addEventListener('submit', (e) => { //?Evento para registrar dato en localStorage 
        e.preventDefault();
        registrar();
    });

} else {
    formIngresar.addEventListener("submit", (e) => {
        e.preventDefault();
        mostrarDatos();
    })
}




