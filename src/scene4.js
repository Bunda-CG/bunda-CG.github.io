import * as anim from "./helperTools/animation.js";
import * as fn from "./function.js";
import { Scene } from "./scenes.js";

export class LookforhelpScene extends Scene {
  static START_AT = 0;
  static END_AT = 50000;
  constructor() {
    super();
    this.startAt = LookforhelpScene.START_AT;
    this.endAt = LookforhelpScene.END_AT;

    //Background Lines
    this.bgl1 = new anim.Line(60,300,60,600);
    this.bgl2 = new anim.Line(60,300,0,230);

    this.bgl3 = new anim.Line(600,300,600,600);
    this.bgl4 = new anim.Line(600,300,800,30);

    this.bgl5 = new anim.Line(600,430,60,430);

    //Janitor circle : radius = 50 c = (190,350)
    this.janitorTop = new anim.cubicBezierSpline(
      140,350,
      140,417,
      240,417,
      240,350
    );

    this.janitorBottom = new anim.cubicBezierSpline(
      140,350,
      140,283,
      240,283,
      240,350
    );
  }
}