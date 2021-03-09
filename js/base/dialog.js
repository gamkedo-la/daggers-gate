
/** ========================================================================
 * Dialog represents an active dialog and any state management associated with it.
 */
class Dialog {

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec) {
        this._done = false;
        this._text = Text.rlorem;
        let num = Math.floor(Math.random() * 3) + 1;
        this._responses = [];
        for (let i=0; i<num; i++) {
            this._responses.push(Text.rword);
        }
    }

    // PROPERTIES ----------------------------------------------------------
    get done() {
        return this._done;
    }

    get title() {
        return "Dialog Title"
    }

    get text() {
        return this._text;
    }

    get responses() {
        return this._responses;
    }

    // METHODS -------------------------------------------------------------
    chooseResponse(response) {
        console.log("chooseResponse: " + response);
        this._done = true;
    }

}