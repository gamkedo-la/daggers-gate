
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
    q2Start: {
        dfltTitle: "Mary",
        dialogs: {
            start: {
                text: "Hello young warrior.  I have a tale for you...",
                responses: {
                    "Hi": (d) => d.load("next"),
                }
            },
            next: {
                text: "Have you ever heard of the Frozen Witch and her magical wand?  There is a rumor that this wand was recovered by Dwarves after the second Crucible.  The Dwarves then hid away this weapon in their fortress to the North.  Are you brave enough to recover this wand?",
                responses: {
                    "No way!": (d) => d.done = true,
                    "OK": (d) => {
                        d.actor.gatherLoot({tag: "HEALING_POTION", amt: 1});
                        d.done = true;
                        Quests.instance.start("q2");
                    }
                }
            }
        }
    },
    q2Wait: {
        dfltTitle: "Mary",
        dialogs: {
            start: {
                text: "Come back when you are braver...",
                responses: {
                    "I'll be on my way.": (d) => d.done = true,
                }
            },
        }
    },

    q2Done: {
        dfltTitle: "Mary",
        dialogs: {
            start: {
                text: "I honestly didn't think you'd survive.  You are worthy of keeping the Ice Wand",
                responses: {
                    "OK": (d) => {
                        quests.finish("q2");
                        d.done = true;
                    }
                }
            },
        }
    },

    q1Complete: {
        dfltTitle: "Mary",
        dialogs: {
            start: {
                text: "I have no words for you.",
                responses: {
                    "No more death quests?": (d) => d.done = true,
                }
            },
        }
    },

    alchemist: {
        dfltTitle: "Alchemist",
        dialogs: {
            start: {
                text: "Are you in need of my potions?",
                responses: {
                    "Yes": (d) => { 
                        d.done = true; 
                        d.npc.pendingAction = () => ctrlSys.assign(new UxAlchemistShopCtrl(), true);
                    },
                    "No": (d) => d.done = true,
                }
            },
        }
    },

    fletcher: {
        dfltTitle: "Fletcher",
        dialogs: {
            start: {
                text: "Looking to make a pincushion out of your enemies?",
                responses: {
                    "Yes": (d) => { 
                        d.done = true; 
                        d.npc.pendingAction = () => ctrlSys.assign(new UxFletcherShopCtrl(), true);
                    },
                    "No": (d) => d.done = true,
                }
            },
        }
    },

    healer: {
        dfltTitle: "Healer",
        dialogs: {
            start: {
                text: "Do you seek healing and restoration?",
                responses: {
                    "Yes": (d) => { 
                        d.done = true; 
                        d.npc.pendingAction = () => ctrlSys.assign(new UxHealerCtrl(), true);
                    },
                    "No": (d) => d.done = true,
                }
            },
        }
    },

}