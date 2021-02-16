
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
            },
            xhighlight: {
                cls: "Rect",
                borderWidth: 3,
                color: new Color(255,255,255,.5),
                borderColor: new Color(0,200,200,1),
            },
            xpressed: {
                cls: 'Rect',
                borderWidth: 3,
                color: new Color(255,255,255,.75),
                borderColor: new Color(0,255,255,1),
            },
        }
        console.log("button: " + Fmt.ofmt(this.button));
        console.log("button.xhighlight: " + Fmt.ofmt(this.button.xhighlight));
    }
}