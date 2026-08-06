/* ===================================================
   MiRutinaGym V2.0
   ui.js
=================================================== */

"use strict";
/* ==========================
   MODO DESARROLLO
========================== */

const DEBUG = false;

// Día que quieres simular:
// "lunes"
// "martes"
// "miercoles"
// "jueves"
// "viernes"
// "sabado"
// "domingo"

const DEBUG_DIA = "viernes";


/* ==========================
   REFERENCIAS
========================== */

const content = document.getElementById("content");
const todayText = document.getElementById("todayText");
let entrenamientoActual = null;

/* ==========================
   DÍAS
========================== */

const nombresDias = {

    domingo: "Domingo",
    lunes: "Lunes",
    martes: "Martes",
    miercoles: "Miércoles",
    jueves: "Jueves",
    viernes: "Viernes",
    sabado: "Sábado"

};

/* ==========================
   OBTENER DÍA ACTUAL
========================== */

function obtenerDiaActual(){

    if(DEBUG){

        return DEBUG_DIA;

    }

    const dias=[

        "domingo",
        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes",
        "sabado"

    ];

    return dias[new Date().getDay()];

}
/* ==========================
   OBTENER RUTINA DE HOY
========================== */


function obtenerRutinaDeHoy(){

    const hoy = obtenerDiaActual();

    const idRutina = planSemanal[hoy];

    if(!idRutina){

        return null;

    }

    return window.rutinas[idRutina];

}
/* ==========================
   PANTALLA INICIO
========================== */

function mostrarInicio(){

    const hoy = obtenerDiaActual();

    if(DEBUG){

        todayText.innerHTML =
            "🟠 <strong>MODO DESARROLLO</strong> · Hoy simulado: " +
            nombresDias[hoy];

    }
    else{

        todayText.textContent =
            "Hoy es " + nombresDias[hoy];

    }

    const datos = obtenerRutinaDeHoy();

    if(!datos){

        content.innerHTML = `

        <div class="home-card">

            <h2>😎</h2>

            <h1>Descanso</h1>

            <p>Hoy toca recuperación.</p>

        </div>

        `;

        return;

    }

    let debugHTML = "";

    if(DEBUG){

        debugHTML = `

        <div class="debug-panel">

            <h3>🟠 Panel de desarrollo</h3>

            <label>Día simulado</label>

            <select id="debugDay">

                <option value="lunes">Lunes</option>
                <option value="martes">Martes</option>
                <option value="miercoles">Miércoles</option>
                <option value="jueves">Jueves</option>
                <option value="viernes">Viernes</option>
                <option value="sabado">Sábado</option>
                <option value="domingo">Domingo</option>

            </select>

            <button
                class="debug-clear"
                id="debugClear">

                🗑️ Borrar entrenamiento

            </button>

            <button
                class="debug-storage"
                id="debugStorage">

                📦 Ver localStorage

            </button>

        </div>

        `;

    }

    content.innerHTML = `

    <div class="home-card">

        <h2>💪</h2>

        <h1>${datos.nombre}</h1>

        <p>${datos.subtitulo}</p>

        <button
            class="start-btn"
            id="startTraining">

            COMENZAR ENTRENAMIENTO

        </button>

        ${debugHTML}

    </div>

    `;

    document
    .getElementById("startTraining")
    .addEventListener("click", ()=>{

        mostrarEntrenamiento(datos);

    });

    const debugClear = document.getElementById("debugClear");

    if(debugClear){

        debugClear.addEventListener("click",()=>{

            localStorage.removeItem("sesiones");

            Storage.borrarTodo();

            mostrarMensaje(

                "🗑️ Datos eliminados",

                "Historial, pesos y progreso borrados correctamente."

            );

            mostrarInicio();

        });

    }

}

