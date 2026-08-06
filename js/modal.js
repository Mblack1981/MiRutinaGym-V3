/* ===================================================
   MiRutinaGym V2.0
   modal.js
=================================================== */

"use strict";


/* ==========================
   REFERENCIAS
========================== */

function obtenerModal(){

    return{

        overlay:document.getElementById("modalOverlay"),

        titulo:document.getElementById("modalTitulo"),

        texto:document.getElementById("modalTexto"),

        ok:document.getElementById("modalOk"),

        cancel:document.getElementById("modalCancel")

    };

}



/* ==========================
   CONFIRMACIÓN
========================== */

function mostrarConfirmacion(

    titulo,

    mensaje,

    aceptar,

    textoBoton = "💾 Guardar"

){

    const modal = obtenerModal();


    modal.titulo.textContent = titulo;

    modal.texto.textContent = mensaje;


    modal.cancel.style.display = "";

    modal.cancel.textContent = "Cancelar";


    modal.ok.textContent = textoBoton;


    modal.overlay.style.display = "flex";



    modal.ok.onclick = ()=>{


        cerrarModal();


        if(aceptar){

            aceptar();

        }


    };



    modal.cancel.onclick = ()=>{


        cerrarModal();


    };


}
/* ==========================
   MENSAJE INFORMATIVO
========================== */

function mostrarMensaje(

    titulo,

    mensaje,

    accion

){

    const modal = obtenerModal();



    modal.titulo.textContent = titulo;


    modal.texto.textContent = mensaje;



    modal.cancel.style.display = "none";


    modal.ok.textContent = "Aceptar";


    modal.overlay.style.display = "flex";



    modal.ok.onclick = ()=>{


        cerrarModal();



        // Restaurar estado normal

        modal.cancel.style.display = "";

        modal.ok.textContent = "💾 Guardar";



        if(accion){

            accion();

        }


    };


}



/* ==========================
   CERRAR MODAL
========================== */

function cerrarModal(){


    const modal = obtenerModal();


    modal.overlay.style.display = "none";


}