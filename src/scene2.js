import * as anim from "./helperTools/animation.js";
import * as fn from "./function.js";
import { Scene } from "./scenes.js";

export class FecusScene extends Scene {
  static START_AT = 28000;
  static END_AT = 47000;
  constructor() {
    super();
    this.startAt = FecusScene.START_AT;
    this.endAt = FecusScene.END_AT;

    //outer toilet : circle radius = 250 px, c = (400,300)
    this.outerToiletTop = new anim.cubicBezierSpline(
      150,
      300,
      150,
      633,
      650,
      633,
      650,
      300
    );

    this.outerToiletBottom = new anim.cubicBezierSpline(
      150,
      300,
      150,
      -33,
      650,
      -33,
      650,
      300
    );
    //inner toilet : circle radius = 200 px, c = (400,300)
    this.innerToiletTop = new anim.cubicBezierSpline(
      200,
      300,
      200,
      567,
      600,
      567,
      600,
      300
    );

    this.innerToiletBottom = new anim.cubicBezierSpline(
      200,
      300,
      200,
      33,
      600,
      33,
      600,
      300
    );

    //water surface line : circle radius = 100 px, c = (400,300)
    this.innerWaterTop = new anim.cubicBezierSpline(
      300,
      300,
      300,
      433,
      500,
      433,
      500,
      300
    );

    this.innerWaterBottom = new anim.cubicBezierSpline(
      300,
      300,
      300,
      167,
      500,
      167,
      500,
      300
    );

    //fecus no.1
    this.fecus1Top = new anim.cubicBezierSpline(
      386,
      301,
      343,
      402,
      451,
      430,
      465,
      425
    );

    this.fecus1Bottom = new anim.cubicBezierSpline(
      386,
      301,
      400,
      450,
      478,
      350,
      465,
      425
    );

    //fecus no.2
    this.fecus2Top = new anim.cubicBezierSpline(
      340,
      200,
      357,
      317,
      426,
      341,
      510,
      250
    );

    this.fecus2BottomLeft = new anim.cubicBezierSpline(
      416,
      265,
      390,
      245,
      355,
      190,
      340,
      200
    );

    this.fecus2BottomRight = new anim.cubicBezierSpline(
      416,
      265,
      435,
      270,
      530,
      215,
      510,
      250
    );

    //fecus no.3
    this.fecus3 = new anim.incompletepolygon();
    this.fecus3.addPoint(360, 300);
    this.fecus3.addPoint(330, 270);
    this.fecus3.addPoint(310, 317);
    this.fecus3.addPoint(338, 380);
    this.fecus3.addPoint(370, 330);
    this.fecus3.addPoint(360, 300);

    //water wave 1
    this.wave1 = new anim.cubicBezierSpline(
      348,
      321,
      341,
      353,
      400,
      387,
      420,
      370
    );

    //water wave 2
    this.wave2 = new anim.cubicBezierSpline(
      460,
      325,
      450,
      280,
      470,
      283,
      400,
      230
    );
  }

  addKeyframe(object, endAt, transform, moveFunc, ...args) {
    super.preventStart(
      FecusScene.START_AT,
      object,
      endAt,
      transform,
      moveFunc,
      ...args
    );
    object.addKeyframe(
      FecusScene.START_AT + endAt,
      transform,
      moveFunc,
      ...args
    );
  }

  makeAnimate() {
    this.addKeyframe(
      this.wave1,
      20000,
      anim.rotation,
      fn.SIGMOID,
      -1600,
      400,
      300
    );
    this.addKeyframe(
      this.wave2,
      20000,
      anim.rotation,
      fn.SIGMOID,
      -1600,
      400,
      300
    );
  }
}
