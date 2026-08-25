"use strict";

/* ==========================
   PUSH NOTIFICATIONS
========================== */

async function activarPush() {

    try {

        if (!("Notification" in window)) {

            console.log(
                "❌ Este dispositivo no soporta notificaciones."
            );

            return;

        }

        if (!("serviceWorker" in navigator)) {

            console.log(
                "❌ Service Worker no disponible."
            );

            return;

        }

        const permiso =
            await Notification.requestPermission();

        console.log(
            "Permiso de notificaciones:",
            permiso
        );

        if (permiso !== "granted") {

            console.log(
                "⚠️ Permiso de notificaciones no concedido."
            );

            return;

        }

        const registro =
            await navigator.serviceWorker.ready;

        console.log(
            "✅ Service Worker preparado."
        );


        /* ==========================
           COMPROBAR SUSCRIPCIÓN EXISTENTE
        ========================== */

        let subscription =
            await registro.pushManager.getSubscription();


        /* ==========================
           CREAR SUSCRIPCIÓN SI NO EXISTE
        ========================== */

        if (!subscription) {

            const respuesta =
                await fetch(
                    "/.netlify/functions/push-public-key"
                );

            if (!respuesta.ok) {

                throw new Error(
                    "No se pudo obtener la clave pública VAPID."
                );

            }

            const datos =
                await respuesta.json();

            const publicKey =
                datos.publicKey;


            subscription =
                await registro.pushManager.subscribe({

                    userVisibleOnly: true,

                    applicationServerKey:
                        urlBase64ToUint8Array(
                            publicKey
                        )

                });

            console.log(
                "✅ Suscripción Push creada."
            );

        } else {

            console.log(
                "✅ Suscripción Push existente encontrada."
            );

        }


        console.log(
            "PushSubscription:",
            subscription
        );


        /* ==========================
           ENVIAR NOTIFICACIÓN DE PRUEBA
        ========================== */

        const resultado =
            await enviarNotificacionPush(
                subscription,
                "MiRutinaGym",
                "🏋️ ¡Notificación Push funcionando correctamente!"
            );


        console.log(
            "📨 Respuesta de Netlify:",
            resultado
        );


        console.log(
            "🎉 ¡Notificación Push enviada correctamente!"
        );


    } catch (error) {

        console.error(
            "❌ Error activando Push:",
            error
        );

    }

}


/* ==========================
   ENVIAR NOTIFICACIÓN PUSH
========================== */

async function enviarNotificacionPush(
    subscription,
    titulo,
    mensaje
) {

    if (!subscription) {

        throw new Error(
            "No existe una suscripción Push."
        );

    }


    const envio =
        await fetch(
            "/.netlify/functions/send-push",
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    subscription:
                        subscription,

                    titulo:
                        titulo,

                    mensaje:
                        mensaje

                })

            }
        );


    const resultado =
        await envio.json();


    if (!envio.ok) {

        throw new Error(
            resultado.error ||
            "Error enviando la notificación Push."
        );

    }


    return resultado;

}


/* ==========================
   OBTENER SUSCRIPCIÓN ACTUAL
========================== */

async function obtenerSuscripcionPush() {

    if (!("serviceWorker" in navigator)) {

        return null;

    }


    const registro =
        await navigator.serviceWorker.ready;


    return await registro.pushManager.getSubscription();

}


/* ==========================
   CONVERTIR CLAVE VAPID
========================== */

function urlBase64ToUint8Array(
    base64String
) {

    const padding =
        "=".repeat(
            (4 - base64String.length % 4) % 4
        );

    const base64 =
        (base64String + padding)
            .replace(/-/g, "+")
            .replace(/_/g, "/");

    const rawData =
        window.atob(base64);

    return Uint8Array.from(
        [...rawData].map(
            char => char.charCodeAt(0)
        )
    );

}