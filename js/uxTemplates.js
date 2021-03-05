
class UxTemplates {
    static button = {
        cls: "UxButton",
    };
    static invButton = {
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

        this.invButton = {
            cls: "UxButton",
            //mouseEnteredSound: assets.generate("beepUp"),
            //mouseLeftSound: assets.generate("beepDown"),
            xunpressed: Object.assign( {lockRatio: true}, assets.get("BUTTON_TAN_S2_TRAN") ),
            xpressed: Object.assign( {lockRatio: true}, assets.get("BUTTON_GRN_S2_TRAN") ),
            xhighlight: Object.assign( {lockRatio: true}, assets.get("BUTTON_GRN_S2_TRAN") ),
            xtext: {text:""},
        }

    }
}