/* ==========================
   PANTALLA ENTRENAMIENTO
========================== */
function mostrarEntrenamiento(datos){
        entrenamientoActual = datos;

    if(!datos){

        mostrarInicio();

        return;

    }

    let html=`

<div class="home-card">

    <h1>${datos.nombre}</h1>

    <p>${datos.subtitulo}</p>

    <div class="progress">

        <div
            id="progressBar"
            class="progress-bar">

        </div>

    </div>

    <p
        id="progressText"
        class="progress-text">

        0%

    </p>

</div>

`;

    datos.ejercicios.forEach((ejercicio,index)=>{

        const ultimo = Training.obtenerUltimoEjercicio(ejercicio.id);

        html+=`

<div class="exercise-card">

    <div class="exercise-header">

       <div class="exercise-info">

    <h3>

        ${index+1}. ${ejercicio.nombre}

    </h3>

    <p>

        💪 <strong>${ejercicio.musculo}</strong>

    </p>

    <p>

        🔁 <strong>${ejercicio.series}</strong> series

    </p>

    <p>

        🎯 <strong>${ejercicio.repeticiones}</strong> reps

    </p>

    <p>

        ⏱ <strong>${ejercicio.descanso}</strong> s descanso

    </p>

    <p>

        🔥 <strong>RIR ${ejercicio.rir}</strong>

    </p>

</div>

        <div class="exercise-image">

            ${ejercicio.imagen ? `

                <img
                    src="${ejercicio.imagen}"
                    alt="${ejercicio.nombre}">

            ` : ""}

        </div>

    </div>

    ${ultimo && ultimo.series.some(s => s.kg || s.reps) ? `

        <div class="last-session">

            <h4>📈 Última sesión</h4>

            ${ultimo.series.map(s => `

                <div class="last-series">

                    Serie ${s.serie}:

                    <strong>
                        ${s.kg || "-"} kg × ${s.reps || "-"}
                    </strong>

                </div>

            `).join("")}

        </div>

    ` : ""}

    <table class="series-table">

        <thead>

            <tr>

                <th>Serie</th>

                <th>Kg</th>

                <th>Reps</th>

                <th>✓</th>

            </tr>

        </thead>

        <tbody>

`;

        for(let serie=1; serie<=ejercicio.series; serie++){

            html+=`

            <tr>

                <td>${serie}</td>

                <td>

                    <input

                        type="number"

                        class="peso"

                        data-ejercicio="${ejercicio.id}"

                        data-serie="${serie}"

                        placeholder="kg">

                </td>

                <td>

                    <input

                        type="number"

                        class="reps"

                        data-ejercicio="${ejercicio.id}"

                        data-serie="${serie}"

                        placeholder="reps">

                </td>

                <td>

                    <button

                        class="serie-ok"

                        data-ejercicio="${ejercicio.id}"

                        data-serie="${serie}"

                        data-nombre="${ejercicio.nombre}"

                        data-descanso="${ejercicio.descanso}"

                        data-total="${ejercicio.series}">

                        ○

                    </button>

                </td>

            </tr>

            `;

        }

        html+=`

                </tbody>

            </table>

            <p style="margin-top:15px">

                💡 ${ejercicio.consejo}

            </p>

        </div>

        `;

    });

    html += `

        <div style="text-align:center; margin:40px 0;">

            <button
                id="finishTraining"
                class="start-btn">

                🏁 FINALIZAR ENTRENAMIENTO

            </button>

        </div>

    `;

    content.innerHTML = html;

    inicializarInputs();

    const botonFinalizar =
        document.getElementById("finishTraining");

    botonFinalizar.addEventListener(

        "click",

        finalizarEntrenamiento

    );

}
function finalizarEntrenamiento(){


    const datos = entrenamientoActual;


    if(!datos){

        mostrarMensaje(
            "⚠️ Error",
            "No se ha encontrado el entrenamiento actual."
        );

        return;

    }

    const ejerciciosRealizados = datos.ejercicios.map(ejercicio=>{


        let series = [];


        for(let i=1; i<=ejercicio.series; i++){

            const peso = document.querySelector(
                `.peso[data-ejercicio="${ejercicio.id}"][data-serie="${i}"]`
            );

            const reps = document.querySelector(
                `.reps[data-ejercicio="${ejercicio.id}"][data-serie="${i}"]`
            );


            series.push({

                serie:i,

                kg:peso ? peso.value : "",

                reps:reps ? reps.value : ""

            });

        }



 return {

    id: ejercicio.id,

    nombre: ejercicio.nombre,

    series: series

};


    });

    /* ==========================
   COMPROBAR SI HAY DATOS
========================== */

const hayDatos = ejerciciosRealizados.some(ejercicio =>

    ejercicio.series.some(serie =>

        serie.kg !== "" || serie.reps !== ""

    )

);

if(!hayDatos){

    mostrarMensaje(

        "⚠️ Sin datos",

        "Introduce al menos una serie antes de guardar el entrenamiento."

    );

    return;

}


mostrarConfirmacion(


    "🏆 Entrenamiento completado",

    "¿Deseas guardar esta sesión en el historial?\n\nPodrás consultar los pesos y repeticiones cuando quieras.",

    ()=>{

    const sesion = Training.crearSesion(datos.nombre);

sesion.ejercicios = ejerciciosRealizados;

const historial = Training.obtenerHistorial();

const existe = historial.some(item =>

    item.entrenamiento === sesion.entrenamiento &&
    formatearFecha(item.fecha) === formatearFecha(sesion.fecha)

);


if(existe){

    mostrarMensaje(

        "⚠️ Entrenamiento ya guardado",

        "Esta sesión ya existe en el historial."

    );

    return;

}
Training.guardarSesion(sesion);


  mostrarMensaje(

    "🎉 ¡Perfecto!",

    "El entrenamiento se ha guardado correctamente en el historial."

);

        const boton =
            document.getElementById("finishTraining");

        if(boton){

            boton.disabled = true;

            boton.textContent =
                "✅ ENTRENAMIENTO GUARDADO";

        }

    }

);
}
function verSesiones(){

    let sesiones = JSON.parse(localStorage.getItem("sesiones")) || [];

    console.log(sesiones);
}

