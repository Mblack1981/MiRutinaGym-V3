/* ===================================================
   MiRutinaGym V2.0
   timer.js
=================================================== */

"use strict";
/* ==========================
   SONIDO
========================== */

const sonidoFinDescanso = new Audio(
    "sounds/pitido_final_serie_2.wav"
);

sonidoFinDescanso.preload = "auto";
window.probarSonidoTimer = function(){

    sonidoFinDescanso.currentTime = 0;

    sonidoFinDescanso.play();

};

/* ==========================
   ESTADO
========================== */

const timer = {

    activo:false,

    segundos:0,

    segundosIniciales:0,

    intervalo:null

};


/* ==========================
   REFERENCIAS
========================== */

function obtenerTimer(){

    return{

        panel:document.getElementById("timer"),

        tiempo:document.getElementById("timerTime"),

        info:document.getElementById("timerInfo"),

        barra:document.getElementById("timerProgress"),

        boton:document.getElementById("timerSkip")

    };

}

/* ==========================
   MOSTRAR
========================== */

function mostrarTimer(){

    obtenerTimer().panel.style.display="flex";

}

/* ==========================
   OCULTAR
========================== */

function ocultarTimer(){

    obtenerTimer().panel.style.display="none";

}

/* ==========================
   INICIAR
========================== */

function iniciarDescanso(

    segundos,

    ejercicio,

    serie,

    totalSeries

){

    timer.segundos = segundos;
    timer.segundosIniciales = segundos;

    timer.activo = true;

    const ui = obtenerTimer();
    ui.panel.classList.remove("fin");
ui.panel.classList.remove("ocultando");

    ui.info.textContent =
        `${ejercicio} · Serie ${serie} de ${totalSeries}`;

    actualizarTimer();

    mostrarTimer();

    if(timer.intervalo){

        clearInterval(timer.intervalo);

    }

    timer.intervalo = setInterval(

        cuentaAtras,

        1000

    );

}
/* ==========================
   CUENTA ATRÁS
========================== */

function cuentaAtras(){

    timer.segundos--;

    actualizarTimer();

    if(timer.segundos <= 0){

        finalizarDescanso();

    }

}
/* ==========================
   FINALIZAR
========================== */

function finalizarDescanso(){

    clearInterval(timer.intervalo);

    timer.intervalo = null;

    timer.activo = false;

    const ui = obtenerTimer();

    ui.panel.classList.add("fin");

    sonidoFinDescanso.currentTime = 0;

    sonidoFinDescanso.play();

    sonidoFinDescanso.onended = ()=>{

        ui.panel.classList.add("ocultando");

        setTimeout(()=>{

            ui.panel.classList.remove("fin");
            ui.panel.classList.remove("ocultando");

            ocultarTimer();

        },350);

    };

}

/* ==========================
   SIGUIENTE SERIE
========================== */

function irASiguienteSerie(botonActual){

    const botones = [
        ...document.querySelectorAll(".serie-ok")
    ];

    const indice = botones.indexOf(botonActual);

    if(indice === -1){
        return;
    }

    const siguiente = botones[indice + 1];

    if(!siguiente){
        return;
    }

    siguiente.scrollIntoView({
        behavior:"smooth",
        block:"center"
    });

    const fila = siguiente.closest("tr");

    const peso = fila.querySelector(".peso");

    setTimeout(()=>{
        peso.focus();
    },500);

}

/* ==========================
   ACTUALIZAR PANTALLA
========================== */
function actualizarTimer(){

    const ui = obtenerTimer();

    const minutos = Math.floor(timer.segundos/60);

    const segundos = timer.segundos%60;

    ui.tiempo.textContent =
        `${String(minutos).padStart(2,"0")}:${String(segundos).padStart(2,"0")}`;

    /* ==========================
       BARRA DE PROGRESO
    ========================== */

    const porcentaje =
        (timer.segundos / timer.segundosIniciales) * 100;

    ui.barra.style.width = porcentaje + "%";

}

/* ==========================
   OMITIR DESCANSO
========================== */

function omitirDescanso(){

    clearInterval(timer.intervalo);

    timer.intervalo = null;

    timer.activo = false;

    ocultarTimer();

}

/* ==========================
   INICIO
========================== */

window.addEventListener("DOMContentLoaded",()=>{


    const botonOmitir = document.getElementById("timerSkip");


    if(botonOmitir){

        botonOmitir.addEventListener(

            "click",

            omitirDescanso

        );

    }


    ocultarTimer();


});