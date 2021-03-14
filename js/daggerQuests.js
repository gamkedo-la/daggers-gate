const daggerQuests = {
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