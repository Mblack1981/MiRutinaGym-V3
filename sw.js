"use strict";

const CACHE_NAME = "MiRutinaGym-v3-estable";

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
    "img/favicon-32.png"

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