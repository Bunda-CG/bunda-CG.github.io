import * as cf from './config.js';

export function print(text) {
    const pBox = document.getElementById(cf.CONSOLE_NAME);
    pBox.innerHTML += text + "<br>";
}

export class Graphic {

    constructor() {
        this.canvas = document.getElementById(cf.CANVAS_NAME);
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;

        this.ctx = this.canvas.getContext("2d");
        this.image = this.ctx.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    }

    setPixel(x, y) {
        // gonna use simple math coordinate, so flip it.
        let flippedY = this.height - y
        let pixIdx = (this.width * flippedY + x) * 4;
        // Red
        this.image.data[pixIdx + 0] = 0;

        // Green
        this.image.data[pixIdx + 1] = 0;

        // Blue
        this.image.data[pixIdx + 2] = 0;

        // Alpha
        this.image.data[pixIdx + 3] = 255;
    }

    draw() {
        this.ctx.putImageData(this.image, 0, 0);
    }
}