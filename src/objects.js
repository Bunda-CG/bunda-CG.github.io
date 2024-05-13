import * as anim from "./helperTools/animation.js";
import * as fn from "./function.js";

export class Scene {
  preventStart(startAt, object) {
    if (object.keyframes.length < 1 && startAt > 0) {
      object.addKeyframe(startAt, anim.stay, fn.LINEAR);
    }
  }

  makeAnimate() {}
}
export class ToiletScene extends Scene {
  static START_AT = 5000;
  static END_AT = 30000;
  constructor() {
    super();
    this.startAt = ToiletScene.START_AT;
    this.endAt = ToiletScene.END_AT;
    //toilet
    this.toiletSeatTop = new anim.incompletepolygon();
    this.toiletSeatTop.addPoint(484, 249);
    this.toiletSeatTop.addPoint(484, 291);
    this.toiletSeatTop.addPoint(674, 291);
    this.toiletSeatTop.addPoint(674, 249);
    this.toiletSeatTop.addPoint(484, 249);

    this.toiletSeatPing = new anim.incompletepolygon();
    this.toiletSeatPing.addPoint(655, 291);
    this.toiletSeatPing.addPoint(678, 291);
    this.toiletSeatPing.addPoint(678, 480);
    this.toiletSeatPing.addPoint(655, 480);
    this.toiletSeatPing.addPoint(655, 291);

    this.toiletSeatBottomLeft = new anim.cubicBezierSpline(
      541,
      190,
      530,
      196,
      504,
      228,
      503,
      248
    );
    this.toiletSeatBottomRight = new anim.cubicBezierSpline(
      621,
      190,
      632,
      196,
      664,
      228,
      659,
      248
    );

    //floorinToiletScene
    this.toiletFloor = new anim.Line(0, 190, 800, 190);

    //pepe in toilet
    this.pepeToiletTop = new anim.cubicBezierSpline(
      508,
      364,
      508,
      461,
      654,
      461,
      654,
      364
    );
    this.pepeToiletBottom = new anim.cubicBezierSpline(
      508,
      364,
      508,
      267,
      654,
      267,
      654,
      364
    );

    //pepe eyes
    this.pepeLeftEyeTop = new anim.cubicBezierSpline(
      593,
      389,
      593,
      420,
      577,
      420,
      577,
      389
    );
    this.pepeLeftEyeBottom = new anim.cubicBezierSpline(
      593,
      389,
      593,
      358,
      577,
      358,
      577,
      389
    );

    this.pepeRightEyeTop = new anim.cubicBezierSpline(
      560,
      389,
      560,
      420,
      544,
      420,
      544,
      389
    );
    this.pepeRightEyeBottom = new anim.cubicBezierSpline(
      560,
      389,
      560,
      358,
      544,
      358,
      544,
      389
    );

    //pepe hand
    this.pepeHandTop = new anim.cubicBezierSpline(
      622,
      337,
      622,
      360,
      587,
      360,
      587,
      337
    );
    this.pepeHandBottom = new anim.cubicBezierSpline(
      622,
      337,
      622,
      314,
      587,
      314,
      587,
      337
    );
  }

  addKeyframe(object, endAt, transform, moveFunc, ...args) {
    super.preventStart(
      ToiletScene.START_AT,
      object,
      endAt,
      transform,
      moveFunc,
      ...args
    );
    object.addKeyframe(
      ToiletScene.START_AT + endAt,
      transform,
      moveFunc,
      ...args
    );
  }

  makeAnimate() {
    this.addKeyframe(
      this.pepeHandBottom,
      1000,
      anim.translation,
      fn.SIGMOID,
      -200,
      -200
    );
  }
}
