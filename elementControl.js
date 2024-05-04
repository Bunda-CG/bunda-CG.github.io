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

        this.red = cf.RED;
        this.green = cf.GREEN;
        this.blue = cf.BLUE;
        this.alpha = cf.ALPHA;
    }

    setPixel(x, y) {
        // gonna use simple math coordinate, so flip it.
        let flippedY = this.height - y
        let pixIdx = (this.width * flippedY + x) * 4;
        // Red
        this.image.data[pixIdx + 0] = this.red;

        // Green
        this.image.data[pixIdx + 1] = this.green;

        // Blue
        this.image.data[pixIdx + 2] = this.blue;

        // Alpha
        this.image.data[pixIdx + 3] = this.alpha;
    }

    setColor(r, g, b, a) {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.alpha = a;
    }

    update() {
        this.ctx.putImageData(this.image, 0, 0);
    }
}