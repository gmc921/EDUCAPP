/**
 * ?funcionaes para cargar leer archivo JSON y cargarlo a la pagina
 * !carga el archivo que almacena las preguntas y
 * !las muestra en pantallas apenas inicie la pagina
 *  */
function readText(ruta_local) {
  // ?funcion para leer el archivo JSON
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}

window.onload = function () {
  base_preguntas = readText("json/base-preguntas.json");
  interprete_bp = JSON.parse(base_preguntas);
  escogerPreguntaAleatoria();
};
//************************DECLARACION DE VARIABLE*************************************************************** */
const coche = document.getElementById("img-coche-mov");
let recorreTop = 10.3;
let recorreLeft = 2.6;
//let erroneas = 0;
let close;
const nick = sessionStorage.getItem("nombre");
let arrayUsuarios = [];

let pregunta;
let posibles_respuestas;
btn_correspondiente = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4"),
];
npreguntas = [];

let preguntas_hechas = 0;
let preguntas_correctas = 0;
let preguntas_incorrectas = 0;
//*************************DECLARACION DE FUNCIONES******************************************************************** */
function oprimir_btn(i) {

  if (suspender_botones) {
    return;
  }
  suspender_botones = true;
  // console.log("erroneas: " + erroneas)
  // console.log("preg_incorrectas: " + preguntas_incorrectas)
  // console.log("---------------------")
  //if (preguntas_incorrectas < 5) { //errores
  // console.log("after -> preg_incorrectas: " + preguntas_incorrectas)
  // console.log("---------------------")
  if (posibles_respuestas[i] == pregunta.respuesta) {
    if (preguntas_correctas < 14) {
      let acierto = new Audio();
      acierto.src = "audio/acierto.mp3";
      acierto.play();
    }
    //true para pruebas 
    preguntas_correctas++;
    btn_correspondiente[i].style.background = "#99e599";

    if (preguntas_correctas == 1) {
      recorrerTop();
    } else if (preguntas_correctas > 1 && preguntas_correctas < 3) {
      recorrerTopGiro();
    } else if (preguntas_correctas > 2 && preguntas_correctas < 6) {
      //>2 >7
      recorrerLeft();
    } else if (preguntas_correctas > 5 && preguntas_correctas < 7) {
      //>6 <7
      recorrerLeftGirar();
    } else if (preguntas_correctas > 6 && preguntas_correctas < 9) {
      //>7 <10
      recorrerBottom();
    } else if (preguntas_correctas > 8 && preguntas_correctas < 10) {
      //>9 <11
      recorrerBottomtGirar();
    } else if (preguntas_correctas > 9 && preguntas_correctas < 13) {
      //>10 <14
      recorrerRight();
    } else if (preguntas_correctas > 12 && preguntas_correctas < 14) {
      //>13 <15
      recorrerRightGirar();
    } else if (preguntas_correctas > 13 && preguntas_correctas < 15) {
      //>14 <17
      recorreTop -= 2;
      recorrerTop();
    }
  } else {
    if (preguntas_incorrectas < 4) {
      let incorrecto = new Audio();
      incorrecto.src = "audio/error.mp3";
      incorrecto.play();
    }
    preguntas_incorrectas++;
    btn_correspondiente[i].style.background = "#ff8cbb";
    if (preguntas_incorrectas >= 5) {
      msjPerdiste();
    }
  }
  /*} else {
    msjPerdiste();
  }*/

  for (let j = 0; j < 4; j++) {
    if (posibles_respuestas[j] == pregunta.respuesta) {
      btn_correspondiente[j].style.background = "#99e599";
      break;
    }
  }
  setTimeout(() => {
    reiniciar();
    suspender_botones = false;
  }, 1000); //2000
}
//! ********************************************************************************************** */
function escogerPreguntaAleatoria() {
  let n = Math.floor(Math.random() * interprete_bp.length);
  // n = 0

  while (npreguntas.includes(n)) {
    n++;
    if (n >= interprete_bp.length) {
      n = 0;
    }
    if (npreguntas.length == interprete_bp.length) {
      npreguntas = [];
    }
  }
  npreguntas.push(n);
  preguntas_hechas++;

  escogerPregunta(n);
}
//! ************************************************************************************************* */
function escogerPregunta(n) {
  if (preguntas_correctas < 14) {
    pregunta = interprete_bp[n];
    select_id("dificultad").innerHTML = pregunta.dificultad;
    select_id("pregunta").innerHTML = pregunta.pregunta;
    select_id("numero").innerHTML = n;
    //let pc = preguntas_correctas;
    if (preguntas_hechas > 1) {
      select_id(
        "puntajeAcertado"
      ).innerHTML = `<p>Correctas: <b Style= "color: #00d13d; font-weight: bold;">${preguntas_correctas}</b></p>`;
      select_id(
        "puntajeErroneo"
      ).innerHTML = `<p>Incorrectas: <b Style= "color: #ff0000; font-weight: bolder;">${preguntas_incorrectas}</b></p>`;
    } else {
      select_id("puntajeAcertado").innerHTML = "";
      select_id("puntajeErroneo").innerHTML = "";
    }
    desordenarRespuestas(pregunta);
  } else {
    //console.log("incorrectas" + preguntas_incorrectas);
    msjGanaste(preguntas_incorrectas);
  }
}
//! ************************************************************************************************* */
function desordenarRespuestas(pregunta) {
  posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3,
  ];
  posibles_respuestas.sort(() => Math.random() - 0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
}

