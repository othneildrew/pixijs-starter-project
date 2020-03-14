
import KeyboardEvent from './controllers/events/KeyboardEvent';
import Game from './Game';

/**
 * ======================================================================
 * app.js
 * ======================================================================
 * 
 */


const kbH = new KeyboardEvent('h');

kbH.press = () => {
    console.log('hello world');
}



const game = new Game({
    width: 800,
    height: 600,
});