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
    this.pepebodytop = new anim.cubicBezierSpline(
      ...[400, 280],
      ...[400, 480],
      ...[700, 480],
      ...[700, 280]
    );
    this.pepebodybottom = new anim.cubicBezierSpline(
      ...[400, 280],
      ...[400, 80],
      ...[700, 80],
      ...[700, 280]
    );
    // #endregion

    // #region pepeEye
    //pepe left eye 15 30 px, c = (480,275) 40
    this.pepelefteyetop = new anim.cubicBezierSpline(
      ...[465, 230],
      ...[465, 270],
      ...[495, 270],
      ...[495, 230]
    );
    this.pepelefteyebottom = new anim.cubicBezierSpline(
      ...[465, 230],
      ...[465, 190],
      ...[495, 190],
      ...[495, 230]
    );

    //pepe right eye 15 30 px, c = (550,285) 40
    this.peperighteyetop = new anim.cubicBezierSpline(
      ...[535, 230],
      ...[535, 270],
      ...[565, 270],
      ...[565, 230]
    );
    this.peperightteyebottom = new anim.cubicBezierSpline(
      ...[535, 230],
      ...[535, 190],
      ...[565, 190],
      ...[565, 230]
    );
    // #endregion

    // #region janitorBody
    //janitor body 150 px, c = (170,280)
    this.janitorbodytop = new anim.cubicBezierSpline(
      ...[50, 280],
      ...[50, 480],
      ...[350, 480],
      ...[350, 280]
    );
    this.janitorbodybottom = new anim.cubicBezierSpline(
      ...[50, 280],
      ...[50, 80],
      ...[350, 80],
      ...[350, 280]
    );
    // #endregion

    // #region janitorEye
    //janitor left eye 15 30 px, c = (165,245) 40
    this.janitorlefteyetop = new anim.cubicBezierSpline(
      ...[150, 245],
      ...[150, 285],
      ...[180, 285],
      ...[180, 245]
    );
    this.janitorlefteyebottom = new anim.cubicBezierSpline(
      ...[150, 245],
      ...[150, 205],
      ...[180, 205],
      ...[180, 245]
    );

    //janitor right eye 15 30 px, c = (250,250) 40
    this.janitorrighteyetop = new anim.cubicBezierSpline(
      ...[235, 250],
      ...[235, 290],
      ...[265, 290],
      ...[265, 250]
    );
    this.janitorrightteyebottom = new anim.cubicBezierSpline(
      ...[235, 250],
      ...[235, 210],
      ...[265, 210],
      ...[265, 250]
    );
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
    //move up pepe eye
    this.addKeyframe(
      this.pepelefteyetop,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      80
    );

    this.addKeyframe(
      this.pepelefteyebottom,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      80
    );
    this.addKeyframe(
      this.peperighteyetop,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      80
    );
    this.addKeyframe(
      this.peperightteyebottom,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      80
    );

    // move up janitor eye
    this.addKeyframe(
      this.janitorlefteyebottom,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      80
    );

    this.addKeyframe(
      this.janitorlefteyetop,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      80
    );
    this.addKeyframe(
      this.janitorrighteyetop,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      80
    );
    this.addKeyframe(
      this.janitorrightteyebottom,
      5000,
      anim.translation,
      fn.SIGMOID,
      0,
      80
    );

    //move left pepe eye
    this.addKeyframe(
      this.pepelefteyetop,
      10000,
      anim.translation,
      fn.SIGMOID,
      -40,
      0
    );

    this.addKeyframe(
      this.pepelefteyebottom,
      10000,
      anim.translation,
      fn.SIGMOID,
      -40,
      0
    );
    this.addKeyframe(
      this.peperighteyetop,
      10000,
      anim.translation,
      fn.SIGMOID,
      -40,
      0
    );
    this.addKeyframe(
      this.peperightteyebottom,
      10000,
      anim.translation,
      fn.SIGMOID,
      -40,
      0
    );

    // move right janitor eye
    this.addKeyframe(
      this.janitorlefteyebottom,
      10000,
      anim.translation,
      fn.SIGMOID,
      40,
      0
    );

    this.addKeyframe(
      this.janitorlefteyetop,
      10000,
      anim.translation,
      fn.SIGMOID,
      40,
      0
    );
    this.addKeyframe(
      this.janitorrighteyetop,
      10000,
      anim.translation,
      fn.SIGMOID,
      40,
      0
    );
    this.addKeyframe(
      this.janitorrightteyebottom,
      10000,
      anim.translation,
      fn.SIGMOID,
      40,
      0
    );
    // #endregion
  }
}