function formatearFecha(fecha){

    const fechaObj = new Date(fecha);

    return fechaObj.toLocaleDateString("es-ES", {

        day:"2-digit",
        month:"2-digit",
        year:"numeric"

    });

}
function mostrarHistorial(){

    let sesiones = Training.obtenerHistorial();

    let html = `

    <div class="home-card">

        <h1>📈 Historial</h1>

        <p>Tus entrenamientos completados</p>

    </div>

    `;


    if(sesiones.length === 0){

        html += `

        <div class="exercise-card">

            <p>
            Todavía no hay entrenamientos guardados.
            </p>

        </div>

        `;

    } else {


        sesiones
        .slice()
        .reverse()
        .forEach((sesion,index)=>{


            html += `

            <div class="exercise-card">

                <h3>
                    💪 ${sesion.entrenamiento}
                </h3>

                <p>
                    📅 ${formatearFecha(sesion.fecha)}
                </p>


                <button
                    class="start-btn"
                    onclick="verDetalleSesion(${sesiones.length-1-index})">

                    Ver detalle

                </button>


            </div>

            `;


        });


    }


    content.innerHTML = html;
}
function mostrarAjustes(){

    let html = `

    <div class="home-card">

        <h1>⚙️ Ajustes</h1>

        <p>
            Configura MiRutinaGym
        </p>

    </div>


    <div class="settings-group">


        <div class="setting-card" id="ajusteRutina">

            <div class="setting-icon">
                🏋️
            </div>

            <div class="setting-info">

                <h3>
                    Rutina
                </h3>

                <p>
                    Modificar ejercicios y entrenamientos.
                </p>

            </div>

            <div class="setting-arrow">
                >
            </div>

        </div>


        <div class="setting-card" id="ajustePlanSemanal">

            <div class="setting-icon">
                📅
            </div>

            <div class="setting-info">

                <h3>
                    Plan semanal
                </h3>

                <p>
                    Configura qué rutina realizar cada día.
                </p>

            </div>

            <div class="setting-arrow">
                >
            </div>

        </div>


        <div class="setting-card" id="ajusteImagenes">

            <div class="setting-icon">
                🖼️
            </div>

            <div class="setting-info">

                <h3>
                    Imágenes
                </h3>

                <p>
                    Mostrar ilustraciones de ejercicios.
                </p>

            </div>


            <label class="switch">

                <input type="checkbox" checked>

                <span></span>

            </label>


        </div>



        <div class="setting-card" id="ajusteExportar">

            <div class="setting-icon">
                💾
            </div>


            <div class="setting-info">

                <h3>
                    Copia de seguridad
                </h3>

                <p>
                    Guardar una copia de tus datos.
                </p>

            </div>


            <div class="setting-arrow">
                >
            </div>


        </div>




        <div class="setting-card" id="ajusteImportar">

            <div class="setting-icon">
                ♻️
            </div>


            <div class="setting-info">

                <h3>
                    Restaurar copia
                </h3>

                <p>
                    Recuperar tus datos guardados.
                </p>

            </div>


            <div class="setting-arrow">
                >
            </div>


        </div>




        <div class="setting-card" id="ajusteBorrar">

            <div class="setting-icon">
                🗑️
            </div>


            <div class="setting-info">

                <h3>
                    Borrar historial
                </h3>

                <p>
                    Eliminar entrenamientos guardados.
                </p>

            </div>


            <div class="setting-arrow">
                >
            </div>


        </div>



    </div>



    <div class="home-card app-info">

        <h3>
            ℹ️ MiRutinaGym
        </h3>

        <p>
            Tu entrenador personal.
        </p>

    </div>

    `;


    content.innerHTML = html;

    conectarBotonesAjustes();

}

