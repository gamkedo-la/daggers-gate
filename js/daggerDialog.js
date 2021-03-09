
// the collection of NPC dialogs, identified by NPC tag
const daggerDialogs = {
    NPC1: {
        dfltTitle: "Sir Bob",
        dialogs: {
            start: {
                text: "Greetings worthy adventurer!",
                responses: {
                    "Uh, hello...": (d) => d.load("next"),
                }
            },
            next: {
                text: "The time has come for you to prove your worth and slay the dragon.",
                responses: {
                    "No way!": (d) => d.done = true,
                    "OK": (d) => {
                        d.actor.gatherLoot({tag: "HEALING_POTION", amt: 1});
                        d.done = true;
                    }
                }
            }
        }
    },

}