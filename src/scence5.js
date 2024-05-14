import * as anim from "./helperTools/animation.js";
import * as fn from "./function.js";
import { Scene } from "./scenes.js";
export class walkwithScene extends Scene {
    static START_AT = 0;
    static END_AT = 30000;
    constructor() {
      super();
      this.startAt = walkwithScene.START_AT;
      this.endAt =walkwithScene.END_AT;
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
      -152,264,
      -152,361,
        -6,361,
        -6,264
    );
    this.pepeToiletBottom = new anim.cubicBezierSpline(
      -152,264,
      -152,167,
      -6,167,
      -6,264
    );

    //pepe eyes
    this.pepeLeftEyeTop = new anim.cubicBezierSpline(
      -47,299,
      -47,330,
      -63,330,
      -63,299
    );
    this.pepeLeftEyeBottom = new anim.cubicBezierSpline(
        -47,299,
        -47,268,
      -63,268,
      -63,299
    );

    this.pepeRightEyeTop = new anim.cubicBezierSpline(
      -80,299,
      -80,330,
      -96,330,
      -96,299
    );
    this.pepeRightEyeBottom = new anim.cubicBezierSpline(
      -80,299,
      -80,268,
      -96,268,
      -96,299
    );

    //pepe hand
    this.pepeHandTop = new anim.cubicBezierSpline(
      -90,237,
      -90,260,
      -125,260,
      -125,237
    );
    this.pepeHandBottom = new anim.cubicBezierSpline(
        -90,237,
        -90,214,
        -125,214,
        -125,237
    );

    //janitor in toilet body
    this.janitorToiletTop = new anim.cubicBezierSpline(
        -152,264,
        -152,361,
          -6,361,
          -6,264
      );
      this.janitorToiletBottom = new anim.cubicBezierSpline(
        -152,264,
        -152,167,
        -6,167,
        -6,264
      );
  
      //janitor eyes
      this.janitorLeftEyeTop = new anim.cubicBezierSpline(
        -57,299,
        -57,330,
        -73,330,
        -73,299
      );
      this.janitorLeftEyeBottom = new anim.cubicBezierSpline(
          -57,299,
          -57,268,
        -73,268,
        -73,299
      );
  
      this.janitorRightEyeTop = new anim.cubicBezierSpline(
        -90,299,
        -90,330,
        -106,330,
        -106,299
      );
      this.janitorRightEyeBottom = new anim.cubicBezierSpline(
        -90,299,
        -90,268,
        -106,268,
        -106,299
      );
  
