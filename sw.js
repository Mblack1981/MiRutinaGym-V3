"use strict";

const CACHE_NAME = "MiRutinaGym-v3.1-imagenes";

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

    "manifest.json",

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

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME).then(cache => {

            return cache.addAll(FILES_TO_CACHE);

        })

    );

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys =>

            Promise.all(

                keys.map(key => {

                    if(key !== CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            )

        )

    );

});

self.addEventListener("fetch", event => {

    if(event.request.method !== "GET"){

        return;

    }

    event.respondWith(

        caches.match(event.request).then(response => {

            return response || fetch(event.request);

        })

    );

});