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

/*const testspline = new anim.cubicBezierSpline(gp,100,550, 200,550, 150,525, 250,525);
anim.rotation(testspline,180,200,500);
anim.scaling(testspline,2,2,200,500);
objectlist.push(testspline);*/

const testpolygon = new anim.incompletepolygon(gp);
testpolygon.addPoint(310,310);
testpolygon.addPoint(310,400);
testpolygon.addPoint(400,400);
testpolygon.addPoint(400,310);
testpolygon.addPoint(310,310);

//anim.rotation(testpolygon,20,300,300);
anim.sheary(testpolygon,2,310);

objectlist.push(testpolygon);

let fpsCapText = "FPS Capacity: " + cf.FPS;
let frameTimeText = "Frame Time: " + cf.FRAME_TIME + "ms";
elem.print(fpsCapText, frameTimeText);

setInterval(runner, cf.FRAME_TIME);