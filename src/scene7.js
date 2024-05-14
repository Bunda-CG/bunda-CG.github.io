import * as anim from "./helperTools/animation.js";
import * as fn from "./function.js";
import { Scene } from "./scenes.js";

export class StareScene extends Scene {
  static START_AT = 0;
  static END_AT = 999999999;
  constructor() {
    super();
    this.startAt = StareScene.START_AT;
    this.endAt = StareScene.END_AT;
    // #region obj
    // #region pepeBody
    //pepe body 150 px, c = (550,325)
    this.pepeBodyTop = new anim.cubicBezierSpline(
      ...[400, 280],
      ...[400, 480],
      ...[700, 480],
      ...[700, 280]
    );
    this.pepeBodyBottom = new anim.cubicBezierSpline(
      ...[400, 280],
      ...[400, 80],
      ...[700, 80],
      ...[700, 280]
    );
    // #endregion

    // #region pepeEye
    //pepe left eye 15 30 px, c = (480,275) 40
    this.pepeLeftEyeTop = new anim.cubicBezierSpline(
      ...[465, 230],
      ...[465, 270],
      ...[495, 270],
      ...[495, 230]
    );
    this.pepeLeftEyeBottom = new anim.cubicBezierSpline(
      ...[465, 230],
      ...[465, 190],
      ...[495, 190],
      ...[495, 230]
    );

    //pepe right eye 15 30 px, c = (550,285) 40
    this.pepeRightEyeTop = new anim.cubicBezierSpline(
      ...[535, 230],
      ...[535, 270],
      ...[565, 270],
      ...[565, 230]
    );
    this.pepeRightEyeBottom = new anim.cubicBezierSpline(
      ...[535, 230],
      ...[535, 190],
      ...[565, 190],
      ...[565, 230]
    );
    // #endregion

    // #region janitorBody
    //janitor body 150 px, c = (170,280)
    this.janitorBodyTop = new anim.cubicBezierSpline(
      ...[50, 280],
      ...[50, 480],
      ...[350, 480],
      ...[350, 280]
    );
    this.janitorBodyBottom = new anim.cubicBezierSpline(
      ...[50, 280],
      ...[50, 80],
      ...[350, 80],
      ...[350, 280]
    );
    // #endregion

    // #region janitorEye
    //janitor left eye 15 30 px, c = (165,245) 40
    this.janitorLeftEyeTop = new anim.cubicBezierSpline(
      ...[150, 245],
      ...[150, 285],
      ...[180, 285],
      ...[180, 245]
    );
    this.janitorLeftEyeBottom = new anim.cubicBezierSpline(
      ...[150, 245],
      ...[150, 205],
      ...[180, 205],
      ...[180, 245]
    );

    //janitor right eye 15 30 px, c = (250,250) 40
    this.janitorRightEyeTop = new anim.cubicBezierSpline(
      ...[235, 250],
      ...[235, 290],
      ...[265, 290],
      ...[265, 250]
    );
    this.janitorRightEyeBottom = new anim.cubicBezierSpline(
      ...[235, 250],
      ...[235, 210],
      ...[265, 210],
      ...[265, 250]
    );
    // #endregion

    // #region seat
    this.seat = new anim.splineChain(
      ...[100, 0],
      ...[140, 25],
      ...[200, 50],
      ...[373, 50]
    );
    this.seat.addPoint(700, 0);
    this.pattern = new anim.splineChain(
      ...[150, 0],
      ...[150, 10],
      ...[160, 10],
      ...[165, 5]
    );
    this.pattern.addPoint(...[190, 13], ...[171, 6]);
    this.pattern.addPoint(...[219, 3], ...[200, 26]);
    this.pattern.addPoint(...[275, 18], ...[238, 11]);
    this.pattern.addPoint(...[374, 19], ...[321, 38]);
    this.pattern.addPoint(...[417, 18], ...[399, 32]);
    this.pattern.addPoint(...[486, 14], ...[456, 31]);
    this.pattern.addPoint(...[572, 18], ...[553, 46]);
    this.pattern.addPoint(...[599, 0], ...[583, -2]);
    // #endregion
    // #endregion
  }

  addKeyframe(object, endAt, transform, moveFunc, ...args) {
    super.preventStart(
      StareScene.START_AT,
      object,
      endAt,
      transform,
      moveFunc,
      ...args
    );
    object.addKeyframe(
      StareScene.START_AT + endAt,
      transform,
      moveFunc,
      ...args
    );
  }

  makeAnimate() {
    // #region anim

    // #region eyesUp
    // #region pepeEyes
    this.addKeyframe(
      this.pepeLeftEyeTop,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      80
    );
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      80
    );

    this.addKeyframe(
      this.pepeRightEyeTop,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      80
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      80
    );
    // #endregion

    // #region janitorEyes
    this.addKeyframe(
      this.janitorLeftEyeBottom,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      80
    );
    this.addKeyframe(
      this.janitorLeftEyeTop,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      80
    );

    this.addKeyframe(
      this.janitorRightEyeTop,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      80
    );
    this.addKeyframe(
      this.janitorRightEyeBottom,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      80
    );
    // #endregion
    // #endregion

    // #region eyesStare
    // #region pepeEyes
    this.addKeyframe(
      this.pepeLeftEyeTop,
      10000,
      anim.translation,
      fn.SIGMOID,
      -40,
      0
    );

    this.addKeyframe(
      this.pepeLeftEyeBottom,
      10000,
      anim.translation,
      fn.SIGMOID,
      -40,
      0
    );

    this.addKeyframe(
      this.pepeRightEyeTop,
      10000,
      anim.translation,
      fn.SIGMOID,
      -40,
      0
    );

