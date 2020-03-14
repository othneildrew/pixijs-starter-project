
/**
 * ======================================================================
 * BrowserEvent.js
 * ======================================================================
 * 
 */

class BrowserEvent {
    
    constructor(value) {
        this.value = value;
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
        if (event.key === this.value) {
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
        if (event.key === this.value) {
            if (this.isDown && this.release) this.release();
            this.isDown = false;
            this.isUp = true;
        }
    }

    _resizeHandler() {

    }

    _orientationChangeHandler() {

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

    /**
     * On KeyboardEvent / object construction, start subscribe to and start listening
     * events.
     */
    init() {
        this._subscribe();
    }

}

export default BrowserEvent;