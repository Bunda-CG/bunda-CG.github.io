import * as elem from './elementControl.js';
import * as cf from './config.js';

const gp = new elem.Graphic();

// small box
gp.setColor(255, 255, 255, 255);
for (let y = 10; y < 30; y++) {
    for (let x = 10; x < 30; x++) {
        gp.setPixel(x, y);
    }
}

// rand noise
gp.setColor(127, 0, 127, 255);
for (let i = 0; i < 99999; i++) {
    gp.setPixel(math.randomInt(0, 800), math.randomInt(0, 600));
}

class point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

class obj {
    constructor(pointlist){
        this.pointlist = pointlist;
    }
}

gp.update();
elem.print("FPS: " + cf.FPS)
elem.print("frameTime: " + cf.FRAME_TIME + "ms");