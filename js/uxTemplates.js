
class UxTemplates {
    static button = {
        cls: "UxButton",
    };

    static init() {
        this.button = {
            cls: "UxButton",
            //mouseEnteredSound: assets.generate("beepUp"),
            //mouseLeftSound: assets.generate("beepDown"),
            xunpressed: Object.assign({}, assets.get("BUTTON_GRN_S3_OPAQ") ),
            xhighlight: Object.assign({}, assets.get("BUTTON_RED_S3_OPAQ") ),
            xpressed: Object.assign({}, assets.get("BUTTON_RED_S3_OPAQ") ),
        }
        console.log("button: " + Fmt.ofmt(this.button));
        console.log("button.xhighlight: " + Fmt.ofmt(this.button.xhighlight));
    }
}