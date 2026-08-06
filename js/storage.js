/* ==================================================
   MiRutinaGym V3.1
   storage.js
================================================== */

"use strict";


const Storage = {


    prefijo: "MiRutinaGym_",


    claveHistorial: "MiRutinaGym_historial",



    /* ==========================================
       FUNCIONES BÁSICAS
    ========================================== */


    guardar(clave, valor) {


        localStorage.setItem(

            this.prefijo + clave,

            JSON.stringify(valor)

        );


    },



    leer(clave) {


        const dato = localStorage.getItem(

            this.prefijo + clave

        );


        if(dato === null){

            return null;

        }


        return JSON.parse(dato);


    },



    borrar(clave) {


        localStorage.removeItem(

            this.prefijo + clave

        );


    },



    borrarTodo() {


        Object.keys(localStorage).forEach(clave=>{


            if(clave.startsWith(this.prefijo)){


                localStorage.removeItem(clave);


            }


        });


    },



    /* ==========================================
       HISTORIAL
    ========================================== */


    obtenerHistorial(){


        const historial = localStorage.getItem(

            this.claveHistorial

        );


        if(!historial){

            return [];

        }


        return JSON.parse(historial);


    },



    guardarHistorial(historial){


        localStorage.setItem(

            this.claveHistorial,

            JSON.stringify(historial)

        );


    },



    /* ==========================================
       GUARDAR SESIÓN
    ========================================== */


    guardarSesion(sesion){


        const historial =
            this.obtenerHistorial();



        historial.push(sesion);



        this.guardarHistorial(historial);


    },



    /* ==========================================
       ÚLTIMA SESIÓN
    ========================================== */


    obtenerUltimaSesion(){


        const historial =
            this.obtenerHistorial();



        if(historial.length===0){

            return null;

        }


        return historial[historial.length-1];


    },



    /* ==========================================
       ÚLTIMO EJERCICIO
    ========================================== */


    obtenerUltimoEjercicio(idEjercicio){


        const historial =
            this.obtenerHistorial();



        for(
            let i=historial.length-1;
            i>=0;
            i--
        ){


            const sesion = historial[i];


            const ejercicio =
                sesion.ejercicios.find(

                    e=>e.id===idEjercicio

                );



            if(ejercicio){

                return ejercicio;

            }


        }


        return null;


    },
/* ==========================================
   PLAN SEMANAL
========================================== */

guardarPlanSemanal(plan){

    this.guardar(

        "planSemanal",

        plan

    );

},

obtenerPlanSemanal(){

    return this.leer(

        "planSemanal"

    );

},


/* ==========================================
   RUTINAS PERSONALIZADAS
========================================== */

guardarRutinas(rutinas){

    this.guardar(

        "rutinas",

        rutinas

    );

},

obtenerRutinas(){

    return this.leer(

        "rutinas"

    );

},


    /* ==========================================
       EXPORTAR COPIA COMPLETA
    ========================================== */


    exportar(){


        const datos = {



            fecha:
                new Date().toLocaleDateString(),



            app:
                "MiRutinaGym",



            version:
                "3.1",



            historial:
                this.obtenerHistorial(),



            ejerciciosPersonalizados:
                this.leer("ejerciciosPersonalizados") || {},



            seriesGuardadas:
                obtenerTodasLasSeries(),



          configuracion:{

    imagenes:true

},

planSemanal:

    this.obtenerPlanSemanal(),

rutinas:

    this.obtenerRutinas()



        };



        return JSON.stringify(

            datos,

            null,

            2

        );


    },

    /* ==========================================
   IMPORTAR
========================================== */

importar(json){

    try{

        const datos = JSON.parse(json);

        // Historial

        this.guardarHistorial(

            datos.historial || []

        );

        // Ejercicios personalizados

        this.guardar(

            "ejerciciosPersonalizados",

            datos.ejerciciosPersonalizados || {}

        );

        // Series guardadas

        Object.keys(

            datos.seriesGuardadas || {}

        ).forEach(clave=>{

            this.guardar(

                clave,

                datos.seriesGuardadas[clave]

            );

        });

        // Plan semanal

if(datos.planSemanal){

    this.guardar(

        "planSemanal",

        datos.planSemanal

    );

}

// Rutinas

if(datos.rutinas){

    this.guardar(

        "rutinas",

        datos.rutinas

    );

}
        return true;

    }

    catch{

        return false;

    }

}

};


/* ==========================
   OBTENER SERIES GUARDADAS
========================== */


function obtenerTodasLasSeries(){


    const series = {};



    Object.keys(localStorage).forEach(clave=>{


        if(
            clave.startsWith("MiRutinaGym_")
        ){


            const nombre =

                clave.replace(

                    "MiRutinaGym_",

                    ""

                );



            if(
                nombre.includes("_serie_")
            ){


                series[nombre] =

                    JSON.parse(

                        localStorage.getItem(clave)

                    );


            }


        }


    });



    return series;


}
/* ==========================
   AÑADIR EJERCICIO A RUTINA
========================== */

function añadirEjercicioARutina(dia,idEjercicio){

    const entrenamiento = obtenerRutinaDelDia(dia);

    if(!entrenamiento){

        return;

    }

    const ejercicio = obtenerTodosLosEjercicios().find(

        e => e.id === idEjercicio

    );

    if(!ejercicio){

        return;

    }

    const yaExiste = entrenamiento.ejercicios.some(

        e => e.id === idEjercicio

    );

    if(yaExiste){

        return;

    }

    entrenamiento.ejercicios.push(

        structuredClone(ejercicio)

    );

    guardarRutina();

}
/* ==========================
   ELIMINAR EJERCICIO DE RUTINA
========================== */

function eliminarEjercicioDeRutina(dia,idEjercicio){

    const entrenamiento = obtenerRutinaDelDia(dia);

    if(!entrenamiento){

        return false;

    }

    if(entrenamiento.ejercicios.length<=1){

        return false;

    }

    entrenamiento.ejercicios =
        entrenamiento.ejercicios.filter(

            ejercicio=>ejercicio.id!==idEjercicio

        );

    guardarRutina();

    return true;

}
/* ==========================================
   GUARDAR RUTINA COMPLETA
========================================== */


function guardarRutina(){

    localStorage.setItem(
        "MiRutinaGym_rutinas",
        JSON.stringify(rutinas)
    );

}


/* ==========================================
   CARGAR RUTINA GUARDADA
========================================== */


function cargarRutina(){

    const datos = localStorage.getItem(
        "MiRutinaGym_rutinas"
    );


    if(!datos){

        return;

    }


    const rutinasGuardadas = JSON.parse(datos);


    Object.keys(rutinasGuardadas).forEach(idRutina=>{


        if(rutinas[idRutina]){


            rutinas[idRutina].ejercicios =
                rutinasGuardadas[idRutina].ejercicios;


        }


    });


}
/* ==========================================
   EJERCICIOS PERSONALIZADOS
========================================== */


function guardarEjerciciosPersonalizados(){

    localStorage.setItem(

        "MiRutinaGym_ejercicios_personalizados",

        JSON.stringify(ejerciciosPersonalizados)

    );

}




function cargarEjerciciosPersonalizados(){

    const datos = localStorage.getItem(

        "MiRutinaGym_ejercicios_personalizados"

    );


    if(!datos){

        return;

    }


    const ejercicios = JSON.parse(datos);


    ejerciciosPersonalizados.push(

        ...ejercicios

    );

}