let suspender_botones = false;



//***************************APLICAR RECORRIDOS DEL CARRO*********************************************************************** */
function recorrerTop() {
  recorreTop = recorreTop - 9;
  coche.style.top = recorreTop + "vw";
}

function recorrerTopGiro() {
  recorreTop = recorreTop - 1;
  recorreLeft = recorreLeft + 7;
  coche.style.top = recorreTop + "vw";
  coche.style.left = recorreLeft + "vw";
  coche.style.transform = "rotate(90deg)";
}

function recorrerLeft() {
  recorreLeft = recorreLeft + 15.7;//16
  coche.style.left = recorreLeft + "vw";
}
function recorrerLeftGirar() {
  recorreLeft = recorreLeft + 2.9;//3
  recorreTop = recorreTop + 7;
  coche.style.left = recorreLeft + "vw";
  coche.style.top = recorreTop + "vw";
  coche.style.transform = "rotate(180deg)";
}
function recorrerBottom() {
  recorreTop = recorreTop + 10;
  coche.style.top = recorreTop + "vw";
}
function recorrerBottomtGirar() {
  recorreLeft = recorreLeft - 8;
  recorreTop = recorreTop + 3;
  coche.style.left = recorreLeft + "vw";
  coche.style.top = recorreTop + "vw";
  coche.style.transform = "rotate(270deg)";
}
function recorrerRight() {
  recorreLeft = recorreLeft - 15.5;
  coche.style.left = recorreLeft + "vw";
}
function recorrerRightGirar() {
  recorreLeft = recorreLeft - 4.5;
  recorreTop = recorreTop - 4;
  coche.style.left = recorreLeft + "vw";
  coche.style.top = recorreTop + "vw";
  coche.style.transform = "rotate(360deg)";
}

//*************************FUNCIONES DE APOYO****************************************************************************** */

// let p = prompt("numero")
function ocultar() {
  for (const btn of btn_correspondiente) {
    btn.style.display = "none";
  }
}

function reiniciar() {
  for (const btn of btn_correspondiente) {
    btn.style.background = "#fff";
  }
  escogerPreguntaAleatoria();
}

function select_id(id) {
  return document.getElementById(id);
}

/*function style(id) {
  return select_id(id).style;
}*/
function VolverJugar() {
  window.location.reload();
}
/*//! *********VENTANA EMERGENTE*************************************************************************************/

