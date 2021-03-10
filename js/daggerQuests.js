const daggerQuests = {
    "q1": {
        main: true,
        title: "There and Back Again",
        text: Text.rlorem,
        reward: [
            { tag: "GOLD_COINS_TWO_DROP", amt: 5 },
        ],
        turnin: "Return to Sir Bob in Dagger's Gate",
        objectives: [
            {
                cls: "EvtObjective",
                filter: (evt) => (evt.actor.tag === "Slime") && currentLevel === "lvl2",
                count: 5,
            }
        ],
    }
}