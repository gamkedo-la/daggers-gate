class UxEditorView extends UxPanel {
    constructor(spec={}) {
        super(spec);
        console.log("starting ux editor view");
    }

    render(ctx) {
        super.render(ctx);
		if (editorLvl) editorLvl.render(ctx);
    }
}


class UxEditorCtrl {
    constructor(spec={}) {
        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            tag: "editorCanvas",
            xchild: [
                {
                    cls: "UxEditorView",
                    tag: "editorPanel",
                    xxform: { origx: 0, origy: 0 },
                    xsketch: {
                        cls: 'Rect',
                        color: new Color(0,20,200,1),
                        xfitter: { cls: "FitToParent" },
                    },
                }
            ],
        });
        // FIXME: setup globals???
        editorMode = true;
        startEditor();
    }

    keyPressed(key) {
        console.log("editor key pressed");
    }

    keyReleased(key) {
    }
}