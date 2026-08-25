const webpush = require("web-push");

exports.handler = async function (event) {

    try {

        const body = JSON.parse(event.body || "{}");

        const subscription = body.subscription;

        if (!subscription) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    ok: false,
                    error: "Falta la suscripción Push"
                })
            };
        }

        webpush.setVapidDetails(
            process.env.VAPID_SUBJECT,
            process.env.VAPID_PUBLIC_KEY,
            process.env.VAPID_PRIVATE_KEY
        );

        const payload = JSON.stringify({
            titulo: "MiRutinaGym",
            mensaje: "🏋️ ¡Push funcionando correctamente!"
        });

        await webpush.sendNotification(
            subscription,
            payload
        );

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ok: true,
                mensaje: "Notificación Push enviada correctamente"
            })
        };

    } catch (error) {

        console.error("Error enviando Push:", error);

        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ok: false,
                error: error.message
            })
        };
    }
};
