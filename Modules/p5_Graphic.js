/**
 * @name p5_Graphic.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Deals with graphic in p5.
 * @updated September 20th, 2020.
 * @license Free
 */

'use strict';

class P5_GRAPHIC {

    constructor(params) {

    }

    circle(color, x, y, diameter) {
        push();
        noStroke();
        fill('rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + color.a + ')');
        ellipseMode(CENTER);
        ellipse(x, y, diameter, diameter);
        pop();
    }

    line(color, P1, P2, weigth) {
        push();
        stroke('rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + color.a + ')');
        strokeWeight(weigth);
        line(P1.x, P1.y, P2.x, P2.y);
        pop();
    }

    rectangle(color, x, y, width, height) {
        push();
        noStroke();
        fill('rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + color.a + ')');
        rectMode(CENTER);
        rect(x, y, width, height);
        pop();
    }

}