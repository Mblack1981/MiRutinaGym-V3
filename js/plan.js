/* ===================================================
   MiRutinaGym V3.2
   plan.js
=================================================== */

"use strict";

/* ==========================================
   PLAN SEMANAL POR DEFECTO
========================================== */

const planSemanal = {

    lunes: "torsoA",

    martes: "torsoB",

    miercoles: null,

    jueves: "torsoA",

    viernes: "piernaCore",

    sabado: null,

    domingo: null

};


/* ==========================================
   CARGAR PLAN GUARDADO
========================================== */

const planGuardado =
    localStorage.getItem("MiRutinaGym_planSemanal");

if(planGuardado){

    Object.assign(

        planSemanal,

        JSON.parse(planGuardado)

    );

}