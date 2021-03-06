let iconos = [];
let selecciones = [];
let puntaje = 0;
let errores = 0;
let close;
let cantidadTarjetas = 16; //16
const nick = sessionStorage.getItem("usuario");
//let arrayUsuarios = [];
// var sonido = new Audio();
// sonido.src = "audio/pop.mp3";


generarTablero();

function cargarIconos() {
  iconos = [
    '<img class="img-memoria" src="img/juego_memorama/Agustin_De_Iturbide.png" alt="">', //0-1
    '<img class="img-memoria" src="img/juego_memorama/Francisco_Javier_Mina.png" alt="">', //2-3
    '<img class="img-memoria" src="img/juego_memorama/Fusilamiento_Morales.png" alt="">',  //4-5
    '<img class="img-memoria" src="img/juego_memorama/Guadalupe_Victoria.png" alt="">', //6-7
    '<img class="img-memoria" src="img/juego_memorama/hidalgo_miguel.jpg" alt="">',  //8-9
    '<img class="img-memoria" src="img/juego_memorama/Iganacio_Allende.png" alt="">',  //10-11
    '<img class="img-memoria" src="img/juego_memorama/Morelos.jpg" alt="">',  //12-13
    '<img class="img-memoria" src="img/juego_memorama/Vicente_Guerrero.png" alt="">',  //14-15
  ];
}

function generarTablero() {

  let barajear = new Audio();
  barajear.src = "audio/barajear.mp3";
  barajear.play();
  limpiarPuntaje();
  cargarIconos();
  selecciones = [];
  let tablero = document.getElementById("tablero");
  let tarjetas = [];
  for (let i = 0; i < cantidadTarjetas; i++) {
    tarjetas.push(`
        <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
            <div class="tarjeta" id="tarjeta${i}" >
                <div class="cara trasera" id="trasera${i}">
                    ${iconos[0]}
                </div>
                <div class="cara superior">
                    <img class="img-interrogacion" src="img/juego_memorama/signo-de-interrogacion.png">
                </div>
            </div>
        </div>        
        `);
    if (i % 2 == 1) {
      iconos.splice(0, 1);
    }
  }
  tarjetas.sort(() => Math.random() - 0.5);
  tablero.innerHTML = tarjetas.join(" ");
}

function seleccionarTarjeta(i) {
  //donde {i} es igual al id de la class tarjeta
  // let sonido = new Audio();
  // sonido.src = "audio/pop.mp3";
  // sonido.play();
  let tarjeta = document.getElementById("tarjeta" + i);
  if (tarjeta.style.transform != "rotateY(180deg)") {
    let sonido = new Audio();
    sonido.src = "audio/pop.mp3";
    sonido.play();
    tarjeta.style.transform = "rotateY(180deg)";
    selecciones.push(i);
    NombreTarjeta(i);
  }
  if (selecciones.length == 2) {
    deseleccionar(selecciones);
    selecciones = [];
  }
}

function deseleccionar(selecciones) {
  //funcion que define si es correcto o no y posteriormente oculta las cartas
  setTimeout(() => {
    let trasera1 = document.getElementById("trasera" + selecciones[0]);
    let trasera2 = document.getElementById("trasera" + selecciones[1]);
    if (trasera1.innerHTML != trasera2.innerHTML) {

      if (errores < 4) {
        let incorrecto = new Audio();
        incorrecto.src = "audio/error.mp3";
        incorrecto.play();
      }
      let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
      let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
      tarjeta1.style.transform = "rotateY(0deg)"; //Si son diferentes las voltea de regreso
      tarjeta2.style.transform = "rotateY(0deg)"; //Si son diferentes las voltea de regreso
      errores++;
      select_id(
        "errores"
      ).innerHTML = `<p><b>FALLOS<b><br> <b Style= "color: #f00701; font-weight: bold;">${errores}</b></p>`;
      if (errores >= 5) { //5 fijo //! 1 para pruebas
        select_id("tablero").setAttribute("hidden", "true");
        msjPerdiste();
      }
    } else {
      if (puntaje < 70) {
        let acierto = new Audio();
        acierto.src = "audio/acierto.mp3";
        acierto.play();
      }
      trasera1.style.background = "#A5FF70"; //Si son iguales pinta el fondo de la tarjeta de verde
      trasera2.style.background = "#A5FF70"; //Si son iguales pinta el fondo de la tarjeta de verde
      puntaje += 10;
      select_id(
        "puntaje"
      ).innerHTML = `<p><b>PUNTAJE<b><br> <b Style= "color: #00ba18;">${puntaje}</b></p>`;
    }

    if (puntaje == (cantidadTarjetas * 5)) {
      msjGanaste(errores);
    }

  }, 1000);
}

