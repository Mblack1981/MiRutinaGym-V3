
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


/* ==========================
   ESTADO
========================== */

const timer = {

    activo: false,

    segundos: 0,

    segundosIniciales: 0,

    finTimestamp: null,

    intervalo: null

};


/* ==========================
   REFERENCIAS
========================== */

function obtenerTimer(){

    return {

        panel: document.getElementById("timer"),

        tiempo: document.getElementById("timerTime"),

        info: document.getElementById("timerInfo"),

        barra: document.getElementById("timerProgress"),

        boton: document.getElementById("timerSkip")

    };

}


/* ==========================
   MOSTRAR
========================== */

function mostrarTimer(){

    obtenerTimer().panel.style.display = "flex";

}


/* ==========================
   OCULTAR
========================== */

function ocultarTimer(){

    obtenerTimer().panel.style.display = "none";

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

    timer.finTimestamp =
        Date.now() + (segundos * 1000);

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

        250

    );

}


/* ==========================
   CUENTA ATRÁS
========================== */

function cuentaAtras(){

    if(!timer.activo){

        return;

    }


    const restante =
        Math.max(
            0,
            timer.finTimestamp - Date.now()
        );


    timer.segundos =
        Math.ceil(restante / 1000);


    actualizarTimer();


    if(restante <= 0){

        finalizarDescanso();

    }

}


/* ==========================
   FINALIZAR
========================== */

function finalizarDescanso(){

    if(!timer.activo){

        return;

    }


    clearInterval(timer.intervalo);

    timer.intervalo = null;

    timer.activo = false;

    timer.segundos = 0;

    timer.finTimestamp = null;


    /* ==========================
       NOTIFICACIÓN PUSH
    ========================== */

    obtenerSuscripcionPush()

        .then(subscription => {

            if(!subscription){

                console.log(
                    "⚠️ No existe suscripción Push."
                );

                return null;

            }


            return enviarNotificacionPush(

                subscription,

                "MiRutinaGym",

                "⏱️ Descanso terminado. ¡Ya puedes hacer la siguiente serie!"

            );

        })

        .then(resultado => {

            if(resultado){

                console.log(
                    "📨 Notificación de descanso enviada:",
                    resultado
                );

            }

        })

        .catch(error => {

            console.error(
                "❌ Error enviando notificación de descanso:",
                error
            );

        });


    /* ==========================
       EFECTO VISUAL
    ========================== */

    const ui = obtenerTimer();


    ui.panel.classList.add("fin");


    /* ==========================
       OCULTAR TEMPORIZADOR
       AL FINALIZAR DESCANSO
    ========================== */

    setTimeout(()=>{

        ui.panel.classList.add("ocultando");


        setTimeout(()=>{

            ui.panel.classList.remove("fin");

            ui.panel.classList.remove("ocultando");

            ocultarTimer();

        },350);


    },300);


    /* ==========================
       SONIDO
    ========================== */

    sonidoFinDescanso.muted = false;

    sonidoFinDescanso.currentTime = 0;


    sonidoFinDescanso.play()

        .catch(error => {

            console.warn(
                "⚠️ No se pudo reproducir el sonido:",
                error
            );

        });

}


/* ==========================
   SIGUIENTE SERIE
========================== */

function irASiguienteSerie(botonActual){

    const botones = [

        ...document.querySelectorAll(".serie-ok")

    ];


    const indice =
        botones.indexOf(botonActual);


    if(indice === -1){

        return;

    }


    const siguiente =
        botones[indice + 1];


    if(!siguiente){

        return;

    }


    siguiente.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });


    const fila =
        siguiente.closest("tr");


    const peso =
        fila.querySelector(".peso");


    setTimeout(()=>{

        peso.focus();

    },500);

}


/* ==========================
   ACTUALIZAR PANTALLA
========================== */

function actualizarTimer(){

    const ui = obtenerTimer();


    const minutos =
        Math.floor(
            timer.segundos / 60
        );


    const segundos =
        timer.segundos % 60;


    ui.tiempo.textContent =

        `${String(minutos).padStart(2,"0")}:${String(segundos).padStart(2,"0")}`;


    /* ==========================
       BARRA DE PROGRESO
    ========================== */

    const porcentaje =

        timer.segundosIniciales > 0

            ? (
                timer.segundos /
                timer.segundosIniciales
              ) * 100

            : 0;


    ui.barra.style.width =
        porcentaje + "%";

}


/* ==========================
   OMITIR DESCANSO
========================== */

function omitirDescanso(){

    clearInterval(timer.intervalo);

    timer.intervalo = null;

    timer.activo = false;

    timer.segundos = 0;

    timer.finTimestamp = null;

    ocultarTimer();

}


/* ==========================
   INICIO
========================== */

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        const botonOmitir =
            document.getElementById("timerSkip");


        if(botonOmitir){

            botonOmitir.addEventListener(

                "click",

                omitirDescanso

            );

        }


        ocultarTimer();

    }

);
