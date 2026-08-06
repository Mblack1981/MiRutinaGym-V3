/* ===================================================
   MiRutinaGym V2.0
   app.js
=================================================== */

"use strict";


/* ==========================
   INICIAR APLICACIÓN
========================== */


document.addEventListener("DOMContentLoaded", iniciarApp);
/* ==========================
   SERVICE WORKER
========================== */

// Desactivado durante el desarrollo.
// Lo volveremos a activar cuando publiquemos la V1.


/* ==========================
   SERVICE WORKER
========================== */

// Durante el desarrollo (Live Server) NO registrar el Service Worker.
// En producción (GitHub Pages) sí.

if (
    "serviceWorker" in navigator &&
    location.hostname !== "127.0.0.1" &&
    location.hostname !== "localhost"
){

    window.addEventListener("load",()=>{

        navigator.serviceWorker.register("sw.js")
        .then(()=>{

            console.log("✅ Service Worker registrado");

        })
        .catch(error=>{

            console.error(
                "❌ Error Service Worker:",
                error
            );

        });

    });

}




function iniciarApp(){

    console.log("🏋️ MiRutinaGym iniciado correctamente");


  comprobarDependencias();

cargarRutina();

cargarEjerciciosPersonalizados();

mostrarInicio();

}



/* ==========================
   COMPROBAR DEPENDENCIAS
========================== */


function comprobarDependencias(){

  if(typeof window.rutinas === "undefined"){

    console.error("❌ rutina.js no está cargado.");

    return;

}


    if(typeof Storage==="undefined"){

        console.error("❌ storage.js no está cargado.");

        return;

    }


    if(typeof mostrarInicio!=="function"){

        console.error("❌ ui.js no está cargado.");

        return;

    }


    console.log("✅ Todos los módulos cargados.");

}



/* ==========================
   UTILIDADES
========================== */


function reiniciarEntrenamiento(){

    if(confirm("¿Borrar todos los datos guardados?")){

        Storage.borrarTodo();

        mostrarInicio();

    }

}