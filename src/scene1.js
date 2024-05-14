import * as anim from "./helperTools/animation.js";
import * as fn from "./function.js";
import { Scene } from "./scenes.js";

export class TakingScene extends Scene {
  static START_AT = 0;
  static END_AT = 999999999;
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
    // 626 334
    this.path = new anim.cubicBezierSpline(
      ...[581 + 45, 291 + 43],
      ...[500 + 45, 409 + 43],
      ...[428 + 45, 292 + 43],
      ...[419 + 45, 188 + 43]
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
    this.addKeyframe(this.pepeToiletTop, 12000, anim.stay, fn.LINEAR);
    const bodyJumpX = math.matrix([[508], [427], [355], [346]]);
    const bodyJumpY = math.matrix([[364], [482], [365], [261]]);
    this.addKeyframe(
      this.pepeToiletTop,
      14000,
      anim.splineTranslation,
      fn.SIGMOID,
      bodyJumpX,
      bodyJumpY
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
    this.addKeyframe(this.pepeToiletBottom, 12000, anim.stay, fn.LINEAR);
    this.addKeyframe(
      this.pepeToiletBottom,
      14000,
      anim.splineTranslation,
      fn.SIGMOID,
      bodyJumpX,
      bodyJumpY
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
    this.addKeyframe(this.pepeLeftEyeBottom, 8000, anim.stay, fn.LINEAR);
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      8500,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.5,
      558,
      390
    );
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      8800,
      anim.scaling,
      fn.SIGMOID,
      1,
      2,
      558,
      390
    );
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      9000,
      anim.scaling,
      fn.SIGMOID,
      1,
      1.5,
      558,
      390
    );
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      9200,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.6667,
      558,
      390
    );
    this.addKeyframe(this.pepeLeftEyeBottom, 12000, anim.stay, fn.LINEAR);
    // [546, 384] //start -31 -5
    const leftEyeJumpX = math.matrix([[546], [465], [393], [384]]);
    const leftEyeJumpY = math.matrix([[384], [502], [385], [281]]);
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      14000,
      anim.splineTranslation,
      fn.SIGMOID,
      leftEyeJumpX,
      leftEyeJumpY
    );
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      16000,
      anim.translation,
      fn.SIGMOID,
      50,
      0
    );
    this.addKeyframe(this.pepeLeftEyeBottom, 20000, anim.stay, fn.LINEAR);
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      22000,
      anim.rotation,
      fn.SIGMOID,
      -30,
      446,
      282
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
    this.addKeyframe(this.pepeLeftEyeTop, 8000, anim.stay, fn.LINEAR);
    this.addKeyframe(
      this.pepeLeftEyeTop,
      8500,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.5,
      558,
      390
    );
    this.addKeyframe(
      this.pepeLeftEyeTop,
      8800,
      anim.scaling,
      fn.SIGMOID,
      1,
      2,
      558,
      390
    );
    this.addKeyframe(
      this.pepeLeftEyeTop,
      9000,
      anim.scaling,
      fn.SIGMOID,
      1,
      1.5,
      558,
      390
    );
    this.addKeyframe(
      this.pepeLeftEyeTop,
      9200,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.6667,
      558,
      390
    );
    this.addKeyframe(this.pepeLeftEyeTop, 12000, anim.stay, fn.LINEAR);
    this.addKeyframe(
      this.pepeLeftEyeTop,
      14000,
      anim.splineTranslation,
      fn.SIGMOID,
      leftEyeJumpX,
      leftEyeJumpY
    );
    this.addKeyframe(
      this.pepeLeftEyeTop,
      16000,
      anim.translation,
      fn.SIGMOID,
      50,
      0
    );
    this.addKeyframe(this.pepeLeftEyeTop, 20000, anim.stay, fn.LINEAR);
    this.addKeyframe(
      this.pepeLeftEyeTop,
      22000,
      anim.rotation,
      fn.SIGMOID,
      -30,
      446,
      282
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
    this.addKeyframe(this.pepeRightEyeBottom, 8000, anim.stay, fn.LINEAR);
    this.addKeyframe(
      this.pepeRightEyeBottom,
      8500,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.5,
      558,
      390
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      8800,
      anim.scaling,
      fn.SIGMOID,
      1,
      2,
      558,
      390
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      9000,
      anim.scaling,
      fn.SIGMOID,
      1,
      1.5,
      558,
      390
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      9200,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.6667,
      558,
      390
    );
    this.addKeyframe(this.pepeRightEyeBottom, 12000, anim.stay, fn.LINEAR);
    // [585, 385] //start -8 -4
    const rightEyeJumpX = math.matrix([[585], [504], [432], [423]]);
    const rightEyeJumpY = math.matrix([[385], [503], [386], [282]]);
    this.addKeyframe(
      this.pepeRightEyeBottom,
      14000,
      anim.splineTranslation,
      fn.SIGMOID,
      rightEyeJumpX,
      rightEyeJumpY
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      16000,
      anim.translation,
      fn.SIGMOID,
      50,
      0
    );
    this.addKeyframe(this.pepeRightEyeBottom, 20000, anim.stay, fn.LINEAR);
    this.addKeyframe(
      this.pepeRightEyeBottom,
      22000,
      anim.rotation,
      fn.SIGMOID,
      -30,
      446,
      282
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
    this.addKeyframe(this.pepeRightEyeTop, 8000, anim.stay, fn.LINEAR);
    this.addKeyframe(
      this.pepeRightEyeTop,
      8500,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.5,
      558,
      390
    );
    this.addKeyframe(
      this.pepeRightEyeTop,
      8800,
      anim.scaling,
      fn.SIGMOID,
      1,
      2,
      558,
      390
    );
    this.addKeyframe(
      this.pepeRightEyeTop,
      9000,
      anim.scaling,
      fn.SIGMOID,
      1,
      1.5,
      558,
      390
    );
    this.addKeyframe(
      this.pepeRightEyeTop,
      9200,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.6667,
      558,
      390
    );
    this.addKeyframe(this.pepeRightEyeTop, 12000, anim.stay, fn.LINEAR);
    this.addKeyframe(
      this.pepeRightEyeTop,
      14000,
      anim.splineTranslation,
      fn.SIGMOID,
      rightEyeJumpX,
      rightEyeJumpY
    );
    this.addKeyframe(
      this.pepeRightEyeTop,
      16000,
      anim.translation,
      fn.SIGMOID,
      50,
      0
    );
    this.addKeyframe(this.pepeRightEyeTop, 20000, anim.stay, fn.LINEAR);
    this.addKeyframe(
      this.pepeRightEyeTop,
      22000,
      anim.rotation,
      fn.SIGMOID,
      -30,
      446,
      282
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
    this.addKeyframe(this.pepeHandBottom, 7000, anim.stay, fn.LINEAR);
    this.addKeyframe(
      this.pepeHandBottom,
      8000,
      anim.translation,
      fn.SIGMOID,
      -76,
      -67
    );
    this.addKeyframe(this.pepeHandBottom, 9500, anim.stay, fn.LINEAR);
    this.addKeyframe(
      this.pepeHandBottom,
      11000,
      anim.translation,
      fn.SIGMOID,
      79,
      37
    );
    this.addKeyframe(this.pepeHandBottom, 12000, anim.stay, fn.LINEAR);
    const handJumpX = math.matrix([[626], [545], [473], [464]]);
    const handJumpY = math.matrix([[334], [452], [335], [231]]);
    this.addKeyframe(
      this.pepeHandBottom,
      14000,
      anim.splineTranslation,
      fn.SIGMOID,
      handJumpX,
      handJumpY
    );
    this.addKeyframe(
      this.pepeHandBottom,
      16000,
      anim.translation,
      fn.SIGMOID,
      -57,
      0
    );
    this.addKeyframe(
      this.pepeHandBottom,
      17000,
      anim.shearx,
      fn.SIGMOID,
      1.01,
      230
    );
    // to 643 481 from 408 231
    this.addKeyframe(
      this.pepeHandBottom,
      19000,
      anim.translation,
      fn.SIGMOID,
      235,
      250
    );
    // -45 622 481
    this.addKeyframe(
      this.pepeHandBottom,
      20000,
      anim.rotation,
      fn.SIGMOID,
      -45,
      622,
      481
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
    this.addKeyframe(this.pepeHandTop, 7000, anim.stay, fn.LINEAR);
    this.addKeyframe(
      this.pepeHandTop,
      8000,
      anim.translation,
      fn.SIGMOID,
      -76,
      -67
    );
    this.addKeyframe(this.pepeHandTop, 9500, anim.stay, fn.LINEAR);
    this.addKeyframe(
      this.pepeHandTop,
      11000,
      anim.translation,
      fn.SIGMOID,
      79,
      37
    );
    this.addKeyframe(this.pepeHandTop, 12000, anim.stay, fn.LINEAR);
    this.addKeyframe(
      this.pepeHandTop,
      14000,
      anim.splineTranslation,
      fn.SIGMOID,
      handJumpX,
      handJumpY
    );
    this.addKeyframe(
      this.pepeHandTop,
      16000,
      anim.translation,
      fn.SIGMOID,
      -57,
      0
    );
    this.addKeyframe(
      this.pepeHandTop,
      17000,
      anim.shearx,
      fn.SIGMOID,
      1.01,
      230
    );
    // to 643 481 from 408 231
    this.addKeyframe(
      this.pepeHandTop,
      19000,
      anim.translation,
      fn.SIGMOID,
      235,
      250
    );
    // -45 622 481
    this.addKeyframe(
      this.pepeHandTop,
      20000,
      anim.rotation,
      fn.SIGMOID,
      -45,
      622,
      481
    );
    // #endregion
    // #endregion

    // #region path
    // this.addKeyframe(this.path, 100, anim.hide, fn.LINEAR, 508, -127);
    // #endregion
    // #endregion
  }
}