      //janitor hand
      this.janitorHandTop = new anim.cubicBezierSpline(
        -90,237,
        -90,260,
        -125,260,
        -125,237
      );
      this.janitorHandBottom = new anim.cubicBezierSpline(
          -90,237,
          -90,214,
          -125,214,
          -125,237
      );
    }
  
    addKeyframe(object, endAt, transform, moveFunc, ...args) {
      super.preventStart(
        walkwithScene.START_AT,
        object,
        endAt,
        transform,
        moveFunc,
        ...args
      );
      object.addKeyframe(
        walkwithScene.START_AT + endAt,
        transform,
        moveFunc,
        ...args
      );
    }
  
    makeAnimate() {
    //move  pepe
      this.addKeyframe(
        this.pepeLeftEyeBottom,
        5000,
        anim.translation,
        fn.SIGMOID,
        480,
        0
      );
      
      this.addKeyframe(
        this.pepeLeftEyeTop,
        5000,
        anim.translation,
        fn.SIGMOID,
        480,
        0
      );
      this.addKeyframe(
        this.pepeRightEyeBottom,
        5000,
        anim.translation,
        fn.SIGMOID,
        480,
        0
    );
    this.addKeyframe(
        this.pepeRightEyeTop,
        5000,
        anim.translation,
        fn.SIGMOID,
        480,
        0
    );
    this.addKeyframe(
        this.pepeHandBottom,
        5000,
        anim.translation,
        fn.SIGMOID,
        480,
        0
    );
    this.addKeyframe(
        this.pepeHandTop,
        5000,
        anim.translation,
        fn.SIGMOID,
        480,
        0
    );
    this.addKeyframe(
      this.pepeToiletTop,
      5000,
      anim.translation,
      fn.SIGMOID,
      480,
      0
    );
    this.addKeyframe(
      this.pepeToiletBottom,
      5000,
      anim.translation,
      fn.SIGMOID,
      480,
      0
    );

    // janitor delay
    this.addKeyframe(
        this.janitorLeftEyeBottom,
        3000,
        anim.translation,
        fn.SIGMOID,
        0,
        0
      );
      
      this.addKeyframe(
        this.janitorLeftEyeTop,
        3000,
        anim.translation,
        fn.SIGMOID,
        0,
        0
      );
      this.addKeyframe(
        this.janitorRightEyeBottom,
        3000,
        anim.translation,
        fn.SIGMOID,
        0,
        0
    );
    this.addKeyframe(
        this.janitorRightEyeTop,
        3000,
        anim.translation,
        fn.SIGMOID,
        0,
        0
    );
    this.addKeyframe(
        this.janitorHandBottom,
        3000,
        anim.translation,
        fn.SIGMOID,
        0,
        0
    );
    this.addKeyframe(
        this.janitorHandTop,
        3000,
        anim.translation,
        fn.SIGMOID,
        0,
        0
    );
    this.addKeyframe(
      this.janitorToiletTop,
      3000,
      anim.translation,
      fn.SIGMOID,
      0,
      0
    );
    this.addKeyframe(
      this.janitorToiletBottom,
      3000,
      anim.translation,
      fn.SIGMOID,
      0,
      0
    );

    //move janitor
    this.addKeyframe(
        this.janitorLeftEyeBottom,
        7000,
        anim.translation,
        fn.SIGMOID,
        320,
        0
      );
      
      this.addKeyframe(
        this.janitorLeftEyeTop,
        7000,
        anim.translation,
        fn.SIGMOID,
        320,
        0
      );
      this.addKeyframe(
        this.janitorRightEyeBottom,
        7000,
        anim.translation,
        fn.SIGMOID,
        320,
        0
    );
    this.addKeyframe(
        this.janitorRightEyeTop,
        7000,
        anim.translation,
        fn.SIGMOID,
        320,
        0
    );
    this.addKeyframe(
        this.janitorHandBottom,
        7000,
        anim.translation,
        fn.SIGMOID,
        320,
        0
    );
    this.addKeyframe(
        this.janitorHandTop,
        7000,
        anim.translation,
        fn.SIGMOID,
        320,
        0
    );
    this.addKeyframe(
      this.janitorToiletTop,
      7000,
      anim.translation,
      fn.SIGMOID,
      320,
      0
    );
    this.addKeyframe(
      this.janitorToiletBottom,
      7000,
      anim.translation,
      fn.SIGMOID,
      320,
      0
    );
    

    //look 2
    this.addKeyframe(
        this.janitorLeftEyeBottom,
        10000,
        anim.translation,
        fn.SIGMOID,
        30,
        0
      );
      
      this.addKeyframe(
        this.janitorLeftEyeTop,
        10000,
        anim.translation,
        fn.SIGMOID,
        30,
        0
      );
      this.addKeyframe(
        this.janitorRightEyeBottom,
        10000,
        anim.translation,
        fn.SIGMOID,
        30,
        0
    );
    this.addKeyframe(
        this.janitorRightEyeTop,
        10000,
        anim.translation,
        fn.SIGMOID,
        30,
        0
    );
    this.addKeyframe(
        this.pepeLeftEyeBottom,
        10000,
        anim.translation,
        fn.SIGMOID,
        20,
        0
      );
      
      this.addKeyframe(
        this.pepeLeftEyeTop,
        10000,
        anim.translation,
        fn.SIGMOID,
        20,
        0
      );
      this.addKeyframe(
        this.pepeRightEyeBottom,
        10000,
        anim.translation,
        fn.SIGMOID,
        20,
        0
    );
    this.addKeyframe(
        this.pepeRightEyeTop,
        10000,
        anim.translation,
        fn.SIGMOID,
        20,
        0
    );

    //hand look
    this.addKeyframe(
        this.janitorHandBottom,
        11000,
        anim.translation,
        fn.SIGMOID,
        -20,
        0
    );
    this.addKeyframe(
        this.janitorHandTop,
        11000,
        anim.translation,
        fn.SIGMOID,
        -20,
        0
    );
    this.addKeyframe(
        this.pepeHandBottom,
        11000,
        anim.translation,
        fn.SIGMOID,
        -15,
        0
    );
    this.addKeyframe(
        this.pepeHandTop,
        11000,
        anim.translation,
        fn.SIGMOID,
        -15,
        0
    );

    //look 2 zoom
    this.addKeyframe(
        this.janitorLeftEyeBottom,
        14000,
        anim.translation,
        fn.SIGMOID,
        11,
        -13
      );
      
      this.addKeyframe(
        this.janitorLeftEyeTop,
        14000,
        anim.translation,
        fn.SIGMOID,
        11,
        -13
      );
      this.addKeyframe(
        this.janitorRightEyeBottom,
        14000,
        anim.translation,
        fn.SIGMOID,
        11,
        -13
    );
    this.addKeyframe(
        this.janitorRightEyeTop,
        14000,
        anim.translation,
        fn.SIGMOID,
        11,
        -13
    );
    this.addKeyframe(
        this.pepeLeftEyeBottom,
        13000,
        anim.translation,
        fn.SIGMOID,
        10,
        -12
      );
      
      this.addKeyframe(
        this.pepeLeftEyeTop,
        13000,
        anim.translation,
        fn.SIGMOID,
        10,
        -12
      );
      this.addKeyframe(
        this.pepeRightEyeBottom,
        13000,
        anim.translation,
        fn.SIGMOID,
        10,
        -12
    );
    this.addKeyframe(
        this.pepeRightEyeTop,
        13000,
        anim.translation,
        fn.SIGMOID,
        10,
        -12
    );
  } 
}