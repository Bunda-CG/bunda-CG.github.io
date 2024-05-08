import * as elem from './elementControl.js';
import * as cf from './config.js';

const gp = new elem.Graphic();

function runner() {
    const start = new Date();
    gp.refresh();

    // small box
    gp.setColor(127, 127, 127, 255);
    for (let y = 50; y < 100; y++) {
        for (let x = 50; x < 100; x++) {
            gp.setPixel(x, y);
        }
    }

    // rand noise
    gp.setColor(0, 0, 0, 255);
    for (let i = 0; i < 99999; i++) {
        gp.setPixel(math.randomInt(0, 800), math.randomInt(0, 600));
    }

    gp.update();

    // calculate time to render
    const end = new Date();
    const time = end.getTime() - start.getTime();
    const fps = 1000 / time; //fps=1000/time
    let fpsPotentialText = "FPS Potential: " + fps.toFixed(0);
    let frameTimePotentialText = "Frame Time Potential: " + time + "ms";
    elem.updatePrint(fpsPotentialText, frameTimePotentialText);
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
let fpsCapText = "FPS Capacity: " + cf.FPS;
let frameTimeText = "Frame Time: " + cf.FRAME_TIME + "ms";
elem.print(fpsCapText, frameTimeText);