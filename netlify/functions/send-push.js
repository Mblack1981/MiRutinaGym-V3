const webpush = require("web-push");

exports.handler = async function (event) {

    try {

        const body =
            JSON.parse(event.body || "{}");


        /* ==========================
           DATOS RECIBIDOS
        ========================== */

        const subscription =
            body.subscription;

        const titulo =
            body.titulo ||
            "MiRutinaGym";

        const mensaje =
            body.mensaje ||
            "🏋️ ¡Tienes una nueva notificación!";


        /* ==========================
           COMPROBAR SUSCRIPCIÓN
        ========================== */

        if (!subscription) {

            return {

                statusCode: 400,

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    ok: false,

                    error:
                        "Falta la suscripción Push"

                })

            };

        }


        /* ==========================
           CONFIGURAR VAPID
        ========================== */

        webpush.setVapidDetails(

            process.env.VAPID_SUBJECT,

            process.env.VAPID_PUBLIC_KEY,

            process.env.VAPID_PRIVATE_KEY

        );


        /* ==========================
           CREAR PAYLOAD
        ========================== */

        const payload =
            JSON.stringify({

                titulo:
                    titulo,

                mensaje:
                    mensaje

            });


        /* ==========================
           ENVIAR PUSH
        ========================== */

        await webpush.sendNotification(

            subscription,

            payload

        );


        /* ==========================
           RESPUESTA OK
        ========================== */

        return {

            statusCode: 200,

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify({

                ok: true,

                mensaje:
                    "Notificación Push enviada correctamente"

            })

        };


    } catch (error) {

        console.error(
            "Error enviando Push:",
            error
        );


        return {

            statusCode: 500,

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify({

                ok: false,

                error:
                    error.message

            })

        };

    }

};