
// the collection of NPC dialogs, identified by NPC tag
const daggerDialogs = {

    clariceStart: {
        dfltTitle: "Clarice",
        dialogs: {
            start: {
                text: "Good morning Apollo, you look terrible!",
                responses: {
                    "Good morning I guess...": (d) => d.load("next"),
                }
            },
            next: {
                text: "Is something troubling you child?",
                responses: {
                    "Maybe later...": (d) => d.done = true,
                    "<Tell Her of your Dreams>": (d) => d.load("story1"),
                }
            },
            story1: {
                text: "Then it is as I have feared.  Sit child, for we must talk a while...",
                responses: {
                    "OK": (d) => d.load("story2"),
                },
            },
            story2: {
                text: "I have felt the darkness awaken and have long pondered it's meaning.  " + 
                      "There was a time of magic, too long ago for even I to remember.  While I had hoped that these feelings " +
                      "of darkness may be just a signal of magic returning, I fear there's more to it than that.  Your dream child...",
                responses: {
                    "My dream?": (d) => d.load("story3"),
                },
            },
            story3: {
                text: "Your dream is a premonition of what is to come if the darkness is left unchecked.  " + 
                      "And I fear that the danger you saw is all too real.  And while am deeply troubled by this premonition, I am also a bit relieved.",
                responses: {
                    "What?": (d) => d.load("story4"),
                },
            },
            story4: {
                text: "Our town's history has always been intertwined with magic.  The nature of magic is of ebb and flow.  " + 
                      "For generations now, magic and our town's connection to it has receded, leaving me to wonder if it would leave this world once and for all...",
                responses: {
                    "That's good?": (d) => d.load("story5"),
                },
            },
            story5: {
                text: "Magic itself is neither good nor evil, that lies within those that wield it.  " +
                      "Magic simply amplifies either the good or evil that is already there.  " + 
                      "As I said, our town has had a history of magic and of those who wield it.  " + 
                      "Families that have been touched by magic and could be called upon in times of need to face those who would seek to use magic for evil.",
                responses: {
                    "Ok": (d) => d.load("story6"),
                },
            },
            story6: {
                text: "My family is one of those families, and I have long known that I have been touched by magic.  " +
                      "As I have said, I have felt the magic grow again in the world and have feared that with it, a darkness is growing as well.  " +
                      "A darkness I feared I alone would not be able to hold back.  I am relieved because you have revealed to me today, that I am not alone.  " +
                      "I have you!",
                responses: {
                    "Me!?!": (d) => d.load("story7"),
                },
            },
            story7: {
                text: "Yes my child, you.  Your family, your great, great grandparents, actually, were responsible for holding back the evil that threatened " +
                      "this town near a century ago.  Unfortunately, no one in your family since that time has felt the touch of magic.  I fear your family " +
                      "has seen this as a source of shame.  Perhaps why they never discussed your history with you.",
                responses: {
                    "...": (d) => d.load("story8"),
                },
            },
            story8: {
                text: "Silly really, as magic has always been fickle, and has faded from all of the other family lines over time.  Until now at least. " +
                      "For your dream is surely a sign that the rising magic has woken something in you.  And I am relieved.  You will have the strength that I do " +
                      "not possess to face this evil.",
                responses: {
                    "My Strength?": (d) => d.load("story9"),
                },
            },
            story9: {
                text: "Yes, my child.  Your youth, your strength, your heart.  That is a start, but I fear not enough...",
                responses: {
                    "What?": (d) => d.load("story10"),
                },
            },
            story10: {
                text: "When facing the evils of our past, our ancestors had imbued artifacts with powerful magic.  For when darkness comes, it is borne in creatures that " +
                      "are unphased by normal weapons.  As magic has waned, many of these artifacts have been lost over time, thought as now useless.  There still exists one " +
                      "within our reach and knowledge.  And it was one that belonged to your great, great grandmother Valore, kept hidden away here in our village for safekeeping.",
                responses: {
                    "Here!  Where?": (d) => d.load("story11"),
                },
            },
            story11: {
                text: "In the Temple of the Elements, of course!",
                responses: {
                    "Huh, Where?": (d) => d.load("story12"),
                },
            },
            story12: {
                text: "Ah yes, the temple has been sealed for some time now.  It isn't exactly a place you want folks wandering around in, as it is quite dangerous.  " + 
                      "I imagine even more so now that magic has awoken once again.  Our present church has been built on top of the temple, you will find the entrance " +
                      "in the church cellar.",
                responses: {
                    "Ok": (d) => d.load("story13"),
                },
            },
            story13: {
                text: "We have chatted long enough.  Now you must act.  Seek the artifact from the temple.  Here, you will need this.  (You received the Key of the Elements)  " +
                      "This will grant you access past the temple seal, but you still must face the challenges of the temple itself.",
                responses: {
                    "Challenges?": (d) => d.load("story14"),
                },
            },
            story14: {
                text: "Yes, the temple ensures only the worthy may enter and has elemental safeguards in place.  You'll want to avoid those.  The temple also has a set of internal " +
                      "elemental seals you will need to unlock.  Find each elemental rune stone and place on the corresponding altar to unlock each seal.  Then proceed to the great " +
                      "altar room to claim the artifact.  " +
                      "Return to me when you have completed this task and we can plan our next steps against the rising darkness.",
                responses: {
                    "Ok": (d) => {
                        d.actor.gatherLoot({tag: "ELEMENTAL_KEY", amt: 1});
                        d.done = true;
                        quests.finish("m1");
                        quests.start("m2");
                    },
                },
            },


        },
    },
    clariceWait: {
        dfltTitle: "Clarice",
        dialogs: {
            start: {
                text: "You must hurry child.  I feel the darkness approaching...",
                responses: {
                    "Ok": (d) => d.done = true,
                }
            },
        },
    },
    clariceDone: {
        dfltTitle: "Clarice",
        dialogs: {
            start: {
                text: "There you are!  I was beginning to worry, but I see you were successful in your task!  That is a very fine sword, last wielded by Valore to quell the " +
                    "rising darkness near a century ago.  It seems you must follow in your great grandmother's footsteps, for the darkness approaches.",
                responses: {
                    "What happened?": (d) => d.load("next1"),
                },
            },
            next1: {
                text: "Fisherman Godwin was attacked just outside of Dagger's Gate.  Luckily, he was able to make it back to the " +
                    "village and we were able to heal his wounds.  Seek him out in his hut by " +
                    "the river.  Find out as much as you can about the creatures that attacked him.  We must protect our people!",
                responses: {
                    "Ok": (d) => {
                        d.done = true;
                        quests.finish("m2");
                        quests.start("m3");
                    },
                }
            },
        },
    },
    clariceComplete: {
        dfltTitle: "Clarice",
        dialogs: {
            start: {
                text: "...",
                responses: {
                    "Ok": (d) => d.done = true,
                }
            },
        },
    },

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
                        quests.start("q1");
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
                        quests.start("q2");
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