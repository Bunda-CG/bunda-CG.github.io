import * as anim from "./helperTools/animation.js";
import * as fn from "./function.js";
import { Scene } from "./scenes.js";

export class TakingScene extends Scene {
  static START_AT = 0;
  static END_AT = 300000;
  constructor() {
    super();
    this.startAt = TakingScene.START_AT;
    this.endAt = TakingScene.END_AT;
    // #region obj
    // #region toiletSeat
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
      ...[541, 190],
      ...[530, 196],
      ...[504, 228],
      ...[503, 248]
    );
    this.toiletSeatBottomRight = new anim.cubicBezierSpline(
      ...[621, 190],
      ...[632, 196],
      ...[664, 228],
      ...[659, 248]
    );
    // #endregion

    // #region path
    this.path = new anim.cubicBezierSpline(
      ...[487, 438],
      ...[290, 293],
      ...[449, 102],
      ...[567, 431]
    );
    // #endregion

    // #region floor
    this.toiletFloor = new anim.Line(0, 190, 800, 190);
    // #endregion

    // #region pepeBody
    this.pepeToiletTop = new anim.cubicBezierSpline(
      ...[508, 364],
      ...[508, 461],
      ...[654, 461],
      ...[654, 364]
    );
    this.pepeToiletBottom = new anim.cubicBezierSpline(
      ...[508, 364],
      ...[508, 267],
      ...[654, 267],
      ...[654, 364]
    );
    // #endregion

    // #region pepeEyes
    this.pepeLeftEyeTop = new anim.cubicBezierSpline(
      ...[593, 389],
      ...[593, 420],
      ...[577, 420],
      ...[577, 389]
    );
    this.pepeLeftEyeBottom = new anim.cubicBezierSpline(
      ...[593, 389],
      ...[593, 358],
      ...[577, 358],
      ...[577, 389]
    );

    this.pepeRightEyeTop = new anim.cubicBezierSpline(
      ...[560, 389],
      ...[560, 420],
      ...[544, 420],
      ...[544, 389]
    );
    this.pepeRightEyeBottom = new anim.cubicBezierSpline(
      ...[560, 389],
      ...[560, 358],
      ...[544, 358],
      ...[544, 389]
    );
    // #endregion

    // #region pepeHand
    this.pepeHandTop = new anim.cubicBezierSpline(
      ...[622, 337],
      ...[622, 360],
      ...[587, 360],
      ...[587, 337]
    );
    this.pepeHandBottom = new anim.cubicBezierSpline(
      ...[622, 337],
      ...[622, 314],
      ...[587, 314],
      ...[587, 337]
    );
    // #endregion
    // #endregion
  }

  addKeyframe(object, endAt, transform, moveFunc, ...args) {
    super.preventStart(
      TakingScene.START_AT,
      object,
      endAt,
      transform,
      moveFunc,
      ...args
    );
    object.addKeyframe(
      TakingScene.START_AT + endAt,
      transform,
      moveFunc,
      ...args
    );
  }

  makeAnimate() {
    // #region animate

    // #region toilet
    // #region ping
    this.addKeyframe(this.toiletSeatPing, 100, anim.hide, fn.LINEAR, 656, -200);
    this.addKeyframe(
      this.toiletSeatPing,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      491
    );
    // #endregion

    // #region seat
    this.addKeyframe(this.toiletSeatTop, 100, anim.hide, fn.LINEAR, 490, -242);
    this.addKeyframe(
      this.toiletSeatTop,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      491
    );
    // #endregion

    // #region support
    this.addKeyframe(
      this.toiletSeatBottomLeft,
      100,
      anim.hide,
      fn.LINEAR,
      542,
      -301
    );
    this.addKeyframe(
      this.toiletSeatBottomLeft,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      491
    );

    this.addKeyframe(
      this.toiletSeatBottomRight,
      100,
      anim.hide,
      fn.LINEAR,
      622,
      -301
    );
    this.addKeyframe(
      this.toiletSeatBottomRight,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      491
    );
    // #endregion
    // #endregion

    // #region floor
    this.addKeyframe(this.toiletFloor, 100, anim.hide, fn.LINEAR, 0, -302);
    this.addKeyframe(
      this.toiletFloor,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      491
    );
    // #endregion

    // #region pepeBody
    // #region top
    this.addKeyframe(this.pepeToiletTop, 100, anim.hide, fn.LINEAR, 508, -127);
    this.addKeyframe(
      this.pepeToiletTop,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      491
    );
    // #endregion

    // #region bottom
    this.addKeyframe(
      this.pepeToiletBottom,
      100,
      anim.hide,
      fn.LINEAR,
      508,
      -127
    );
    this.addKeyframe(
      this.pepeToiletBottom,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      491
    );
    // #endregion
    // #endregion

    // #region eyes
    // #region leftEye
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      100,
      anim.hide,
      fn.LINEAR,
      545,
      -103
    );
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      491
    );

    this.addKeyframe(this.pepeLeftEyeTop, 100, anim.hide, fn.LINEAR, 545, -103);
    this.addKeyframe(
      this.pepeLeftEyeTop,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      491
    );
    // #endregion

    // #region rightEye
    this.addKeyframe(
      this.pepeRightEyeBottom,
      100,
      anim.hide,
      fn.LINEAR,
      585,
      -103
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      491
    );

    this.addKeyframe(
      this.pepeRightEyeTop,
      100,
      anim.hide,
      fn.LINEAR,
      585,
      -103
    );
    this.addKeyframe(
      this.pepeRightEyeTop,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      491
    );
    // #endregion
    // #endregion

    // #region pepeHand
    // #region handBottom
    this.addKeyframe(this.pepeHandBottom, 100, anim.hide, fn.LINEAR, 622, -127);
    this.addKeyframe(
      this.pepeHandBottom,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      491
    );
    // #endregion

    // #region handTop
    this.addKeyframe(this.pepeHandTop, 100, anim.hide, fn.LINEAR, 622, -127);
    this.addKeyframe(
      this.pepeHandTop,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      491
    );
    // #endregion
    // #endregion

    // #region path
    this.addKeyframe(this.path, 100, anim.hide, fn.LINEAR, 508, -127);
    // #endregion
    // #endregion
  }
}