    this.addKeyframe(
      this.pepeRightEyeBottom,
      10000,
      anim.translation,
      fn.SIGMOID,
      -40,
      0
    );
    // #endregion

    // #region janitorEyes
    this.addKeyframe(
      this.janitorLeftEyeBottom,
      10000,
      anim.translation,
      fn.SIGMOID,
      40,
      0
    );

    this.addKeyframe(
      this.janitorLeftEyeTop,
      10000,
      anim.translation,
      fn.SIGMOID,
      40,
      0
    );

    this.addKeyframe(
      this.janitorRightEyeTop,
      10000,
      anim.translation,
      fn.SIGMOID,
      40,
      0
    );

    this.addKeyframe(
      this.janitorRightEyeBottom,
      10000,
      anim.translation,
      fn.SIGMOID,
      40,
      0
    );
    // #endregion
    // #endregion

    // #region pepeClose
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      10500,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.1,
      473,
      310
    );
    this.addKeyframe(
      this.pepeLeftEyeTop,
      10500,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.1,
      473,
      310
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      10500,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.1,
      473,
      310
    );
    this.addKeyframe(
      this.pepeRightEyeTop,
      10500,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.1,
      473,
      310
    );
    // #endregion

    // #region pepeOpen
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      11000,
      anim.scaling,
      fn.SIGMOID,
      1,
      10,
      473,
      310
    );
    this.addKeyframe(
      this.pepeLeftEyeTop,
      11000,
      anim.scaling,
      fn.SIGMOID,
      1,
      10,
      473,
      310
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      11000,
      anim.scaling,
      fn.SIGMOID,
      1,
      10,
      473,
      310
    );
    this.addKeyframe(
      this.pepeRightEyeTop,
      11000,
      anim.scaling,
      fn.SIGMOID,
      1,
      10,
      473,
      310
    );
    // #endregion

    // #region pepeClose
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      11500,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.1,
      473,
      310
    );
    this.addKeyframe(
      this.pepeLeftEyeTop,
      11500,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.1,
      473,
      310
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      11500,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.1,
      473,
      310
    );
    this.addKeyframe(
      this.pepeRightEyeTop,
      11500,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.1,
      473,
      310
    );
    // #endregion

    // #region pepeOpen
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      12000,
      anim.scaling,
      fn.SIGMOID,
      1,
      10,
      473,
      310
    );
    this.addKeyframe(
      this.pepeLeftEyeTop,
      12000,
      anim.scaling,
      fn.SIGMOID,
      1,
      10,
      473,
      310
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      12000,
      anim.scaling,
      fn.SIGMOID,
      1,
      10,
      473,
      310
    );
    this.addKeyframe(
      this.pepeRightEyeTop,
      12000,
      anim.scaling,
      fn.SIGMOID,
      1,
      10,
      473,
      310
    );
    // #endregion

    // #region janitorStare
    this.addKeyframe(
      this.janitorLeftEyeBottom,
      12000,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.1,
      247,
      329
    );
    this.addKeyframe(
      this.janitorLeftEyeTop,
      12000,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.1,
      247,
      329
    );
    this.addKeyframe(
      this.janitorRightEyeBottom,
      12000,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.1,
      247,
      329
    );
    this.addKeyframe(
      this.janitorRightEyeTop,
      12000,
      anim.scaling,
      fn.SIGMOID,
      1,
      0.1,
      247,
      329
    );
    // #endregion

    // #region pepeLookRight
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      12500,
      anim.translation,
      fn.SIGMOID,
      149,
      0
    );
    this.addKeyframe(
      this.pepeLeftEyeTop,
      12500,
      anim.translation,
      fn.SIGMOID,
      149,
      0
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      12500,
      anim.translation,
      fn.SIGMOID,
      149,
      0
    );
    this.addKeyframe(
      this.pepeRightEyeTop,
      12500,
      anim.translation,
      fn.SIGMOID,
      149,
      0
    );
    // #endregion

    // #region pepeLookLeft
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      13000,
      anim.translation,
      fn.SIGMOID,
      -149,
      0
    );
    this.addKeyframe(
      this.pepeLeftEyeTop,
      13000,
      anim.translation,
      fn.SIGMOID,
      -149,
      0
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      13000,
      anim.translation,
      fn.SIGMOID,
      -149,
      0
    );
    this.addKeyframe(
      this.pepeRightEyeTop,
      13000,
      anim.translation,
      fn.SIGMOID,
      -149,
      0
    );
    // #endregion

    // #region pepeRotateEyes
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      17000,
      anim.rotation,
      fn.SIGMOID,
      -2160,
      473,
      299
    );
    this.addKeyframe(
      this.pepeLeftEyeTop,
      17000,
      anim.rotation,
      fn.SIGMOID,
      -2160,
      473,
      299
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      17000,
      anim.rotation,
      fn.SIGMOID,
      -2160,
      473,
      299
    );
    this.addKeyframe(
      this.pepeRightEyeTop,
      17000,
      anim.rotation,
      fn.SIGMOID,
      -2160,
      473,
      299
    );
    // #endregion

    // #region pepeShrinkEyes
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      18000,
      anim.scaling,
      fn.SIGMOID,
      0.3,
      0.3,
      474,
      298
    );
    this.addKeyframe(
      this.pepeLeftEyeTop,
      18000,
      anim.scaling,
      fn.SIGMOID,
      0.3,
      0.3,
      474,
      298
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      18000,
      anim.scaling,
      fn.SIGMOID,
      0.3,
      0.3,
      474,
      298
    );
    this.addKeyframe(
      this.pepeRightEyeTop,
      18000,
      anim.scaling,
      fn.SIGMOID,
      0.3,
      0.3,
      474,
      298
    );
    // #endregion
    // #endregion
  }
}
