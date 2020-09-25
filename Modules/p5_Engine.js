/**
 * @name p5_Engine.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Core p5 processing unit.
 * @updated September 20th, 2020.
 * @license Free
 */

(function () {

    'use strict';

    class P5_ENGINE {

        constructor(params) {
            
            this._canvasWidth = params.canvasWidth !== undefined ? params.canvasWidth : displayHeight / 1.5;
            this._canvasHeight = params.canvasHeight !== undefined ? params.canvasHeight : displayHeight / 1.5;

            this._canvasInitiated = false;
            this._autoCanvas = params.autoCanvas !== undefined ? null : this.initCanvas();

        }

        // CANVAS
        initCanvas() {
            if (!this._canvasInitiated) {
                createCanvas(this._canvasWidth, this._canvasHeight);
                this._canvasInitiated = true;
            } else {
                console.warn("Canvas cannot be initated more than once.");
            }
        }
        getCanvasWidth() {
            return _canvasWidth;
        }
        getCanvasHeight() {
            return _canvasHeight;
        }

        // RENDER
        

    }

});