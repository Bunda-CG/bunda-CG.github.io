import * as anim from "./helperTools/animation.js";
import * as fn from "./function.js";
import { Scene } from "./scenes.js";
export class walkScene extends Scene {
    static START_AT = 0;
    static END_AT = 30000;
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
      593,399,
      593,430,
      577,430,
      577,399
    );
    this.pepeLeftEyeBottom = new anim.cubicBezierSpline(
      593,399,
      593,368,
      577,368,
      577,399
    );

    this.pepeRightEyeTop = new anim.cubicBezierSpline(
      560,399,
      560,430,
      544,430,
      544,399
    );
    this.pepeRightEyeBottom = new anim.cubicBezierSpline(
      560,399,
      560,368,
      544,368,
      544,399
    );

    //pepe hand
    this.pepeHandTop = new anim.cubicBezierSpline(
      642,337,
      642,360,
      607,360,
      607,337
    );
    this.pepeHandBottom = new anim.cubicBezierSpline(
      642,337,
      642,314,
      607,314,
      607,337
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
        3000,
        anim.translation,
        fn.SIGMOID,
        0,
        -50
      );
      
      this.addKeyframe(
        this.pepeLeftEyeTop,
        3000,
        anim.translation,
        fn.SIGMOID,
        0,
        -50
      );
      this.addKeyframe(
        this.pepeRightEyeBottom,
        3000,
        anim.translation,
        fn.SIGMOID,
        0,
        -50
    );
    this.addKeyframe(
        this.pepeRightEyeTop,
        3000,
        anim.translation,
        fn.SIGMOID,
        0,
        -50
    );
    this.addKeyframe(
        this.pepeHandBottom,
        3000,
        anim.translation,
        fn.SIGMOID,
        0,
        30
    );
    this.addKeyframe(
        this.pepeHandTop,
        3000,
        anim.translation,
        fn.SIGMOID,
        0,
        30
    );
    this.addKeyframe(
      this.pepeToiletTop,
      3000,
      anim.translation,
      fn.SIGMOID,
      0,
      10
    );
    this.addKeyframe(
      this.pepeToiletBottom,
      3000,
      anim.translation,
      fn.SIGMOID,
      0,
      10
    );

    //jump

    //move down pepe eye
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      6000,
      anim.translation,
      fn.LINEAR,
      -160,
      -10
    );
    
    this.addKeyframe(
      this.pepeLeftEyeTop,
      6000,
      anim.translation,
      fn.LINEAR,
      -160,
      -10
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      6000,
      anim.translation,
      fn.LINEAR,
      -160,
      -10
    );
    this.addKeyframe(
      this.pepeRightEyeTop,
      6000,
      anim.translation,
      fn.LINEAR,
      -160,
      -10
    );
    this.addKeyframe(
      this.pepeHandBottom,
      6000,
      anim.translation,
      fn.LINEAR,
      -160,
      -10
    );
    this.addKeyframe(
      this.pepeHandTop,
      6000,
      anim.translation,
      fn.LINEAR,
      -160,
      -10
    );
    this.addKeyframe(
      this.pepeToiletTop,
      6000,
      anim.translation,
      fn.LINEAR,
      -160,
      -10
    );
    this.addKeyframe(
      this.pepeToiletBottom,
      6000,
      anim.translation,
      fn.LINEAR,
      -160,
      -10,
    );

//

    this.addKeyframe(
      this.pepeLeftEyeBottom,
      8000,
      anim.translation,
      fn.SIGMOID,
      -90,
      -100
    );
    
    this.addKeyframe(
      this.pepeLeftEyeTop,
      8000,
      anim.translation,
      fn.SIGMOID,
      -90,
      -100
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      8000,
      anim.translation,
      fn.SIGMOID,
      -90,
      -100
    );
    this.addKeyframe(
      this.pepeRightEyeTop,
      8000,
      anim.translation,
      fn.SIGMOID,
      -90,
      -100
    );
    this.addKeyframe(
      this.pepeHandBottom,
      8000,
      anim.translation,
      fn.SIGMOID,
      -90,
      -100
    );
    this.addKeyframe(
      this.pepeHandTop,
      8000,
      anim.translation,
      fn.SIGMOID,
      -90,
      -100
    );
    this.addKeyframe(
      this.pepeToiletTop,
      8000,
      anim.translation,
      fn.SIGMOID,
      -90,
      -100
    );
    this.addKeyframe(
      this.pepeToiletBottom,
      8000,
      anim.translation,
      fn.SIGMOID,
      -90,
      -100
    );

    // stand
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      10000,
      anim.translation,
      fn.SIGMOID,
      0,
      40
    );
    
    this.addKeyframe(
      this.pepeLeftEyeTop,
      10000,
      anim.translation,
      fn.SIGMOID,
      0,
      40
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      10000,
      anim.translation,
      fn.SIGMOID,
      0,
      40
    );
    this.addKeyframe(
      this.pepeRightEyeTop,
      10000,
      anim.translation,
      fn.SIGMOID,
      0,
      40
    );
    this.addKeyframe(
      this.pepeHandBottom,
      10000,
      anim.translation,
      fn.SIGMOID,
      0,
      -20
    );
    this.addKeyframe(
      this.pepeHandTop,
      10000,
      anim.translation,
      fn.SIGMOID,
      0,
      -20
    );
    this.addKeyframe(
      this.pepeToiletTop,
      10000,
      anim.translation,
      fn.SIGMOID,
      0,
      0
    );
    this.addKeyframe(
      this.pepeToiletBottom,
      10000,
      anim.translation,
      fn.SIGMOID,
      0,
      0
    );

    //walk
    // stand
    this.addKeyframe(
      this.pepeLeftEyeBottom,
      15000,
      anim.translation,
      fn.SIGMOID,
      -410,
      0
    );
    
    this.addKeyframe(
      this.pepeLeftEyeTop,
      15000,
      anim.translation,
      fn.SIGMOID,
      -410,
      0
    );
    this.addKeyframe(
      this.pepeRightEyeBottom,
      15000,
      anim.translation,
      fn.SIGMOID,
      -410,
      0
    );
    this.addKeyframe(
      this.pepeRightEyeTop,
      15000,
      anim.translation,
      fn.SIGMOID,
      -410,
      0
    );
    this.addKeyframe(
      this.pepeHandBottom,
      15000,
      anim.translation,
      fn.SIGMOID,
      -410,
      0
    );
    this.addKeyframe(
      this.pepeHandTop,
      15000,
      anim.translation,
      fn.SIGMOID,
      -410,
      0
    );
    this.addKeyframe(
      this.pepeToiletTop,
      15000,
      anim.translation,
      fn.SIGMOID,
      -410,
      0
    );
    this.addKeyframe(
      this.pepeToiletBottom,
      15000,
      anim.translation,
      fn.SIGMOID,
      -410,
      0
    );
  } 
}