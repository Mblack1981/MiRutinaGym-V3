/* ===================================================
   MiRutinaGym V2.0
   rutina.js
=================================================== */

window.rutinas = {

    torsoA: {

        nombre: "Torso A",

        subtitulo: "Empuje + Tirón",

        ejercicios: [

            {
                id: "press_banca",
                nombre: "Press de banca",
                imagen: "img/press_banca.webp",
                musculo: "Pecho",
                series: 4,
                repeticiones: "8-10",
                descanso: 90,
                rir: "1-2",
                consejo: "Mantén las escápulas retraídas durante todo el movimiento."
            },

            {
                id: "remo_barra",
                nombre: "Remo con barra",
                imagen: "img/remo_con_barra.webp",
                musculo: "Espalda",
                series: 4,
                repeticiones: "8-10",
                descanso: 90,
                rir: "1-2",
                consejo: "Lleva la barra hacia el ombligo sin balancear el cuerpo."
            },

            {
                id: "press_militar",
                nombre: "Press militar",
                musculo: "Hombro",
                imagen: "img/press_militar_sentado.webp",
                series: 3,
                repeticiones: "10",
                descanso: 75,
                rir: "1-2",
                consejo: "Aprieta el abdomen para mantener la espalda estable."
            },

            {
                id: "jalon_pecho",
                nombre: "Jalon al pecho",
                musculo: "Espalda",
                imagen: "img/jalon_al_pecho.webp",
                series: 3,
                repeticiones: "10",
                descanso: 75,
                rir: "1-2",
                consejo: "Baja los codos hacia las costillas."
            },

            {
                id: "laterales",
                nombre: "Elevaciones laterales",
                musculo: "Hombro",
                imagen: "img/elevaciones_laterales.webp",
                series: 4,
                repeticiones: "12-15",
                descanso: 60,
                rir: "1",
                consejo: "Levanta los brazos hasta la altura de los hombros."
            }

        ]

    },

    piernaCore: {

        nombre: "Pierna + Core",

        subtitulo: "Pierna completa",

        ejercicios: [

            {
                id: "sentadilla",
                nombre: "Sentadilla",
                musculo: "Piernas",
                imagen: "img/sentadilla.webp",
                series: 4,
                repeticiones: "8-10",
                descanso: 120,
                rir: "2",
                consejo: "Mantén la espalda neutra durante todo el recorrido."
            },

            {
                id: "peso_muerto_rumano",
                nombre: "Peso muerto rumano",
                musculo: "Isquiotibiales",
                imagen: "img/peso_muerto_rumano.webp",
                series: 4,
                repeticiones: "8-10",
                descanso: 90,
                rir: "2",
                consejo: "Empuja la cadera hacia atrás antes de bajar."
            },

            {
                id: "prensa",
                nombre: "Prensa",
                musculo: "Cuádriceps",
                imagen: "img/prensa.webp",
                series: 3,
                repeticiones: "10-12",
                descanso: 90,
                rir: "1-2",
                consejo: "No bloquees completamente las rodillas."
            },

            {
                id: "gemelos",
                nombre: "Elevación de gemelos",
                musculo: "Gemelos",
                imagen: "img/elevacion_gemelos.webp",
                series: 4,
                repeticiones: "15",
                descanso: 60,
                rir: "1",
                consejo: "Haz una pausa arriba en cada repetición."
            },

            {
                id: "plancha",
                nombre: "Plancha",
                musculo: "Core",
                imagen: "img/plancha.webp",
                series: 3,
                repeticiones: "40-60 s",
                descanso: 45,
                rir: "-",
                consejo: "Mantén el cuerpo completamente alineado."
            }

        ]

    },

    torsoB: {

        nombre: "Torso B",

        subtitulo: "Hipertrofia",

        ejercicios: [

            {
                id: "press_inclinado",
                nombre: "Press inclinado con mancuernas",
                musculo: "Pecho",
                imagen: "img/press_inclinado.webp",
                series: 4,
                repeticiones: "8-10",
                descanso: 90,
                rir: "1-2",
                consejo: "Controla la bajada durante dos segundos."
            },

            {
                id: "remo_polea",
                nombre: "Remo en polea",
                musculo: "Espalda",
                imagen: "img/remo_polea.webp",
                series: 4,
                repeticiones: "10",
                descanso: 75,
                rir: "1-2",
                consejo: "Saca pecho y junta las escápulas al final."
            },

            {
                id: "face_pull",
                nombre: "Face Pull",
                musculo: "Hombro posterior",
                imagen: "img/face_pull.webp",
                series: 3,
                repeticiones: "12-15",
                descanso: 60,
                rir: "1",
                consejo: "Lleva las manos hacia la altura de la cara."
            },

            {
                id: "curl_biceps",
                nombre: "Curl de bíceps",
                musculo: "Bíceps",
                imagen: "img/curl_biceps.webp",
                series: 3,
                repeticiones: "10-12",
                descanso: 60,
                rir: "1",
                consejo: "Evita balancear el cuerpo."
            },

            {
                id: "extension_triceps",
                nombre: "Extensión de tríceps en polea",
                musculo: "Tríceps",
                imagen: "img/extension_triceps.webp",
                series: 3,
                repeticiones: "10-12",
                descanso: 60,
                rir: "1",
                consejo: "Mantén los codos pegados al cuerpo."
            }

        ]

    }

};

/* ==========================================
   EJERCICIOS PERSONALIZADOS DEL USUARIO
========================================== */

const ejerciciosPersonalizados = [];