function msjPerdiste() {
  let perdiste = new Audio();
  perdiste.src = "audio/perder.mp3";
  perdiste.play();
  select_id("pregunta-encabezado").style.display = "none";
  ocultar();
  close = document.getElementById("btn_cerrar2");
  document
    .getElementById("section_contenedor-perdiste")
    .classList.add("mostrar");
  document.getElementById("p_msj-p").innerHTML = "Suerte para la proxima";
  document.getElementById("modal_h1-p").innerHTML = "No completo el reto";
  select_id("div_btn_oculto").style.display = "flex";
  select_id("div_msj_oculto").innerHTML = `PERDISTE`;
  select_id("btn5").innerHTML = `VOLVER A JUGAR`;
  select_id("div_msj_oculto").style.backgroundColor = "#FF5B5B";

  close.addEventListener("click", () => {
    salvarPuntaje(nick);
    document
      .getElementById("section_contenedor-perdiste")
      .classList.remove("mostrar");
  });
}

function msjGanaste(er) {
  let ganaste = new Audio();
  ganaste.src = "audio/win.mp3";
  ganaste.play();
  select_id("pregunta-encabezado").style.display = "none";
  ocultar();
  select_id("div_btn_oculto").style.display = "flex";
  select_id("div_msj_oculto").innerHTML = `FELICIDADES JUEGO COMPLETADO`;
  select_id("btn5").innerHTML = `VOLVER A JUGAR`;
  select_id("div_msj_oculto").style.backgroundColor = "#99e599";
  // alert("Has ganado");
  close = document.getElementById("btn_cerrar");
  document
    .getElementById("section_contenedor-ganaste")
    .classList.add("mostrar");
  if (er == 3) {
    document.getElementById("img-estrella-3").classList.add("ocultar-estrella");
  } else if (er > 3) {
    document.getElementById("img-estrella-2").classList.add("ocultar-estrella");
    document.getElementById("img-estrella-3").classList.add("ocultar-estrella");
  }

  document.getElementById("p_msj-g").innerHTML = "Felicidades";
  document.getElementById("modal_h1-g").innerHTML = "Reto completado";

  close.addEventListener("click", () => {
    salvarPuntaje(nick);
    document
      .getElementById("section_contenedor-ganaste")
      .classList.remove("mostrar");
  });
}
//! RESPONSIVE DESIGN MSJ *************************************************************************
const mq = matchMedia("(max-width: 1050px)");

mq.addEventListener("change", () => {
  if (mq.matches) {
    alert("ALERTA\n\t Juego en fase Beta, bajar la resolución podria entorpecer la experiencia de juego\nSe recomienda utilizar la mayor resolución posible");
  }

})
//! *****************************GUARDAR DATOS DE PARTIDA ************************************

const salvarPuntaje = (user) => {
  let indice;
  arrayUsuarios = JSON.parse(localStorage.getItem('usuarios'));
  arrayUsuarios.forEach((elemento, index) => {
    if (elemento.nom_usuario === user) {
      indice = index;
      //console.log(indice);
      if (arrayUsuarios[indice].pntosMemoria === "N/A") {
        arrayUsuarios[indice].pntosMemoria = preguntas_correctas;
      } else if (arrayUsuarios[indice].pntosMemoria <= preguntas_correctas) {
        arrayUsuarios[indice].pntosMemoria = preguntas_correctas;
      }

      //arrayUsuarios[indice].pntosMemoria = 20;
    }
  });
  //console.log(arrayUsuarios[indice]);
  registrarPuntos();
}

const registrarPuntos = () => {
  localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));
}

//! ******************************CERRAR SESION*******************************************
let cerrarSesion = document.querySelector(".nav-cerrarSesion");
cerrarSesion.addEventListener("click", () => {
  sessionStorage.removeItem("nombre");
})
