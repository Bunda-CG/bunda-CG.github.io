import * as elem from "./helperTools/elementControl.js";
import * as cf from "./config.js";
import * as fn from "./function.js";
import * as tm from "./helperTools/timer.js";
import * as anim from "./helperTools/animation.js";
import * as kf from "./helperTools/keyframe.js";

import { TakingScene } from "./scene1.js";
import * as sc2 from "./scene2.js";
import * as sc3 from "./scene3.js";
import * as sc4 from "./scene4.js";
import * as sc5 from "./scene5.js";
import * as sc6 from "./scene6.js";
import * as sc7 from "./scene7.js";

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
const lookforhelpScene = new sc4.LookforhelpScene();
const walkInScene = new sc5.walkwithScene();
const tittaScene = new sc6.TittaScene();
const stareScene = new sc7.StareScene();

// animate zone
takingScene.makeAnimate();
fecusScene.makeAnimate();
walkOutScene.makeAnimate();
lookforhelpScene.makeAnimate();
walkInScene.makeAnimate();
tittaScene.makeAnimate();
stareScene.makeAnimate();

// push zone
scenes.push(takingScene);
scenes.push(fecusScene);
scenes.push(walkOutScene);
scenes.push(lookforhelpScene);
scenes.push(walkInScene);
scenes.push(tittaScene);
scenes.push(stareScene);

//-----------------------------------------------------------------------------------------------------------------------
let fpsCapText = "FPS Capacity: " + cf.FPS;
let frameTimeText = "Frame Time: " + fn.ROUND(cf.FRAME_TIME, 2) + "ms";
elem.print(fpsCapText, frameTimeText);

setInterval(runner, cf.FRAME_TIME);