/* ==========================================
   BIBLIOTECA COMPLETA DE EJERCICIOS
========================================== */

const bibliotecaEjercicios = [];
const ejerciciosBase = [

{
    id: "curl_scott",
    nombre: "Curl Scott",
    imagen: "img/curl_scott.webp",
    musculo: "Bíceps",
    series: 3,
    repeticiones: "10-12",
    descanso: 60,
    rir: "1-2",
    consejo: "Controla la bajada y evita despegar los brazos."
},

{
    id: "curl_martillo",
    nombre: "Curl martillo",
    imagen: "img/curl_martillo.webp",
    musculo: "Bíceps",
    series: 3,
    repeticiones: "10-12",
    descanso: 60,
    rir: "1-2",
    consejo: "Mantén las muñecas en posición neutra."
},
{
    id: "aperturas_peckdeck",
    nombre: "Aperturas Peck Deck",
    imagen: "img/aperturas_peckdeck.webp",
    musculo: "Pecho",
    series: 3,
    repeticiones: "12-15",
    descanso: 60,
    rir: "1-2",
    consejo: "Mantén el pecho abierto y controla el cierre."
},

{
    id: "fondos",
    nombre: "Fondos",
    imagen: "img/fondos.webp",
    musculo: "Pecho / Tríceps",
    series: 3,
    repeticiones: "8-12",
    descanso: 90,
    rir: "1-2",
    consejo: "Inclina ligeramente el torso para enfatizar el pecho."
},

{
    id: "pullover",
    nombre: "Pullover",
    imagen: "img/pullover.webp",
    musculo: "Pecho / Espalda",
    series: 3,
    repeticiones: "10-12",
    descanso: 75,
    rir: "1-2",
    consejo: "Controla el recorrido y evita perder tensión."
},

{
    id: "remo_mancuerna",
    nombre: "Remo con mancuerna",
    imagen: "img/remo_mancuerna.webp",
    musculo: "Espalda",
    series: 4,
    repeticiones: "8-12",
    descanso: 90,
    rir: "1-2",
    consejo: "Lleva el codo hacia atrás sin girar el torso."
},

{
    id: "dominadas",
    nombre: "Dominadas",
    imagen: "img/dominadas.webp",
    musculo: "Espalda",
    series: 4,
    repeticiones: "6-10",
    descanso: 120,
    rir: "1-2",
    consejo: "Activa la espalda antes de tirar con los brazos."
},

{
    id: "jalon_agarre_estrecho",
    nombre: "Jalón agarre estrecho",
    imagen: "img/jalon_agarre_estrecho.webp",
    musculo: "Espalda",
    series: 3,
    repeticiones: "10-12",
    descanso: 75,
    rir: "1-2",
    consejo: "Lleva los codos hacia abajo y atrás."
},

{
    id: "remo_t_bar",
    nombre: "Remo T-Bar",
    imagen: "img/remo_t_bar.webp",
    musculo: "Espalda",
    series: 4,
    repeticiones: "8-10",
    descanso: 90,
    rir: "1-2",
    consejo: "Mantén la espalda estable durante todo el movimiento."
},

{
    id: "encogimientos",
    nombre: "Encogimientos",
    imagen: "img/encogimientos.webp",
    musculo: "Trapecio",
    series: 3,
    repeticiones: "10-15",
    descanso: 60,
    rir: "1",
    consejo: "Eleva los hombros sin hacer rotaciones."
},

{
    id: "prensa_unilateral",
    nombre: "Prensa unilateral",
    imagen: "img/prensa_unilateral.webp",
    musculo: "Cuádriceps",
    series: 3,
    repeticiones: "10-12",
    descanso: 90,
    rir: "1-2",
    consejo: "Controla la bajada y evita bloquear la rodilla."
}

];



/* ==========================================
   ACTUALIZAR BIBLIOTECA DE EJERCICIOS
========================================== */

function actualizarBibliotecaEjercicios(){


    // Vaciar biblioteca actual

    bibliotecaEjercicios.length = 0;



    // Añadir ejercicios base


    ejerciciosBase.forEach(ejercicio=>{


        if(!bibliotecaEjercicios.some(e=>e.id===ejercicio.id)){


            bibliotecaEjercicios.push({

                ...ejercicio

            });


        }


    });



    // Añadir ejercicios originales


   Object.values(rutinas).forEach(entrenamiento=>{

    entrenamiento.ejercicios.forEach(ejercicio=>{


            if(!bibliotecaEjercicios.some(e=>e.id===ejercicio.id)){


                bibliotecaEjercicios.push({

                    ...ejercicio

                });


            }


        });


    });



    // Añadir ejercicios personalizados


    ejerciciosPersonalizados.forEach(ejercicio=>{


        if(!bibliotecaEjercicios.some(e=>e.id===ejercicio.id)){


            bibliotecaEjercicios.push({

                ...ejercicio

            });


        }


    });


}



/* ==========================================
   OBTENER TODOS LOS EJERCICIOS
========================================== */


function obtenerTodosLosEjercicios(){

    return bibliotecaEjercicios;

}



/* ==========================================
   INICIALIZAR BIBLIOTECA
========================================== */


actualizarBibliotecaEjercicios();

/* ==========================================
   OBTENER RUTINA SEGÚN PLAN SEMANAL
========================================== */

function obtenerRutinaDelDia(dia){

    if(!planSemanal || !planSemanal[dia]){

        return null;

    }


    const idRutina = planSemanal[dia];


    return rutinas[idRutina] || null;

}