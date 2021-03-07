
// FIXME: WIP
const dialogs = {
    NPC1: {
        text: "hello world...",
        responses: {
            "ok": {
                text: "great, glad to have you on board",
                responses: {
                    "ok": {}
                },
            }
        }
    },
    NPC2: {
        text: "hello world...",
        respones: {
            "more": (d) => d.onBack(),
        }
    },

}