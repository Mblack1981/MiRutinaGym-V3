/* ==================================================
   MiRutinaGym V3.1
   training.js
   Lógica de entrenamiento
================================================== */

"use strict";

const Training = {

    /**
     * Crea una nueva sesión de entrenamiento.
     */
    crearSesion(nombreEntrenamiento) {

        return {
            version: 1,
            fecha: new Date().toISOString(),
            entrenamiento: nombreEntrenamiento,
            ejercicios: []
        };

    },

    /**
     * Añade un ejercicio a una sesión.
     */
    agregarEjercicio(sesion, ejercicio) {

        sesion.ejercicios.push(ejercicio);

    },

    /**
     * Guarda la sesión completa.
     */
    guardarSesion(sesion) {

        Storage.guardarSesion(sesion);

    },

    /**
     * Devuelve el historial.
     */
    obtenerHistorial() {

        return Storage.obtenerHistorial();

    },

    /**
     * Devuelve la última sesión.
     */
    obtenerUltimaSesion() {

        return Storage.obtenerUltimaSesion();

    },

    /**
     * Devuelve el último entrenamiento de un ejercicio.
     */
    obtenerUltimoEjercicio(idEjercicio) {

        return Storage.obtenerUltimoEjercicio(idEjercicio);

    }

};