function mostrarPlanSemanal(){

    const dias = [

        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes",
        "sabado",
        "domingo"

    ];

    let html = `

    <div class="home-card">

        <h1>📅 Plan semanal</h1>

        <p>

            Configura qué entrenamiento realizarás cada día.

        </p>

    </div>

    <div class="settings-group">

    `;

    dias.forEach(dia=>{

        const idRutina = planSemanal[dia];

        html += `

        <div class="setting-card">

            <div class="setting-info">

                <h3>${nombresDias[dia]}</h3>

                <select
                    class="plan-select"
                    data-dia="${dia}">

                    <option
                        value=""
                        ${idRutina==null ? "selected" : ""}>

                        😴 Descanso

                    </option>

                    <option
                        value="torsoA"
                        ${idRutina==="torsoA" ? "selected" : ""}>

                        💪 Torso A

                    </option>

                    <option
                        value="piernaCore"
                        ${idRutina==="piernaCore" ? "selected" : ""}>

                        🦵 Pierna + Core

                    </option>

                    <option
                        value="torsoB"
                        ${idRutina==="torsoB" ? "selected" : ""}>

                        🏋️ Torso B

                    </option>

                </select>

            </div>

        </div>

        `;

    });

    html += `

    </div>

    <button
        id="guardarPlan"
        class="start-btn">

        💾 Guardar cambios

    </button>

    <button
        id="volverAjustes"
        class="back-button">

        Volver

    </button>

    `;

    content.innerHTML = html;

    document
        .getElementById("guardarPlan")
        .addEventListener(
            "click",
            guardarPlanSemanal
        );

    document
        .getElementById("volverAjustes")
        .addEventListener(
            "click",
            mostrarAjustes
        );

}
function guardarPlanSemanal(){

    const selects =
        document.querySelectorAll(".plan-select");

    selects.forEach(select=>{

        planSemanal[select.dataset.dia] =
            select.value || null;

    });

    Storage.guardarPlanSemanal(

        planSemanal

    );

    mostrarMensaje(

        "✅ Plan semanal",

        "Los cambios se han guardado correctamente."

    );

}
function mostrarGestionRutina(){

    let html = `

    <div class="home-card">

        <h1>🏋️ Gestión de rutina</h1>

        <p>
            Consulta y modifica tus entrenamientos.
        </p>

    </div>

    <div class="setting-card volver-ajustes" id="volverAjustes">

        <div class="setting-icon">
            ←
        </div>

        <div class="setting-info">

            <h3>
                Volver
            </h3>

            <p>
                Regresar a ajustes.
            </p>

        </div>

    </div>

    `;


    Object.keys(planSemanal).forEach(dia=>{


    const idRutina = planSemanal[dia];



if(!idRutina){

    return;

}

const entrenamiento = rutinas[idRutina];


   const ejercicios = entrenamiento.ejercicios
.map(ejercicio=>{

    return obtenerEjercicio(
        dia,
        ejercicio.id
    );

})
.filter(ejercicio => ejercicio !== null);



        html += `

        <div class="routine-day-card">


            <div class="routine-day-title">

                📅 ${dia.charAt(0).toUpperCase() + dia.slice(1)}

            </div>


            <h2>

                🏋️ ${entrenamiento.nombre}

            </h2>


            <p>

                ${entrenamiento.subtitulo}

            </p>

        `;

console.log("GESTION RUTINA - DIA:", dia);
console.log("EJERCICIOS:", ejercicios);

     ejercicios.forEach(ejercicio=>{


    if(!ejercicio){

        console.warn("⚠️ Ejercicio vacío eliminado en", dia);

        return;

    }


    html += `


<div
    class="exercise-setting-card"
    data-dia="${dia}"
    data-id="${ejercicio.id}">


    <div class="exercise-setting-info">


        <h3>

            💪 ${ejercicio.nombre}

        </h3>


        <p>

            ${ejercicio.musculo}
            ·
            ${ejercicio.series} series
            ·
            ${ejercicio.repeticiones}

        </p>


    </div>



    <div style="display:flex;align-items:center;gap:8px;">


        <button
            class="move-up"
            data-dia="${dia}"
            data-id="${ejercicio.id}"
            title="Subir ejercicio">

            ⬆️

        </button>



        <button
            class="move-down"
            data-dia="${dia}"
            data-id="${ejercicio.id}"
            title="Bajar ejercicio">

            ⬇️

        </button>



        <button
            class="delete-exercise"
            data-dia="${dia}"
            data-id="${ejercicio.id}"
            title="Eliminar ejercicio">

            🗑️

        </button>



        <div class="setting-arrow">

            >

        </div>


    </div>


</div>


            `;


        });



        html += `


<div
    class="exercise-setting-card add-exercise-card"
    data-dia="${dia}">


    <div class="exercise-setting-info">


        <h3>

            ➕ Añadir ejercicio

        </h3>


        <p>

            Añadir un ejercicio a esta rutina.

        </p>


    </div>


    <div class="setting-arrow">

        +

    </div>


</div>


`;



        html += `

        </div>

        `;


    });



    content.innerHTML = html;



    // Abrir detalle ejercicio

    document
    .querySelectorAll(".exercise-setting-card:not(.add-exercise-card)")
    .forEach(card=>{


        card.addEventListener("click",e=>{


            if(
                e.target.classList.contains("delete-exercise") ||
                e.target.classList.contains("move-up") ||
                e.target.classList.contains("move-down")
            ){

                return;

            }



            mostrarDetalleEjercicio(

                card.dataset.dia,

                card.dataset.id

            );


        });


    });





    // Subir ejercicio

    document
    .querySelectorAll(".move-up")
    .forEach(boton=>{


        boton.addEventListener("click",e=>{


            e.stopPropagation();



            moverEjercicioArriba(

                boton.dataset.dia,

                boton.dataset.id

            );


        });


    });






    // Bajar ejercicio

    document
    .querySelectorAll(".move-down")
    .forEach(boton=>{


        boton.addEventListener("click",e=>{


            e.stopPropagation();



            moverEjercicioAbajo(

                boton.dataset.dia,

                boton.dataset.id

            );


        });


    });






    // Eliminar ejercicio

    document
    .querySelectorAll(".delete-exercise")
    .forEach(boton=>{


        boton.addEventListener("click",e=>{


            e.stopPropagation();



            const dia = boton.dataset.dia;

            const id = boton.dataset.id;



            const ejercicio = obtenerEjercicio(

                dia,

                id

            );



            mostrarConfirmacion(


                "🗑️ Eliminar ejercicio",


                `¿Deseas eliminar "${ejercicio.nombre}" de esta rutina?`,


                ()=>{


                    const eliminado = eliminarEjercicioDeRutina(

                        dia,

                        id

                    );



                    if(!eliminado){


                        mostrarMensaje(

                            "⚠️ No permitido",

                            "Una rutina debe contener al menos un ejercicio."

                        );


                        return;

                    }



                    mostrarGestionRutina();


                },


                "Eliminar"


            );


        });


    });






    // Añadir ejercicio

    document
    .querySelectorAll(".add-exercise-card")
    .forEach(card=>{


        card.addEventListener("click",()=>{


            mostrarAñadirEjercicio(

                card.dataset.dia

            );


        });


    });






    // Volver ajustes

    document
    .getElementById("volverAjustes")
    .addEventListener("click",()=>{


        mostrarAjustes();


    });


}
function moverEjercicioArriba(dia,id){

    const entrenamiento = obtenerRutinaDelDia(dia);

    if(!entrenamiento){
        return;
    }

    const ejercicios = entrenamiento.ejercicios;


    const indice = ejercicios.findIndex(
        ejercicio=>ejercicio.id===id
    );


    if(indice<=0){
        return;
    }


    [
    ejercicios[indice-1],
    ejercicios[indice]
] =
[
    ejercicios[indice],
    ejercicios[indice-1]
];


guardarRutina();


mostrarGestionRutina();

}




