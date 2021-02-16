
class UxTemplates {
    static button = {
        cls: "UxButton",
    };

    static init() {
        this.button = {
            cls: "UxButton",
            //mouseEnteredSound: assets.generate("beepUp"),
            //mouseLeftSound: assets.generate("beepDown"),
            xunpressed: {
                cls: 'Rect',
                borderWidth: 3,
                color: new Color(255,255,255,.25),
                borderColor: new Color(0,127,127,1),
                xfitter: { cls: "FitToParent" },
            },
            xhighlight: {
                cls: 'Rect',
                borderWidth: 3,
                color: new Color(255,255,255,.5),
                borderColor: new Color(0,127,127,1),
                xfitter: { cls: "FitToParent" },
            },
            xpressed: {
                cls: 'Rect',
                borderWidth: 3,
                color: new Color(255,255,255,.75),
                borderColor: new Color(0,127,127,1),
                xfitter: { cls: "FitToParent" },
            },
        }
    }
}