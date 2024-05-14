import * as elem from "./helperTools/elementControl.js";
import * as cf from "./config.js";
import * as fn from "./function.js";
import * as tm from "./helperTools/timer.js";
import * as anim from "./helperTools/animation.js";
import * as kf from "./helperTools/keyframe.js";
import * as sc from "./scenes.js";
import { TakingScene } from "./scene1.js";
import * as sc2 from "./scene2.js";
import * as sc3 from "./scene3.js";

const gp = new elem.Graphic();
const timer = new tm.Timer();
const scenes = [];
const kfc = new kf.KeyframeCenter(scenes, timer);

timer.start();

function runner() {
  const start = new Date();
  gp.refresh();
  kfc.update();

  //draw all object
  anim.drawScenes(scenes, gp);

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
const takingScene = new TakingScene();
const fecusScene = new sc2.FecusScene();
const walkOutScene = new sc3.walkScene();
// animate zone
takingScene.makeAnimate();
fecusScene.makeAnimate();
walkOutScene.makeAnimate();

// push zone
scenes.push(takingScene);
scenes.push(fecusScene);
scenes.push(walkOutScene);

//-----------------------------------------------------------------------------------------------------------------------
let fpsCapText = "FPS Capacity: " + cf.FPS;
let frameTimeText = "Frame Time: " + fn.ROUND(cf.FRAME_TIME, 2) + "ms";
elem.print(fpsCapText, frameTimeText);

setInterval(runner, cf.FRAME_TIME);
