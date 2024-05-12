import * as anim from "./helperTools/animation.js";
//toilet
const toiletSeatTop = new anim.incompletepolygon();
toiletSeatTop.addPoint(484,249);
toiletSeatTop.addPoint(484,291);
toiletSeatTop.addPoint(674,291);
toiletSeatTop.addPoint(674,249);
toiletSeatTop.addPoint(484,249);

const toiletSeatPing = new anim.incompletepolygon();
toiletSeatPing.addPoint(655,291);
toiletSeatPing.addPoint(678,291);
toiletSeatPing.addPoint(678,480);
toiletSeatPing.addPoint(655,480);
toiletSeatPing.addPoint(655,291);

const toiletSeatBottomLeft = new anim.cubicBezierSpline(541,190,530,196,504,228,503,248);
const toiletSeatBottomRight = new anim.cubicBezierSpline(621,190,632,196,664,228,659,248);

//floorinToiletScene
const toiletFloor = new anim.Line(0,190,800,190);

//pepe in toilet
const pepeToiletTop = new anim.cubicBezierSpline(508,364, 508,461, 654,461, 654,364);
const pepeToiletBottom = new anim.cubicBezierSpline(508,364, 508,267, 654,267, 654,364);

//pepe eyes
const pepeLeftEyeTop = new anim.cubicBezierSpline(593,389, 593,420, 577,420, 577,389);
const pepeLeftEyeBottom = new anim.cubicBezierSpline(593,389, 593,358, 577,358, 577,389);

const pepeRightEyeTop = new anim.cubicBezierSpline(560,389, 560,420, 544,420, 544,389);
const pepeRightEyeBottom = new anim.cubicBezierSpline(560,389, 560,358, 544,358, 544,389);

//pepe hand
const pepeHandTop = new anim.cubicBezierSpline(622,337, 622,360, 587,360, 587,337);
const pepeHandBottom = new anim.cubicBezierSpline(622,337, 622,314, 587,314, 587,337);

export {toiletSeatTop, 
    toiletSeatPing,
    toiletSeatBottomLeft,
    toiletSeatBottomRight,
    toiletFloor,
    pepeToiletTop,
    pepeToiletBottom,
    pepeLeftEyeTop,
    pepeLeftEyeBottom,
    pepeRightEyeTop,
    pepeRightEyeBottom,
    pepeHandTop,
    pepeHandBottom};