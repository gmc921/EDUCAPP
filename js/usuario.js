//? ******************************VARIABLES*******************************************
const nick = sessionStorage.getItem("nombre");
let cerrarSesion = document.querySelector(".nav-cerrarSesion");
// let pntosCarrera = 0;
// let pntosMemoria = 0;
let quiz = document.querySelector("#input-quiz");
let memo = document.querySelector("#input-memoria");
let jugar = document.getElementById("btn-jugar");

//! ******************************CERRAR SESION*******************************************
cerrarSesion.addEventListener("click", () => {
    sessionStorage.removeItem("nombre");
})
//! ******************************MOSTRAR DATOS DE USUARIO*********************************
document.addEventListener('DOMContentLoaded', () => {
    mostrarDatos();
});

const mostrarDatos = () => {
    arrayUsuarios = JSON.parse(localStorage.getItem('usuarios'));
    if (arrayUsuarios === null) {
        arrayUsuarios = [];
    } else {
        arrayUsuarios.forEach(element => {
            if (element.nom_usuario == nick) {
                document.getElementById("datos").innerHTML = `<p id="nombre">Usuario: <b>${nick}</b></p>
                            <p id="carrera">Puntos Carrera: <b>${element.pntosCarrera} puntos</b></p>
                            <p id="memorama">Puntos Memorama:  <b>${element.pntosMemoria} puntos</b></p>`;
            }
        });
    }
}

//! ******************************REDIRECCIONAR A JUEGO*********************************
if (jugar != null) {
    jugar.addEventListener("click", () => {
        if (quiz.checked) {
            if (confirm("desea ver las intrucciones?")) {
                vtnIntrucciones();
            } else {
                document.location = "form_carrera.html";
            }
        } else if (memo.checked) {
            if (confirm("desea ver las intrucciones?")) {
                vtnIntrucciones();
            } else {
                document.location = "form_memorama.html";
            }
        } else {
            alert("No selecciono un juego");
        }
    })
}


function vtnIntrucciones() {
    let close = document.getElementById("btn_cerrar");
    let vtna = document.getElementById("section_contenedor");
    console.log(vtna);
    vtna.classList.add("mostrar");
    if (quiz.checked) {
        document.getElementById("vid_instrucciones").innerHTML = `<source src="video/quiz.mp4" type="video/mp4">`;
    } else if (memo.checked) {
        document.getElementById("vid_instrucciones").innerHTML = `<source src="video/memorama.mp4" type="video/mp4">`;
    }
    close.addEventListener("click", () => {
        document.getElementById("section_contenedor").classList.remove("mostrar");
        if (quiz.checked) {
            document.location = "form_carrera.html";
        } else if (memo.checked) {
            document.location = "form_memorama.html";
        }

    });
}

