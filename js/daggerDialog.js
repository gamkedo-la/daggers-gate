
// the collection of NPC dialogs, identified by NPC tag
const daggerDialogs = {

    q1Start: {
        dfltTitle: "Sir Bob",
        dialogs: {
            start: {
                text: "Greetings worthy adventurer!",
                responses: {
                    "Uh, hello...": (d) => d.load("next"),
                }
            },
            next: {
                text: "The time has come for you to prove your worth and slay the dragon.  Wait, someone already slew the dragon?  Ah yes, a real hero... oh well what do we have for this guy?  Maybe some nice SLIMES!  What do you say kid?",
                responses: {
                    "No way!": (d) => d.done = true,
                    "OK": (d) => {
                        d.actor.gatherLoot({tag: "HEALING_POTION", amt: 1});
                        d.done = true;
                        Quests.instance.start("q1");
                    }
                }
            }
        }
    },

    q1Wait: {
        dfltTitle: "Sir Bob",
        dialogs: {
            start: {
                text: "Come back when you are worthy...",
                responses: {
                    "Whatever old man.": (d) => d.done = true,
                }
            },
        }
    },

    q1Done: {
        dfltTitle: "Sir Bob",
        dialogs: {
            start: {
                text: "So you think you're a hero now?  Well, you got a way's to go son.  Surprised you actually made it.  Here take this, it will help you on your journey.",
                responses: {
                    "OK": (d) => {
                        quests.finish("q1");
                        d.done = true;
                    }
                }
            },
        }
    },

    q1Complete: {
        dfltTitle: "Sir Bob",
        dialogs: {
            start: {
                text: "I got nothing else for you... stop pestering an old man.  I got better things to do with my time.",
                responses: {
                    "Cranky much?": (d) => d.done = true,
                }
            },
        }
    },

}