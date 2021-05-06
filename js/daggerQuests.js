const daggerQuests = {

    "m1": {
        main: true,
        title: "An Evil Awakens, A Hero Rises, Pt. 1",
        text: "You awaken from a restless sleep with haunted visions of your town in ruins, your friends murdered, and your own death.  Seek out Elder Clarice.  She may be able to help sort out your dreams and guide you.",
        rewards: [
            { tag: "GOLD_COINS_TWO_DROP", amt: 5 },
            { tag: "TEMPLE_KEY", amt: 1, misc: true },
        ],
        objectives: [
            {
                text: "Speak with Elder Clarice",
                cls: "CollectionObjective",
                getter: () => 0,
                count: 1,
            },
        ],
    },

    "m2": {
        main: true,
        title: "An Evil Awakens, A Hero Rises, Pt. 2",
        text: "Seek the artifact from the Temple of the Elements, located in the Church cellar here in town.  Unlock the internal temple seals by matching rune stones to rune pillars to reach the artifact.  Avoid any temple safeguards.",
        rewards: [
            { tag: "GOLD_COINS_TWO_DROP", amt: 5 },
        ],
        turnin: "Return to Elder Clarice in Dagger's Gate",
        objectives: [
            {
                text: "Obtain the Ancient Artifact",
                cls: "CollectionObjective",
                getter: () => ((p1.inventory.includes("SWORD") ? 1 : 0)),
                count: 1,
            },
        ],
    },

    "m3": {
        main: true,
        title: "Darkness Encroaches, Pt. 1",
        text: "News of Fisherman Godwin's attack is speading through the village.  Seek him out in his hut by the river.  Find out more about where he was attacked and " +
            "the creatures that attacked him.",
        rewards: [
            { tag: "GOLD_COINS_TWO_DROP", amt: 5 },
        ],
        objectives: [
            {
                text: "Speak with Fisherman Godwin",
                cls: "CollectionObjective",
                getter: () => 0,
                count: 1,
            },
        ],
    },

    "q1": {
        main: true,
        title: "There and Back Again",
        text: "Prove that you're more than just a stain on the dungeon floor.  Go and slay 5 Slimes in the next room.  Can you find your courage?  Can you even lift your sword...",
        rewards: [
            { tag: "GOLD_COINS_TWO_DROP", amt: 5 },
        ],
        turnin: "Return to Sir Bob in Dagger's Gate",
        objectives: [
            {
                text: "Slay the Slimes",
                cls: "EvtObjective",
                event: GameEvents.enemyDied,
                filter: (evt) => (evt.actor.tag === "SLIME") && currentLevel.name === "lvl2",
                count: 5,
            },
            /*
            {
                text: "Obtain the Unobtainable",
                cls: "CollectionObjective",
                getter: () => 0,
                count: 1,
            },
            */
        ],
    },

    "q2": {
        main: true,
        title: "Find the Ice Wand",
        text: "Find the wand that is rumored to shot ice",
        rewards: [
            { tag: "GOLD_COINS_TWO_DROP", amt: 5 },
        ],
        turnin: "Return to Mary in Dagger's Gate",
        objectives: [
            {
                text: "Find the Ice Wand",
                cls: "EvtObjective",
                event: GameEvents.enemyDied,
                filter: (evt) => (evt.actor.tag === "SLIME") && currentLevel.name === "lvl2",
                count: 5,
            },
            /*
            {
                text: "Obtain the Unobtainable",
                cls: "CollectionObjective",
                getter: () => 0,
                count: 1,
            },
            */

        ],




    }
}