function moverEjercicioAbajo(dia,id){

    const entrenamiento = obtenerRutinaDelDia(dia);

    if(!entrenamiento){
        return;
    }

    const ejercicios = entrenamiento.ejercicios;


    const indice = ejercicios.findIndex(
        ejercicio=>ejercicio.id===id
    );


    if(indice===-1 || indice>=ejercicios.length-1){

        return;

    }


    [
    ejercicios[indice],
    ejercicios[indice+1]
] =
[
    ejercicios[indice+1],
    ejercicios[indice]
];


guardarRutina();


mostrarGestionRutina();

}
function mostrarAñadirEjercicio(dia){

    const ejercicios = obtenerTodosLosEjercicios();

   const entrenamiento = obtenerRutinaDelDia(dia);

const ejerciciosActuales = entrenamiento
    ? entrenamiento.ejercicios
    : [];

    let html = `

    <div class="home-card">

        <h1>➕ Añadir ejercicio</h1>

        <p>

            Selecciona un ejercicio para añadir a
           <strong>${entrenamiento ? entrenamiento.nombre : dia}</strong>

        </p>

    </div>


    <div
        class="exercise-setting-card crear-ejercicio-card">

        <div class="exercise-setting-info">

            <h3>

                🆕 Crear ejercicio nuevo

            </h3>

            <p>

                Añade un ejercicio personalizado.

            </p>

        </div>

        <div class="setting-arrow">

            +

        </div>

    </div>

    `;


    ejercicios.forEach(ejercicio=>{

        const yaExiste = ejerciciosActuales.some(

            e=>e.id===ejercicio.id

        );


        if(yaExiste){

            return;

        }


        html += `

        <div
            class="exercise-setting-card ejercicio-disponible"
            data-dia="${dia}"
            data-id="${ejercicio.id}">

            <div class="exercise-setting-info">

                <h3>

                    💪 ${ejercicio.nombre}

                </h3>

                <p>

                    ${ejercicio.musculo}

                    ·

                    ${ejercicio.series} series

                    ·

                    ${ejercicio.repeticiones}

                </p>

            </div>

            <div class="setting-arrow">

                +

            </div>

        </div>

        `;


    });


    html += `

    <button
        class="back-button"
        id="volverGestion">

        ← Volver

    </button>

    `;


    content.innerHTML = html;



    // Crear ejercicio nuevo

    document
    .querySelector(".crear-ejercicio-card")
    .addEventListener("click",()=>{

        mostrarCrearEjercicio(dia);

    });



    // Volver

    document
    .getElementById("volverGestion")
    .addEventListener("click",()=>{

        mostrarGestionRutina();

    });



    // Añadir ejercicio existente

    document
    .querySelectorAll(".ejercicio-disponible")
    .forEach(card=>{


        card.addEventListener("click",()=>{


            mostrarConfirmacion(

                "➕ Añadir ejercicio",

                "¿Deseas añadir este ejercicio a la rutina?",


                ()=>{


                    añadirEjercicioARutina(

                        dia,

                        card.dataset.id

                    );


                    mostrarGestionRutina();


                },


                "Añadir"

            );


        });


    });


}
function mostrarCrearEjercicio(dia){

    let html = `

    <div class="home-card">

        <h1>🆕 Crear ejercicio</h1>

        <p>

            Nuevo ejercicio para
            <strong>${obtenerRutinaDelDia(dia)?.nombre || dia}</strong>

        </p>

    </div>


    <div class="setting-card">

        <div class="setting-info">

            <h3>Nombre</h3>

            <input id="nuevoNombre" type="text">

        </div>

    </div>



    <div class="setting-card">

        <div class="setting-info">

            <h3>Músculo</h3>

            <input id="nuevoMusculo" type="text">

        </div>

    </div>



    <div class="setting-card">

        <div class="setting-info">

            <h3>Series</h3>

            <input id="nuevasSeries" type="number" value="3">

        </div>

    </div>



    <div class="setting-card">

        <div class="setting-info">

            <h3>Repeticiones</h3>

            <input id="nuevasReps" type="text" value="10">

        </div>

    </div>



    <div class="setting-card">

        <div class="setting-info">

            <h3>Descanso</h3>

            <input id="nuevoDescanso" type="number" value="90">

        </div>

    </div>



    <div class="setting-card">

        <div class="setting-info">

            <h3>RIR</h3>

            <input id="nuevoRir" type="text" value="1-2">

        </div>

    </div>



    <div class="setting-card">

        <div class="setting-info">

            <h3>Consejo</h3>

            <textarea id="nuevoConsejo"></textarea>

        </div>

    </div>



    <button class="edit-button" id="guardarNuevoEjercicio">

        💾 Guardar ejercicio

    </button>



    <button class="back-button" id="volverAñadir">

        ← Volver

    </button>

    `;


    content.innerHTML = html;



    document
    .getElementById("volverAñadir")
    .addEventListener("click",()=>{

        mostrarAñadirEjercicio(dia);

    });



  document
.getElementById("guardarNuevoEjercicio")
.addEventListener("click",()=>{
    const nombre = document
        .getElementById("nuevoNombre")
        .value
        .trim();


    const musculo = document
        .getElementById("nuevoMusculo")
        .value
        .trim();


    const ejercicio = {

        id: nombre
            .toLowerCase()
            .replaceAll(" ","_"),

        nombre: nombre,

        imagen: "",

        musculo: musculo,

        series: Number(
            document
            .getElementById("nuevasSeries")
            .value
        ),

        repeticiones:
            document
            .getElementById("nuevasReps")
            .value,


        descanso: Number(
            document
            .getElementById("nuevoDescanso")
            .value
        ),


        rir:
            document
            .getElementById("nuevoRir")
            .value,


        consejo:
            document
            .getElementById("nuevoConsejo")
            .value

    };


   ejerciciosPersonalizados.push(ejercicio);


guardarEjerciciosPersonalizados();


actualizarBibliotecaEjercicios();


console.log("🆕 Ejercicio guardado:");

console.log(ejercicio);



mostrarAñadirEjercicio(dia);

});

}
function mostrarDetalleEjercicio(dia,id){

    const ejercicio = obtenerEjercicio(dia,id);

    if(!ejercicio){

        return;

    }

    let html = `

<div class="home-card">

    <h1>💪 ${ejercicio.nombre}</h1>

    <p>${ejercicio.musculo}</p>

</div>


<div class="exercise-detail-image">

    <img src="${ejercicio.imagen}" alt="${ejercicio.nombre}">

</div>


<div class="detail-grid">

    <div class="detail-card">

        <div class="detail-icon">📊</div>

        <div class="detail-label">Series</div>

        <div class="detail-value">${ejercicio.series}</div>

    </div>


    <div class="detail-card">

        <div class="detail-icon">🔁</div>

        <div class="detail-label">Repeticiones</div>

        <div class="detail-value">${ejercicio.repeticiones}</div>

    </div>


    <div class="detail-card">

        <div class="detail-icon">⏱</div>

        <div class="detail-label">Descanso</div>

        <div class="detail-value">${ejercicio.descanso}s</div>

    </div>


    <div class="detail-card">

        <div class="detail-icon">🎯</div>

        <div class="detail-label">RIR</div>

        <div class="detail-value">${ejercicio.rir}</div>

    </div>

</div>


<div class="tip-card">

    <h3>💡 Consejo</h3>

    <p>${ejercicio.consejo}</p>

</div>


<button class="edit-button" id="editarEjercicio">

    ✏️ Editar ejercicio

</button>


<button class="back-button" id="volverGestion">

    ← Volver

</button>

`;
content.innerHTML = html;

// Botón Editar
document
.getElementById("editarEjercicio")
.addEventListener("click",()=>{

    mostrarEditorEjercicio(dia,id);

});

// Botón Volver
document
.getElementById("volverGestion")
.addEventListener("click",()=>{

    mostrarGestionRutina();

});

}
function verDetalleSesion(indice){


    let sesiones = Training.obtenerHistorial();


    const sesion = sesiones[indice];


    if(!sesion){

        return;

    }


    let html = `

    <div class="home-card">

        <h1>💪 ${sesion.entrenamiento}</h1>

        <p>
        📅 ${formatearFecha(sesion.fecha)}
        </p>

    </div>

    `;



    if(sesion.ejercicios){


        sesion.ejercicios.forEach(ejercicio=>{


            html += `

            <div class="exercise-card">

                <h3>
                ${ejercicio.nombre}
                </h3>

            `;


            html += `

<table class="series-table">

    <thead>

        <tr>

            <th>Serie</th>

            <th>Kg</th>

            <th>Reps</th>

        </tr>

    </thead>

    <tbody>

`;



ejercicio.series.forEach(serie=>{


    html += `

    <tr>

        <td>
        ${serie.serie}
        </td>

        <td>
        ${serie.kg || "-"}
        </td>

        <td>
        ${serie.reps || "-"}
        </td>

    </tr>

    `;


});


html += `

    </tbody>

</table>

`;

            html += `

            </div>

            `;


        });


    } else {


        html += `

        <div class="exercise-card">

            <p>
            Esta sesión pertenece a un entrenamiento antiguo
            y no tiene detalle guardado.
            </p>

        </div>

        `;


    }



    html += `

    <div style="text-align:center;margin:40px 0;">

        <button
        class="start-btn"
        onclick="mostrarHistorial()">

        ⬅ Volver al historial

        </button>

    </div>

    `;



    content.innerHTML = html;


}
/* ==========================
   STORAGE
========================== */

