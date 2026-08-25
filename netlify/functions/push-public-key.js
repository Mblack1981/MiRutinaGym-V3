exports.handler = async function () {

    const publicKey = process.env.VAPID_PUBLIC_KEY;

    if (!publicKey) {

        return {

            statusCode: 500,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                error: "VAPID_PUBLIC_KEY no configurada"
            })

        };

    }

    return {

        statusCode: 200,

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            publicKey: publicKey
        })

    };

};