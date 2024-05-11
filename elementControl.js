import * as cf from './config.js';

export function print(...text) {
    const pBox = document.getElementById(cf.CONSOLE_NAME);
    let combinedText = "";
    text.forEach((elemText) => {
        combinedText += elemText + "<br>";
    });
    pBox.innerHTML += combinedText;
}

export function updatePrint(...text) {
    const updateBox = document.getElementById(cf.CONSOLE_UPDATE);
    let combinedText = "";
    text.forEach((elemText) => {
        combinedText += elemText + "<br>";
    });
    updateBox.innerHTML = combinedText;
}

export class Graphic {

    constructor() {
        // canvas and context
        this.canvas = document.getElementById(cf.CANVAS_NAME);
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        this.ctx = this.canvas.getContext("2d");
        
        // image
        this.image = this.ctx.getImageData(0, 0, this.width, this.height);
        this.red = cf.RED;
        this.green = cf.GREEN;
        this.blue = cf.BLUE;
        this.alpha = cf.ALPHA;

        // background
        this.bgRed = this.image.data[0];
        this.bgGreen = this.image.data[1];
        this.bgBlue = this.image.data[2];
        this.bgAlpha = this.image.data[3];
    }

    setPixel(x, y) {
        // gonna use simple math coordinate, so flip it.
        let flippedY = this.height - y;
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

    setBgColor(r, g, b, a) {
        this.bgRed = r;
        this.bgGreen = g;
        this.bgBlue = b;
        this.bgAlpha = a;
    }

    refresh() {
        // put clean background
        for (let i = 0; i < this.image.data.length; i+=4) {
            this.image.data[i + 0] = this.bgRed;
            this.image.data[i + 1] = this.bgGreen;
            this.image.data[i + 2] = this.bgBlue;
            this.image.data[i + 3] = this.bgAlpha;
        }
    }

    update() {
        this.ctx.putImageData(this.image, 0, 0);
    }
}