function claveSerie(ejercicioId, serie){

    return ejercicioId + "_serie_" + serie;

}

function guardarSerie(ejercicioId, serie){

    const peso=document.querySelector(
        '.peso[data-ejercicio="'+ejercicioId+'"][data-serie="'+serie+'"]'
    );

    const reps=document.querySelector(
        '.reps[data-ejercicio="'+ejercicioId+'"][data-serie="'+serie+'"]'
    );

    if(!peso || !reps) return;


    Storage.guardar(

        claveSerie(ejercicioId,serie),

        {
            peso:peso.value,
            reps:reps.value
        }

    );


    actualizarProgreso();

    comprobarSeries();

}
function guardarSerieCompletada(ejercicioId, serie){

    const datos = Storage.leer(
        claveSerie(ejercicioId,serie)
    ) || {};


    datos.completada = true;


    Storage.guardar(

        claveSerie(ejercicioId,serie),

        datos

    );

}
/* ==========================
   COMPROBAR SERIES
========================== */

function comprobarSeries(){

    const botones = document.querySelectorAll(".serie-ok");


    botones.forEach(boton=>{


        const ejercicio = boton.dataset.ejercicio;
        const serie = boton.dataset.serie;


        const datos = Storage.leer(
            claveSerie(ejercicio,serie)
        );


        if(datos && datos.completada){


            boton.classList.add("completada");

            boton.textContent="✓";

            boton.disabled=true;


            const fila = boton.closest("tr");

            if(fila){

                fila.classList.add("serie-completada");

            }


            const peso=fila.querySelector(".peso");
            const reps=fila.querySelector(".reps");


            if(peso) peso.disabled=true;
            if(reps) reps.disabled=true;


        }


    });


}
function cargarSerie(ejercicioId,serie){

    const datos=Storage.leer(

        claveSerie(ejercicioId,serie)

    );

    if(!datos) return;

    const peso=document.querySelector(

        '.peso[data-ejercicio="'+ejercicioId+'"][data-serie="'+serie+'"]'

    );

    const reps=document.querySelector(

        '.reps[data-ejercicio="'+ejercicioId+'"][data-serie="'+serie+'"]'

    );

    if(peso) peso.value=datos.peso ?? "";

    if(reps) reps.value=datos.reps ?? "";

}

