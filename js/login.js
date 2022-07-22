const formRegistrar = document.getElementById("form_registrar");
const formIngresar = document.getElementById("form_ingresar");
const regresar = document.getElementById("cancelar")
let arrayUsuarios = [];

//! Funciones *************************************************************************

const info = (nom_usuario, contrasena, pntosCarrera, pntosMemoria) => {

    let datos = {
        usuario: nom_usuario,
        contrasena: contrasena,
        pntosCarrera: pntosCarrera,
        pntosMemoria: pntosMemoria,
    }
    arrayUsuarios.push(datos);
    return datos;
}

//! Funciones INDEXDB*************************************************************************

//! CRUD con IndexDB

const dbUsuarios = indexedDB.open("BD", 1);


dbUsuarios.addEventListener("upgradeneeded", () => {
    const bd = dbUsuarios.result;
    bd.createObjectStore("usuario", {
        keyPath: "usuario"
    });
})

dbUsuarios.addEventListener("success", () => {
    console.log("Todo correcto")
})

dbUsuarios.addEventListener("error", () => {
    console.log("Error en BD")
})

const agregarDatos = () => {
    let nombre = document.querySelector('.caja-usuario_input--text').value.trim();
    let pass = document.getElementById("pass").value.trim();
    let confirmPass = document.getElementById("confirm_pass").value.trim();
    let objeto = info(nombre, pass, "N/A", "N/A");

    if (pass === confirmPass && pass != "" && confirmPass != "" & nombre != "") {
        const dataBD = getIDBData("readwrite", "agregado correctamente");
        dataBD.add(objeto);
    } else {
        alert("Contraseña no coincide");
    }
}

const mostrarDatos = () => {
    user = document.querySelector('.caja-usuario_input--text').value.trim();
    pass = document.getElementById("pass").value.trim();
    const bd = dbUsuarios.result;
    const bdTransaction = bd.transaction("usuario", "readonly");
    const objectStore = bdTransaction.objectStore("usuario");
    const cursor = objectStore.openCursor(user);

    cursor.addEventListener("success", () => {
        if (cursor.result) {
            //let usuario = cursor.result.value.usuario; //!se elimina ya que la busqueda se hace a partir de la key en este caso es el nombre de usuario
            let contrasena = cursor.result.value.contrasena;
            if (contrasena == pass) {
                //console.log(cursor.result.value)
                sessionStorage.setItem("usuario", user);
                document.location = "form_menu_usuario.html";
            } else {
                alert("contraseña invalida")
            }
        } else {
            alert("usuario invalido")
        }

    })
}

const getIDBData = (tipo, msj) => {
    const bd = dbUsuarios.result;
    const bdTransaction = bd.transaction("usuario", tipo);
    const objectStore = bdTransaction.objectStore("usuario");
    bdTransaction.addEventListener("complete", () => {
        console.log(msj);
        //!si el usuario no existe y es agregado correctamente se direcciona a la ventana correspondiente
        let nombre = document.querySelector('.caja-usuario_input--text').value.trim();
        sessionStorage.setItem("usuario", nombre);
        document.location = "form_menu_usuario.html";
    })
    bdTransaction.addEventListener("error", () => {
        alert("El usuario ingresado ya existe");
    })
    return objectStore;
}

//! EventListener

regresar.addEventListener("click", (e) => {
    e.preventDefault();
    document.location = "index.html";
})

if (formRegistrar !== null) { //Entra a registrar
    formRegistrar.addEventListener('submit', (e) => { //?Evento para registrar dato en localStorage 
        e.preventDefault();
        agregarDatos();
    });

} else {
    formIngresar.addEventListener("submit", (e) => {
        e.preventDefault();
        mostrarDatos();
    })
}

//!funciones localStorage

/*
const GuardarDB = () => {

    localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));
    // mostrarDatos();
}

const mostrarDatos_localStorage = () => {
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

// const registrar = () => {
//     arrayUsuarios = JSON.parse(localStorage.getItem('usuarios'));
//     let nombre = document.querySelector('.caja-usuario_input--text').value.trim();
//     let pass = document.getElementById("pass").value.trim();
//     let confirmPass = document.getElementById("confirm_pass").value.trim();
//     let cont = 0;
//     if (pass === confirmPass && pass != "" && confirmPass != "" & nombre != "") {
//         if (arrayUsuarios === null) {
//             arrayUsuarios = [];
//             // console.log("Registro guardado");
//             regUsuario(nombre, pass, "N/A", "N/A");
//             GuardarDB();
//             sessionStorage.setItem("nombre", nombre);
//             document.location = "form_menu_usuario.html";
//         } else {
//             arrayUsuarios.forEach(element => { //?entrar directo al menu sin guardar datos en local || en otro caso agregar contraseña
//                 if (element.nom_usuario == nombre) {
//                     alert("nombre existente: " + element.nom_usuario);
//                     cont++;
//                 }
//             });
//             if (cont == 0) {
//                 regUsuario(nombre, pass, "N/A", "N/A");
//                 GuardarDB();
//                 formRegistrar.reset();
//                 //console.log("Registro guardado");
//                 sessionStorage.setItem("nombre", nombre);
//                 document.location = "form_menu_usuario.html";
//             }
//         }
//     } else {
//         alert("Las contraseñas no coinciden");
//     }
// }
*/





