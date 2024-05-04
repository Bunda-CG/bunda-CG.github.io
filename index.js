import * as elem from './elementControl.js';
import * as cf from './config.js';

const gp = new elem.Graphic();

function runner() {
    const start = new Date();
    gp.refresh();

    // small box
    gp.setColor(255, 255, 255, 255);
    for (let y = 10; y < 100; y++) {
        for (let x = 10; x < 100; x++) {
            gp.setPixel(x, y);
        }
    }

    // rand noise
    gp.setColor(127, 0, 127, 255);
    for (let i = 0; i < 99999; i++) {
        gp.setPixel(math.randomInt(0, 800), math.randomInt(0, 600));
    }

    gp.update();

    // calculate time to render
    const end = new Date();
    const time = end.getTime() - start.getTime();
    const fps = 1000 / time;
    elem.updatePrint("FPSPotential: " + fps.toFixed(0) + " frameTime: " + time + "ms");
}

setInterval(runner, cf.FRAME_TIME);
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
elem.print("FPSCap: " + cf.FPS)
elem.print("frameTime: " + cf.FRAME_TIME + "ms");