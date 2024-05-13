import * as elem from "./helperTools/elementControl.js";
import * as cf from "./config.js";
import * as fn from "./function.js";
import * as tm from "./helperTools/timer.js";
import * as anim from "./helperTools/animation.js";
import * as kf from "./helperTools/keyframe.js";
import * as objects from "./objects.js";

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
  anim.drawAll(objectlist, gp);

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

// define zone
const toiletScene = new objects.ToiletScene();

// push zone
objectlist.push(toiletScene.toiletSeatTop);
objectlist.push(toiletScene.toiletSeatPing);
objectlist.push(toiletScene.toiletSeatBottomLeft);
objectlist.push(toiletScene.toiletSeatBottomRight);
objectlist.push(toiletScene.toiletFloor);
objectlist.push(toiletScene.pepeToiletTop);
objectlist.push(toiletScene.pepeToiletBottom);
objectlist.push(toiletScene.pepeLeftEyeTop);
objectlist.push(toiletScene.pepeLeftEyeBottom);
objectlist.push(toiletScene.pepeRightEyeTop);
objectlist.push(toiletScene.pepeRightEyeBottom);
objectlist.push(toiletScene.pepeHandTop);
objectlist.push(toiletScene.pepeHandBottom);
//objectlist.push(objects.);

// animate zone
toiletScene.makeAnimate();

//-----------------------------------------------------------------------------------------------------------------------
let fpsCapText = "FPS Capacity: " + cf.FPS;
let frameTimeText = "Frame Time: " + fn.ROUND(cf.FRAME_TIME, 2) + "ms";
elem.print(fpsCapText, frameTimeText);

setInterval(runner, cf.FRAME_TIME);
