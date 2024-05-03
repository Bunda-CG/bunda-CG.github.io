import * as elem from './elementControl.js';

const gp = new elem.Graphic();

// small box
for (let y = 10; y < 30; y++) {
    for (let x = 10; x < 30; x++) {
        gp.setPixel(x, y);
    }
}

// rand noise
for (let i = 0; i < 99999; i++) {
    gp.setPixel(math.randomInt(0, 800), math.randomInt(0, 600));
}

gp.draw();
elem.print("Hello world");