/* ==========================
   INICIALIZAR INPUTS
========================== */

function inicializarInputs(){

    const pesos=document.querySelectorAll(".peso");

    pesos.forEach(input=>{

        cargarSerie(

            input.dataset.ejercicio,

            input.dataset.serie

        );

        input.addEventListener("input",()=>{

            guardarSerie(

                input.dataset.ejercicio,

                input.dataset.serie

            );

        });

    });

    const reps=document.querySelectorAll(".reps");

    reps.forEach(input=>{

        cargarSerie(

            input.dataset.ejercicio,

            input.dataset.serie

        );

        input.addEventListener("input",()=>{

            guardarSerie(

                input.dataset.ejercicio,

                input.dataset.serie

            );

        });

    });

    actualizarProgreso();
    /* ==========================
   BOTONES COMPLETAR SERIE
========================== */

const botonesSerie = document.querySelectorAll(".serie-ok");

botonesSerie.forEach(boton=>{

    boton.addEventListener("click",()=>{

        const ejercicio = boton.dataset.ejercicio;
        const serie = boton.dataset.serie;

        const peso = document.querySelector(
            `.peso[data-ejercicio="${ejercicio}"][data-serie="${serie}"]`
        );

        const reps = document.querySelector(
            `.reps[data-ejercicio="${ejercicio}"][data-serie="${serie}"]`
        );

        if(
            peso.value.trim()==="" ||
            reps.value.trim()===""
        ){

            mostrarMensaje(

                "⚠️ Serie incompleta",

                "Introduce el peso y las repeticiones antes de completar la serie."

            );

            return;

        }
/* ==========================
   MARCAR SERIE COMPLETADA
========================== */

boton.classList.add("completada");


guardarSerieCompletada(
    ejercicio,
    serie
);


actualizarProgreso();

boton.closest("tr").classList.add("serie-completada");

boton.textContent = "✓";

boton.disabled = true;

peso.disabled = true;

reps.disabled = true;

iniciarDescanso(

    Number(boton.dataset.descanso),

    boton.dataset.nombre,

    Number(serie),

    Number(boton.dataset.total)

);

    });

});

comprobarSeries();

}

/* ==========================
   PROGRESO
========================== */

function actualizarProgreso(){

    const totalSeries = document.querySelectorAll(".serie-ok").length;

    const seriesCompletadas = document.querySelectorAll(".serie-ok.completada").length;

    const porcentaje = totalSeries === 0
        ? 0
        : Math.round((seriesCompletadas / totalSeries) * 100);

    const barra = document.getElementById("progressBar");
    const texto = document.getElementById("progressText");

    if(barra){

        barra.style.width = porcentaje + "%";

    }

    if(texto){

        texto.textContent =
            `${seriesCompletadas} / ${totalSeries} series · ${porcentaje}%`;

    }

}
/* ==========================
   BOTONES INFERIORES
========================== */

const homeBtn = document.getElementById("homeBtn");
const historyBtn = document.getElementById("historyBtn");
const settingsBtn = document.getElementById("settingsBtn");

if(homeBtn){

    homeBtn.addEventListener(

        "click",

        mostrarInicio

    );

}

if(historyBtn){

    historyBtn.addEventListener(

        "click",

        mostrarHistorial

    );

}

if(settingsBtn){

    settingsBtn.addEventListener(

        "click",

        mostrarAjustes

    );

}