function NombreTarjeta(numTarj) {
  let personaje = new Audio();
  if (numTarj == 0 || numTarj == 1) {
    personaje.src = "audio/memorama/agustin.mp3";
    personaje.play();
  }
  if (numTarj == 2 || numTarj == 3) {
    personaje.src = "audio/memorama/JavierMina.mp3";
    personaje.play();
  }
  if (numTarj == 4 || numTarj == 5) {
    personaje.src = "audio/memorama/fusilamiento.mp3";
    personaje.play();
  }
  if (numTarj == 6 || numTarj == 7) {
    personaje.src = "audio/memorama/GuadalupeVictoria.mp3";
    personaje.play();
  }
  if (numTarj == 8 || numTarj == 9) {
    personaje.src = "audio/memorama/Hidalgo.mp3";
    personaje.play();
  }
  if (numTarj == 10 || numTarj == 11) {
    personaje.src = "audio/memorama/Allende.mp3";
    personaje.play();
  }
  if (numTarj == 12 || numTarj == 13) {
    personaje.src = "audio/memorama/Morelos.mp3";
    personaje.play();
  }
  if (numTarj == 14 || numTarj == 15) {
    personaje.src = "audio/memorama/Guerrero.mp3";
    personaje.play();
  }
}


function select_id(id) {
  return document.getElementById(id);
}

function limpiarPuntaje() {
  puntaje = 0;
  errores = 0;
  select_id("puntaje").innerHTML = "";
  select_id("errores").innerHTML = "";
  select_id("tablero").removeAttribute("hidden");
}
/*//! *********VENTANA EMERGENTE*************************************************************************************/

function msjPerdiste() {
  let perdiste = new Audio();
  perdiste.src = "audio/perder.mp3";
  perdiste.play();
  close = document.getElementById("btn_cerrar2");
  document.getElementById("p_msj-p").innerHTML = "M??s suerte para la proxima";
  document.getElementById("modal_h1-p").innerHTML = "No completo el reto";
  document
    .getElementById("section_contenedor-perdiste")
    .classList.add("mostrar");

  close.addEventListener("click", () => {
    registrarPuntos(nick);
    document
      .getElementById("section_contenedor-perdiste")
      .classList.remove("mostrar");
  });
}

function msjGanaste(er) {
  // alert("Has ganado");
  let ganaste = new Audio();
  ganaste.src = "audio/win.mp3";
  ganaste.play();
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

  document.getElementById("p_msj").innerHTML = "Felicidades";
  document.getElementById("modal_h1").innerHTML = "Reto completado";

  close.addEventListener("click", () => {
    registrarPuntos();
    document
      .getElementById("section_contenedor-ganaste")
      .classList.remove("mostrar");
  });
}
//! *****************************GUARDAR DATOS DE PARTIDA ************************************

const dbUsuarios = indexedDB.open("BD", 1);
var pass;
var pntosCarrera;
var pntosMemoria;
var objeto;

dbUsuarios.addEventListener("success", () => {
  infoUsuario();
})


const infoUsuario = () => {
  const dataBD = getIDBData("readonly");
  const cursor = dataBD.openCursor(nick);
  cursor.addEventListener("success", () => {
    if (cursor.result) {
      pass = cursor.result.value.contrasena;
      pntosCarrera = cursor.result.value.pntosCarrera;
      pntosMemoria = cursor.result.value.pntosMemoria;
    }
  })
}

const registrarPuntos = () => {

  if (pntosMemoria === "N/A") {
    pntosMemoria = puntaje;//puntaje
  } else if (pntosMemoria <= puntaje) {
    pntosMemoria = puntaje;
  }

  let objeto = info(nick, pass, pntosCarrera, pntosMemoria);
  const dataBD = getIDBData("readwrite", "modificado correctamente");
  dataBD.put(objeto);
}

const getIDBData = (tipo, msj) => {
  const bd = dbUsuarios.result;
  const bdTransaction = bd.transaction("usuario", tipo);
  const objectStore = bdTransaction.objectStore("usuario");
  bdTransaction.addEventListener("complete", () => {
    console.log(msj);
  })
  return objectStore;
}

const info = (nom_usuario, contrasena, pntosCarrera, pntosMemoria) => {

  let datos = {
    usuario: nom_usuario,
    contrasena: contrasena,
    pntosCarrera: pntosCarrera,
    pntosMemoria: pntosMemoria,
  }
  //arrayUsuarios.push(datos);
  return datos;
}


/* //!Metodo para registrar datos en almacenamiento localStorage
const salvarPuntaje = (user) => {
  let indice;
  arrayUsuarios = JSON.parse(localStorage.getItem('usuarios'));
  arrayUsuarios.forEach((elemento, index) => {
    if (elemento.nom_usuario === user) {
      indice = index;
      console.log(indice);
      if (arrayUsuarios[indice].pntosMemoria === "N/A") {
        arrayUsuarios[indice].pntosMemoria = puntaje;
      } else if (arrayUsuarios[indice].pntosMemoria <= puntaje) {
        arrayUsuarios[indice].pntosMemoria = puntaje;
      }

      //arrayUsuarios[indice].pntosMemoria = 20;
    }
  });
  // console.log(arrayUsuarios[indice]);
  registrarPuntos();
}

const registrarPuntos = () => {
  localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));
  // mostrarDatos();
}*/

// EditarDB(nick);
//! ******************************CERRAR SESION*******************************************
let cerrarSesion = document.querySelector(".nav-cerrarSesion");
cerrarSesion.addEventListener("click", () => {
  sessionStorage.removeItem("usuario");
})
