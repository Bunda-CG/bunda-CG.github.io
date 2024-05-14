import * as anim from "./helperTools/animation.js";
import * as fn from "./function.js";
import { Scene } from "./scenes.js";
export class walkScene extends Scene {
  static START_AT = 47000;
  static END_AT = 54000;
  constructor() {
    super();
    this.startAt = walkScene.START_AT;
    this.endAt = walkScene.END_AT;
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

    //                                p0    p1     p2     p3
    // const condMtx = math.matrix([[197], [290], [449], [567]]);
    // const condMty = math.matrix([[118], [293], [102], [431]]);
    /*const p0 = [487, 438];
    const p1 = [290, 293];
    const p2 = [449, 102];
    const p3 = [567, 431];
    this.path = new anim.cubicBezierSpline(...p0, ...p1, ...p2, ...p3);*/

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

    //pepe in toilet body
    this.pepeToiletTop = new anim.cubicBezierSpline(
      308,
      264,
      308,
      361,
      454,
      361,
      454,
      264
    );
    this.pepeToiletBottom = new anim.cubicBezierSpline(
      308,
      264,
      308,
      167,
      454,
      167,
      454,
      264
    );

    //pepe eyes
    this.pepeLeftEyeTop = new anim.cubicBezierSpline(
      393,
      299,
      393,
      330,
      377,
      330,
      377,
      299
    );
    this.pepeLeftEyeBottom = new anim.cubicBezierSpline(
      393,
      299,
      393,
      268,
      377,
      268,
      377,
      299
    );

    this.pepeRightEyeTop = new anim.cubicBezierSpline(
      360,
      299,
      360,
      330,
      344,
      330,
      344,
      299
    );
    this.pepeRightEyeBottom = new anim.cubicBezierSpline(
      360,
      299,
      360,
      268,
      344,
      268,
      344,
      299
    );

    //pepe hand
    this.pepeHandTop = new anim.cubicBezierSpline(
      422,
      237,
      422,
      260,
      387,
      260,
      387,
      237
    );
    this.pepeHandBottom = new anim.cubicBezierSpline(
      422,
      237,
      422,
      214,
      387,
      214,
      387,
      237
    );
  }

  addKeyframe(object, endAt, transform, moveFunc, ...args) {
    super.preventStart(
      walkScene.START_AT,
      object,
      endAt,
      transform,
      moveFunc,
      ...args
    );
    object.addKeyframe(
      walkScene.START_AT + endAt,
      transform,
      moveFunc,
      ...args
    );
  }

  makeAnimate() {
    //move down pepe eye
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      7000,
      anim.translation,
      fn.SIGMOID,
      -460,
      0
    );

    this.addKeyframe(
      this.pepeLeftEyeTop,
      7000,
      anim.translation,
      fn.SIGMOID,
      -460,
      0
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      7000,
      anim.translation,
      fn.SIGMOID,
      -460,
      0
    );
    this.addKeyframe(
      this.pepeRightEyeTop,
      7000,
      anim.translation,
      fn.SIGMOID,
      -460,
      0
    );
    this.addKeyframe(
      this.pepeHandBottom,
      7000,
      anim.translation,
      fn.SIGMOID,
      -460,
      0
    );
    this.addKeyframe(
      this.pepeHandTop,
      7000,
      anim.translation,
      fn.SIGMOID,
      -460,
      0
    );
    this.addKeyframe(
      this.pepeToiletTop,
      7000,
      anim.translation,
      fn.SIGMOID,
      -460,
      0
    );
    this.addKeyframe(
      this.pepeToiletBottom,
      7000,
      anim.translation,
      fn.SIGMOID,
      -460,
      0
    );
  }
}
