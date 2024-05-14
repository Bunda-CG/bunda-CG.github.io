import * as anim from "./helperTools/animation.js";
import * as fn from "./function.js";
import { Scene } from "./scenes.js";

export class LookforhelpScene extends Scene {
  static START_AT = 54000;
  static END_AT = 62000;
  constructor() {
    super();
    this.startAt = LookforhelpScene.START_AT;
    this.endAt = LookforhelpScene.END_AT;

    //Background Lines
    this.bgl1 = new anim.Line(60, 300, 60, 600);
    this.bgl2 = new anim.Line(60, 300, 0, 230);

    this.bgl3 = new anim.Line(600, 300, 600, 600);
    this.bgl4 = new anim.Line(600, 300, 800, 30);

    this.bgl5 = new anim.Line(600, 430, 60, 430);

    //Janitor circle : radius = 50, c = (190,350)
    this.janitorTop = new anim.cubicBezierSpline(
      140,
      350,
      140,
      417,
      240,
      417,
      240,
      350
    );

    this.janitorBottom = new anim.cubicBezierSpline(
      140,
      350,
      140,
      283,
      240,
      283,
      240,
      350
    );

    //Janitor's eyes, c = (165,365)
    this.janitorLeftEyeTop = new anim.cubicBezierSpline(
      160,
      365,
      160,
      385,
      170,
      385,
      170,
      365
    );

    this.janitorLeftEyeBottom = new anim.cubicBezierSpline(
      160,
      365,
      160,
      345,
      170,
      345,
      170,
      365
    );

    this.janitorRightEyeTop = new anim.cubicBezierSpline(
      180,
      365,
      180,
      385,
      190,
      385,
      190,
      365
    );

    this.janitorRightEyeBottom = new anim.cubicBezierSpline(
      180,
      365,
      180,
      345,
      190,
      345,
      190,
      365
    );

    //Pepe circle : radius = 150, c = (650,45)
    this.pepeTop = new anim.cubicBezierSpline(
      500,
      45,
      500,
      245,
      800,
      245,
      800,
      45
    );

    this.pepeBottom = new anim.cubicBezierSpline(
      500,
      45,
      500,
      -165,
      800,
      -165,
      800,
      45
    );
  }

  addKeyframe(object, endAt, transform, moveFunc, ...args) {
    super.preventStart(
      LookforhelpScene.START_AT,
      object,
      endAt,
      transform,
      moveFunc,
      ...args
    );
    object.addKeyframe(
      LookforhelpScene.START_AT + endAt,
      transform,
      moveFunc,
      ...args
    );
  }

  makeAnimate() {
    //Pepe walk
    this.addKeyframe(
      this.pepeTop,
      5000,
      anim.scaling,
      fn.SIGMOID,
      0.42,
      0.42,
      37,
      467
    );

    this.addKeyframe(
      this.pepeBottom,
      5000,
      anim.scaling,
      fn.SIGMOID,
      0.42,
      0.42,
      37,
      467
    );

    //Janitor eyes move naturally
    this.addKeyframe(
      this.janitorLeftEyeTop,
      2000,
      anim.translation,
      fn.LINEAR,
      0,
      -15
    );

    this.addKeyframe(
      this.janitorLeftEyeBottom,
      2000,
      anim.translation,
      fn.LINEAR,
      0,
      -15
    );

    this.addKeyframe(
      this.janitorRightEyeTop,
      2000,
      anim.translation,
      fn.LINEAR,
      0,
      -15
    );

    this.addKeyframe(
      this.janitorRightEyeBottom,
      2000,
      anim.translation,
      fn.LINEAR,
      0,
      -15
    );

    //Eyes stay for a liitle bit
    this.addKeyframe(
      this.janitorLeftEyeTop,
      4000,
      anim.translation,
      fn.LINEAR,
      0,
      0
    );

    this.addKeyframe(
      this.janitorLeftEyeBottom,
      4000,
      anim.translation,
      fn.LINEAR,
      0,
      0
    );

    this.addKeyframe(
      this.janitorRightEyeTop,
      4000,
      anim.translation,
      fn.LINEAR,
      0,
      0
    );

    this.addKeyframe(
      this.janitorRightEyeBottom,
      4000,
      anim.translation,
      fn.LINEAR,
      0,
      0
    );

    //Eyes move naturally 2
    this.addKeyframe(
      this.janitorLeftEyeTop,
      6000,
      anim.translation,
      fn.LINEAR,
      0,
      15
    );

    this.addKeyframe(
      this.janitorLeftEyeBottom,
      6000,
      anim.translation,
      fn.LINEAR,
      0,
      15
    );

    this.addKeyframe(
      this.janitorRightEyeTop,
      6000,
      anim.translation,
      fn.LINEAR,
      0,
      15
    );

    this.addKeyframe(
      this.janitorRightEyeBottom,
      6000,
      anim.translation,
      fn.LINEAR,
      0,
      15
    );

    //Look at Pepe
    this.addKeyframe(
      this.janitorLeftEyeTop,
      8000,
      anim.translation,
      fn.SIGMOID,
      25,
      0
    );

    this.addKeyframe(
      this.janitorLeftEyeBottom,
      8000,
      anim.translation,
      fn.SIGMOID,
      25,
      0
    );

    this.addKeyframe(
      this.janitorRightEyeTop,
      8000,
      anim.translation,
      fn.SIGMOID,
      25,
      0
    );

    this.addKeyframe(
      this.janitorRightEyeBottom,
      8000,
      anim.translation,
      fn.SIGMOID,
      25,
      0
    );
  }
}

//ทดเลข vector (650-190, 45-350) = (460, -305)
// Janitor Center point = (190,350)
