import * as elem from './elementControl.js';
import * as cf from './config.js';
import * as tm from './timer.js';
import * as anim from './animation.js';

const gp = new elem.Graphic();
const timer = new tm.Timer();

timer.start();

function runner() {
    const start = new Date();
    gp.refresh();

    //draw all object
    anim.drawAll(objectlist);

    gp.update();

    // calculate time to render
    const end = new Date();
    const time = end.getTime() - start.getTime();
    const fps = 1000 / time; //fps=1000/time
    let timeText = tm.toSecond(timer.howLong()) + " seconds";
    let fpsPotentialText = "FPS Potential: " + fps.toFixed(0);
    let frameTimePotentialText = "Frame Time Potential: " + time + "ms";
    elem.updatePrint(timeText, fpsPotentialText, frameTimePotentialText);
}

const objectlist = [];

const testspline = new anim.cubicBezierSpline(gp,200,200, 220,500, 280,500, 300,200);
objectlist.push(testspline);

const testline = new anim.Line(gp,200,0,700,600);
objectlist.push(testline);

//-----------------------------------------------------------------------------------------------------------------------
let fpsCapText = "FPS Capacity: " + cf.FPS;
let frameTimeText = "Frame Time: " + cf.FRAME_TIME + "ms";
elem.print(fpsCapText, frameTimeText);

setInterval(runner, cf.FRAME_TIME);
