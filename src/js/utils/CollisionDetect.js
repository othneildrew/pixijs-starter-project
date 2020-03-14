
/**
 * ======================================================================
 * CollisionDetect.js
 * ======================================================================
 * https://github.com/kittykatattack/learningPixi#the-hittestrectangle-function
 * 
 */

class CollisionDetect {

    static _hit = undefined;
    static _combinedHalfWidths = undefined;
    static _combinedHalfHeight = undefined;
    static _vx = undefined;
    static _vy = undefined;

    static check(r1, r2) {
        // Hit will determine whether there's a collision
        this._hit = false;

        // Find the center points of each sprite
        r1.centerX = r1.x + r1.width / 2;
        r1.centerY = r1.y + r1.height / 2;
        r2.centerX = r2.x + r2.width / 2;
        r2.centerY = r2.y + r2.height / 2;

        // Find the half-widths and half-heights of each sprite
        r1.halfWidth = r1.width / 2;
        r1.halfHeight = r1.height / 2;
        r2.halfWidth = r2.width / 2;
        r2.halfHeight = r2.height / 2;

        // Calculate the distance vector between the sprites
        _vx = r1.centerX - r2.centerX;
        _vy = r1.centerY - r2.centerY;
    
        // Figure out the combined half-widths and half-heights
        _combinedHalfWidths = r1.halfWidth + r2.halfWidth;
        _combinedHalfHeights = r1.halfHeight + r2.halfHeight;

        // Check for a collision on the x axis
        if (Math.abs(_vx) < _combinedHalfWidths) {
            // A collision might be occurring. Check for a collision on the y axis
            if (Math.abs(_vy) < _combinedHalfHeights) {
                // There's definitely a collision happening
                _hit = true;
            }
                else {
                    // There's no collision on the y axis
                    _hit = false;
                }
        }
            else {    
                // There's no collision on the x axis
                _hit = false;
            }

        // Return either true or false
        return this._hit;
    }

}

export default CollisionDetect;