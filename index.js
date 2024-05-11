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

<<<<<<< HEAD
setInterval(runner, cf.FRAME_TIME);
=======
setInterval(runner, cf.FRAME_TIME);
/*
    }

// rand noise
gp.setColor(127, 0, 127, 255);
function randNoise () {    
    for (let i = 0; i < 99999; i++) {
        gp.setPixel(math.randomInt(0, 800), math.randomInt(0, 600));
    }
}

function drawRandomPoints () {
    randNoise();
    gp.update();
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

function translation (p, tx, ty) {
    p.x = p.x + tx;
    p.y = p.y + ty;
}

function rotation (p, degree, center) {
    let rad = degree * Math.PI/180;

    let cos = Math.cos(rad);
    let sin = Math.sin(rad);
    let cos1 = 1 - (Math.cos(rad));

    const pointMatrix = math.matrix([p.x],[p.y],1);
    const compMatrix = math.matrix([cos,-sin,(center.x*cos1) + (center.y*sin)], [sin,cos,(center.y*cos1) - (center.x*sin)], [0,0,1]);

    const res = math.multiply(pointMatrix,compMatrix);

    p.x = res.subset(math.index(0,0));
    p.x = res.subset(math.index(0,1));
}

function scaling (p, sx, sy, fixedpoint) {
    const pointMatrix = math.matrix([p.x],[p.y],1);
    const compMatrix = math.matrix([sx, 0, (1-sx) * fixedpoint.x], [0, sy, (1-sy) * fixedpoint.y], [0,0,1]);

    const res = math.multiply(pointMatrix,compMatrix);

    p.x = res.subset(math.index(0,0));
    p.x = res.subset(math.index(0,1));
}

function shearx(p, sh, yref) {
    const pointMatrix = math.matrix([p.x],[p.y],1);
    const compMatrix = math.matrix([1, sh, -(sh*yref)], [0, 1, 0], [0,0,1]);

    const res = math.multiply(pointMatrix,compMatrix);

    p.x = res.subset(math.index(0,0));
    p.x = res.subset(math.index(0,1));
}

function sheary(p, sh, xref) {
    const pointMatrix = math.matrix([p.x],[p.y],1);
    const compMatrix = math.matrix([1, 0, 0], [sh, 1, -(sh*xref)], [0,0,1]);

    const res = math.multiply(pointMatrix,compMatrix);

    p.x = res.subset(math.index(0,0));
    p.x = res.subset(math.index(0,1));
}

function drawObj(object) {
    for(let i = 0;i < object.pointlist.length;i++){
        setPixel(pointlist[i].x,pointlist[i].y);
    }
}

function drawAll(objectlist) {
    for(let i = 0;i < objectlist.length;i++){
        drawObj(objectlist[i]);
    }
}

gp.update();
elem.print("FPS: " + cf.FPS)
elem.print("frameTime: " + cf.FRAME_TIME + "ms");*/
>>>>>>> 28e9ef32288949289165aa15694a0e4f8cc96690
