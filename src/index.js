import * as elem from "./helperTools/elementControl.js";
import * as cf from "./config.js";
import * as fn from "./function.js";
import * as tm from "./helperTools/timer.js";
import * as anim from "./helperTools/animation.js";
import * as kf from "./helperTools/keyframe.js";

const gp = new elem.Graphic();
const timer = new tm.Timer();
const objectlist = [];
const kfc = new kf.KeyframeCenter(objectlist, timer);

timer.start();

function runner() {
  const start = new Date();
  gp.refresh();
  kfc.update();

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

const testspline = new anim.cubicBezierSpline(
  gp,
  200,
  200,
  220,
  500,
  280,
  500,
  300,
  200
);
testspline.addKeyframe(1000, anim.translation, fn.BELL, -200, -200);
testspline.addKeyframe(2000, anim.translation, fn.CONSTANT, 200, 200);
testspline.addKeyframe(3000, anim.rotation, fn.BELL, -90, 300, 300);
testspline.addKeyframe(4000, anim.scaling, fn.BELL, 0.5, 0.5, 200, 300);
testspline.addKeyframe(5000, anim.scaling, fn.CONSTANT, 0.5, 0.5, 0, 0);
testspline.addKeyframe(6000, anim.shearx, fn.CONSTANT, 2, 200);
testspline.addKeyframe(7000, anim.translation, fn.BELL, 200, 200);
testspline.addKeyframe(8000, anim.sheary, fn.BELL, -2, 200);
objectlist.push(testspline);

const testline = new anim.Line(gp, 200, 0, 700, 600);
// objectlist.push(testline);

//-----------------------------------------------------------------------------------------------------------------------
let fpsCapText = "FPS Capacity: " + cf.FPS;
let frameTimeText = "Frame Time: " + fn.ROUND(cf.FRAME_TIME, 2) + "ms";
elem.print(fpsCapText, frameTimeText);

setInterval(runner, cf.FRAME_TIME);
