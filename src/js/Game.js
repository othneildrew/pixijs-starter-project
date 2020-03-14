
import * as PIXI from 'pixi.js';
import ScaleCanvas from './utils/ScaleCanvas';
import KeyboardEvent from './controllers/events/KeyboardEvent';

/**
 * ======================================================================
 * Game.js
 * ======================================================================
 * 
 */

class Game {

    constructor({ width, height }) {
        this.width = width;
        this.height = height;
        this.scaleFactor = null;
        this.game = null;
        this.gameScreens = {
            menu: null,
            instructions: null,
            settings: null,
            levels: [],
        };
        this.sprites = {};
        this.state = null;
        this.timeElapsed = null;
        this.players = {};
        this.init();
    }

    _setup() {
        // Initialize the sprites for the game
        console.log('All files loaded')









        // Add game events (i.e.: keyboard movements, etc.)
        this._addGameEvents();

        // Set the game state and start the game loop
        this.state = this._play;
        this.game.ticker.add(delta => this._gameLoop(delta));
    }

    _gameLoop(delta) {
        // Update the current current game state
        this.state(delta);
    }

    _play() {
        const dt = new Date();
        console.log(dt.getSeconds());



    }

    _end() {

    }

    _createApplication() {
        // Set the scaling for the application
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        this.game = new PIXI.Application({
            width: this.width,
            height: this.height,
            // transparent: true,
            antialias: false,
        });

        // Add PIXI canvas to the HTML body
        document.body.appendChild(this.game.view);

        // Set the canvas to scale and fit to max browser window size
        // this.scaleFactor = ScaleCanvas.auto(this.game.view);
    }

    _loadProgressHandler(loader, resource) {
        console.log('loading', resource.url)
        console.log('progress', `${loader.progress}%`)
    }

    _loadGameAssets() {
        PIXI.Loader.shared
            // .add('bg_jungle_clouds', 'sprites/maps/jungle/clouds.png')

            // .on('progress', this._loadProgressHandler)
            .load((loader, resources) => {
                // Create sprites from background textures
                // this.sprites['bg_jungle_sky'] = new PIXI.TilingSprite(
                //     resources['bg_jungle_sky'].texture, this.width, this.height
                // );

                this._setup();
            });
    }

    _addGameEvents() {
        // Register keyboard events and define gave behavior when a specific key event is trigger
        const   kbUp = new KeyboardEvent('ArrowUp'),
                kbRight = new KeyboardEvent('ArrowRight'),
                kbDown = new KeyboardEvent('ArrowDown'),
                kbLeft = new KeyboardEvent('ArrowLeft'),
                kbSpace = new KeyboardEvent(' '),
                kbShift = new KeyboardEvent('Shift'),
                kbEnter = new KeyboardEvent('Enter');
                
        kbUp.press = () => {
            console.log('move up')
        }

        kbRight.press = () => {
            console.log('move right')
        }

        kbDown.press = () => {
            console.log('move down')
        }

        kbLeft.press = () => {
            console.log('move left')
        }

        kbSpace.press = () => {
            console.log('jump')
        }

        kbShift.press = () => {
            console.log('run faster')
        }

        kbEnter.press = () => {
            console.log('select / enter')
        }
    }

    _addBrowserEvents() {
        window.addEventListener('resize', () => {
            // this.scaleFactor = ScaleCanvas.auto(this.game.view)
        })
    }

    _getScaleFactor(objWidth, objHeight) {
        return Math.min(
            window.innerWidth / objWidth,
            window.innerHeight / objHeight
        );
    }

    init() {
        this._createApplication();
        this._addBrowserEvents();
        this._loadGameAssets();
    }

}

export default Game;