function conectarBotonesAjustes(){

    const rutina = document.getElementById("ajusteRutina");
    const plan = document.getElementById("ajustePlanSemanal");

if(plan){

    plan.addEventListener(

        "click",

        mostrarPlanSemanal

    );

}

    if(rutina){

        rutina.addEventListener("click",()=>{

          mostrarGestionRutina();

        });

    }



    const descanso = document.getElementById("ajusteDescanso");

    if(descanso){

        descanso.addEventListener("click",()=>{

            alert("Abrir configuración de descanso");

        });

    }



    const exportar = document.getElementById("ajusteExportar");

if(exportar){

    exportar.addEventListener("click",()=>{


        const datos = Storage.exportar();


        const blob = new Blob(
            [datos],
            {
                type:"application/json"
            }
        );


        const url = URL.createObjectURL(blob);


        const enlace = document.createElement("a");


        enlace.href = url;


        enlace.download =
            "MiRutinaGym_backup.json";


        document.body.appendChild(enlace);


   enlace.click();


document.body.removeChild(enlace);


URL.revokeObjectURL(url);


mostrarMensaje(

    "💾 Copia creada",

    "La copia de seguridad se ha guardado correctamente."

);


    });

}



const importar = document.getElementById("ajusteImportar");

if(importar){

    importar.addEventListener("click",()=>{


        const input = document.createElement("input");

        input.type = "file";

        input.accept = ".json";


        input.addEventListener("change",(evento)=>{


            const archivo = evento.target.files[0];


            if(!archivo){

                return;

            }


            const lector = new FileReader();


            lector.onload = ()=>{


mostrarConfirmacion(

    "♻️ Restaurar copia",

    "Se sustituirán tus datos actuales por la copia de seguridad. ¿Deseas continuar?",

    ()=>{


        const resultado =
            Storage.importar(
                lector.result
            );


        if(resultado){


            mostrarMensaje(

                "✅ Restauración completada",

                "Tus datos se han recuperado correctamente.",

                ()=>{

                    location.reload();

                }

            );


        }

        else{


            mostrarMensaje(

                "⚠️ Error",

                "El archivo seleccionado no es una copia válida de MiRutinaGym."

            );


        }


    },

    "♻️ Restaurar"

);


            };


            lector.readAsText(archivo);


        });


        input.click();


    });

}    const borrar = document.getElementById("ajusteBorrar");

    if(borrar){

        borrar.addEventListener("click",()=>{

            alert("Borrar historial");

        });

    }
    }
function obtenerEjercicio(dia,id){

    const entrenamiento = obtenerRutinaDelDia(dia);

    if(!entrenamiento){

        return null;

    }

    return entrenamiento.ejercicios.find(

        ejercicio => ejercicio.id === id

    ) || null;

}
function mostrarEditorEjercicio(dia,id){

    const ejercicio = obtenerEjercicio(dia,id);

    if(!ejercicio){

        return;

    }

 let html = `

<div class="home-card">

    <h1>✏️ Editar ejercicio</h1>

    <p>${ejercicio.nombre}</p>

</div>

<div class="editor-image">

    <img src="${ejercicio.imagen}" alt="${ejercicio.nombre}">

</div>

<div class="routine-day-card">

    <div class="editor-section">

        <label class="editor-label">

            Nombre

        </label>

        <input
            id="editNombre"
            class="editor-input"
            type="text"
            value="${ejercicio.nombre}">

        <label class="editor-label">

            Músculo

        </label>

        <input
            id="editMusculo"
            class="editor-input"
            type="text"
            value="${ejercicio.musculo}">

    </div>

    <div class="editor-grid">

        <div>

            <label class="editor-label">

                Series

            </label>

            <input
                id="editSeries"
                class="editor-input"
                type="number"
                value="${ejercicio.series}">

        </div>

        <div>

            <label class="editor-label">

                Repeticiones

            </label>

            <input
                id="editReps"
                class="editor-input"
                type="text"
                value="${ejercicio.repeticiones}">

        </div>

        <div>

            <label class="editor-label">

                Descanso

            </label>

            <input
                id="editDescanso"
                class="editor-input"
                type="number"
                value="${ejercicio.descanso}">

        </div>

        <div>

            <label class="editor-label">

                RIR

            </label>

            <input
                id="editRir"
                class="editor-input"
                type="text"
                value="${ejercicio.rir}">

        </div>

    </div>

    <label class="editor-label">

        Consejo

    </label>

    <textarea
        id="editConsejo"
        class="editor-textarea">${ejercicio.consejo}</textarea>

    <button
        class="editor-button editor-save"
        id="guardarEjercicio">

        💾 Guardar cambios

    </button>

    <button
        class="editor-button editor-cancel"
        id="cancelarEdicion">

        ← Cancelar

    </button>

   

</div>

`;
    content.innerHTML = html;

    document
    .getElementById("cancelarEdicion")
    .addEventListener("click",()=>{

        mostrarDetalleEjercicio(dia,id);

    });

  document
.getElementById("guardarEjercicio")
.addEventListener("click",()=>{

    ejercicio.nombre =
        document.getElementById("editNombre").value;

    ejercicio.musculo =
        document.getElementById("editMusculo").value;

    ejercicio.series = Number(
        document.getElementById("editSeries").value
    );

    ejercicio.repeticiones =
        document.getElementById("editReps").value;

    ejercicio.descanso = Number(
        document.getElementById("editDescanso").value
    );

    ejercicio.rir =
        document.getElementById("editRir").value;

    ejercicio.consejo =
        document.getElementById("editConsejo").value;


    guardarRutina();

    actualizarBibliotecaEjercicios();


    mostrarConfirmacion(

        "🏋️ MiRutinaGym",

        "Los cambios se han guardado correctamente.",

        ()=>{

            mostrarDetalleEjercicio(dia,id);

        }

    );

});

}
/* ==========================
   INICIO APP
========================== */

mostrarInicio();