
/**
 * ======================================================================
 * KeyboardEvent.js
 * ======================================================================
 * Adopted from https://github.com/kittykatattack/learningPixi#keyboard-movement
 * Keyboard event List: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
 * 
 * This class accepts a browser key event keyValue when constructored and listens for key presses.
 * When the keyValue is pressed a press() event is fired.
 * The press event should be specified after the object construction like this:
 * --- keyVariable.press = function () {
 * ---   // do something useful     
 * --- }
 *
 */

class KeyboardEvent {
    
    constructor(keyValue) {
        this.keyValue = keyValue;
        this.isDown = false;
        this.isUp = true;
        this.press = undefined;
        this.release = undefined;
        this.init();
    }

    /**
     * If method is called, a key was pressed so trigger the press method and set
     * the isDown state true and isUp false.
     */
    _keydownHandler(event) {
        event.preventDefault();
        if (event.key === this.keyValue) {
            if (this.isUp && this.press) this.press();
            this.isDown = true;
            this.isUp = false;
        }
    }
    
    /**
     * If method is called, a key is no longer being pressed so trigger the release method
     * and set the isDown state false and isUp true.
     */
    _keyupHandler(event) {
        event.preventDefault();
        if (event.key === this.keyValue) {
            if (this.isDown && this.release) this.release();
            this.isDown = false;
            this.isUp = true;
        }
    }

    /**
     * Attach event listeners and wait for keydown/keyup events.
     */
    _subscribe() {
        window.addEventListener('keydown', (event) => this._keydownHandler(event));
        window.addEventListener('keyup', (event) => this._keyupHandler(event));
    }

    /**
     * Detach event listeners.
     */
    unsubscribe() {
        window.removeEventListener('keydown', (event) => this._keydownHandler(event));
        window.removeEventListener('keyup', (event) => this._keyupHandler(event));
    }

    _defineErrors() {
        // When no key or unknown key is specified.
        if (this.keyValue == '' || this.keyValue === undefined) {
            console.error('No keyValue specified to.');
        }

        // // When no press callback has been set
        // if (this.press === undefined) {
        //     console.error('No press() callback set.');
        // }
    }

    /**
     * On KeyboardEvent / object construction, start subscribe to and start listening
     * events.
     */
    init() {
        this._subscribe();
        this._defineErrors();
    }

}

export default KeyboardEvent;