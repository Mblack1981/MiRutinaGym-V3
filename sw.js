
"use strict";

/* ===================================================
   SERVICE WORKER
   MiRutinaGym V3.1 FINAL ESTABLE OFFLINE
=================================================== */


/* ==========================
   VERSIÓN DE CACHÉ
========================== */

const CACHE_NAME = "MiRutinaGym-v3.1-final-v4";


/* ==========================
   ARCHIVOS A CACHEAR
========================== */

const FILES_TO_CACHE = [

    "./",
    "index.html",

    "style.css",
    "modal.css",
    "timer.css",

    "js/app.js",
    "js/ui.js",
    "js/training.js",
    "js/storage.js",
    "js/rutina.js",
    "js/modal.js",
    "js/timer.js",
    "js/plan.js",
    "js/push.js",

    "manifest.json",

    "sounds/pitido_final_serie_2.wav",

    "img/icon-192.png",
    "img/icon-512.png",
    "img/apple-touch-icon.png",
    "img/favicon-32.png",

    "img/abductores.webp",
    "img/aperturas_peckdeck.webp",
    "img/crunch_polea.webp",
    "img/curl_biceps.webp",
    "img/curl_femoral.webp",
    "img/curl_martillo.webp",
    "img/curl_scott.webp",
    "img/dominadas.webp",
    "img/elevacion_gemelos.webp",
    "img/elevaciones_laterales.webp",
    "img/elevaciones_piernas.webp",
    "img/encogimientos.webp",
    "img/extension_triceps.webp",
    "img/extension_triceps_mancuerna.webp",
    "img/extensiones_cuadriceps.webp",
    "img/face_pull.webp",
    "img/fondos.webp",
    "img/hip_thrust.webp",
    "img/jalon_agarre_estrecho.webp",
    "img/jalon_al_pecho.webp",
    "img/peso_muerto_rumano.webp",
    "img/plancha.webp",
    "img/prensa.webp",
    "img/prensa_unilateral.webp",
    "img/press_banca.webp",
    "img/press_frances.webp",
    "img/press_inclinado.webp",
    "img/press_militar_sentado.webp",
    "img/pullover.webp",
    "img/remo_con_barra.webp",
    "img/remo_mancuerna.webp",
    "img/remo_polea.webp",
    "img/remo_t_bar.webp",
    "img/rueda_abdominal.webp",
    "img/sentadilla.webp"

];


/* ==========================
   INSTALACIÓN
========================== */

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => {

                console.log(
                    "📦 Instalando caché:",
                    CACHE_NAME
                );

                return cache.addAll(
                    FILES_TO_CACHE
                );

            })

            .then(() => {

                console.log(
                    "✅ Todos los archivos guardados en caché."
                );

            })

    );

});


/* ==========================
   ACTIVACIÓN
========================== */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

            .then(keys => {

                return Promise.all(

                    keys.map(key => {

                        if(key !== CACHE_NAME){

                            console.log(
                                "🗑️ Eliminando caché antigua:",
                                key
                            );

                            return caches.delete(key);

                        }

                        return null;

                    })

                );

            })

            .then(() => {

                console.log(
                    "✅ Service Worker activado:",
                    CACHE_NAME
                );

                return self.clients.claim();

            })

    );

});


/* ==========================
   FETCH
========================== */

self.addEventListener("fetch", event => {

    if(event.request.method !== "GET"){

        return;

    }


    event.respondWith(

        caches.match(event.request)

            .then(response => {

                if(response){

                    return response;

                }


                return fetch(event.request);

            })

            .catch(error => {

                console.warn(
                    "⚠️ Error cargando recurso:",
                    event.request.url,
                    error
                );


                /*
                   No dejamos que el Service Worker
                   produzca un "Uncaught (in promise)".
                */

                return new Response(
                    "",
                    {
                        status: 503,
                        statusText:
                            "Recurso no disponible"
                    }
                );

            })

    );

});


/* ==========================
   PUSH NOTIFICATIONS
========================== */

self.addEventListener("push", event => {

    console.log(
        "📨 Evento Push recibido."
    );


    if(!event.data){

        console.warn(
            "⚠️ Push recibido sin datos."
        );

        return;

    }


    let data = {};


    try {

        data = event.data.json();

    } catch(error) {

        console.warn(
            "⚠️ El Push no contiene JSON válido."
        );

        data = {

            mensaje:
                event.data.text()

        };

    }


    const titulo =
        data.titulo ||
        "MiRutinaGym";


    const opciones = {

        body:
            data.mensaje ||
            "Tienes una nueva notificación",

        icon:
            "img/icon-192.png",

        badge:
            "img/icon-192.png",

        data: {

            url: "./"

        }

    };


    event.waitUntil(

        self.registration.showNotification(

            titulo,

            opciones

        )

    );

});


/* ==========================
   CLICK EN NOTIFICACIÓN
========================== */

self.addEventListener(
    "notificationclick",
    event => {

        event.notification.close();


        event.waitUntil(

            clients.matchAll({

                type: "window",

                includeUncontrolled: true

            })

            .then(clientList => {

                for(
                    const client of clientList
                ){

                    if("focus" in client){

                        return client.focus();

                    }

                }


                if(clients.openWindow){

                    return clients.openWindow(

                        event.notification
                            .data
                            .url

                    );

                }

            })

        );

    }

);

