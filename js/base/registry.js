//export { Registry };
//import { UxButton } from "./ux/uxButton.js";
//import { UxCanvas } from "./ux/uxCanvas.js";
//import { UxLayer } from "./ux/uxLayer.js";
//import { UxText } from "./ux/uxText.js";
//import { UxView } from "./ux/uxView.js";
//import { UxPanel } from "./ux/uxPanel.js";
//import { Sketch } from "./sketch.js";
//import { Sprite } from "./sprite.js";
//import { Text } from "./text.js";
//import { Rect } from "./rect.js";
//import { Animation } from "./animation.js";

class Registry {
    static init() {
        //console.log("registry init");
        // ux views
        UxView._genreg(UxView);
        UxView._genreg(UxCanvas);
        UxView._genreg(UxPanel);
        UxView._genreg(UxButton);
        UxView._genreg(UxText);
        UxView._genreg(UxInput);
        UxView._genreg(UxTitleView);
        UxView._genreg(UxPlayView);
        UxView._genreg(UxEditorView);
        // sketches
        Sketch._genreg(Animation);
        Sketch._genreg(Rect);
        Sketch._genreg(Sprite);
        Sketch._genreg(StretchSprite);
        Sketch._genreg(Text);
        Sketch._genreg(Shape);
    }
}