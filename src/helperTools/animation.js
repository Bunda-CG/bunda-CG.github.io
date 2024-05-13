import * as cf from "../config.js";
import * as kf from "./keyframe.js";

class point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class obj {
  constructor() {
    this.pointlist = [];
    this.refPoints = [];

    this.keyframes = [];
    this.keyframePointer = 0;

    this.isShow = true;
    this.red = cf.RED;
    this.green = cf.GREEN;
    this.blue = cf.BLUE;
    this.alpha = cf.ALPHA;
  }

  draw(gp) {
    if (!this.isShow) return;
    gp.setColor(this.red, this.green, this.blue, this.alpha);
  }

  setColor(r, g, b, a) {
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
  }

  addKeyframe(endTime, transformFunc, progressFunc, ...params) {
    const keyframe = new kf.Keyframe(
      endTime,
      transformFunc,
      params,
      progressFunc
    );
    this.keyframes.push(keyframe);
  }

  updateReference() {
    this.refPoints = [];
    this.pointlist.forEach((oldPoint) => {
      const newPoint = new point(oldPoint.x, oldPoint.y);
      this.refPoints.push(newPoint);
    });
  }
}

function drawLine(gp, x1, y1, x2, y2) {
  let dx = Math.abs(x2 - x1);
  let dy = Math.abs(y2 - y1);
  let sx = x1 < x2 ? 1 : -1;
  let sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    gp.setPixel(x1, y1);
    if (x1 === x2 && y1 === y2) break;
    let e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }
  }
}

export class Line extends obj {
  constructor(x1, y1, x2, y2) {
    super();
    this.pointlist.push(new point(x1, y1));
    this.pointlist.push(new point(x2, y2));

    this.refPoints.push(new point(x1, y1));
    this.refPoints.push(new point(x2, y2));
  }
  draw(gp) {
    if (!this.isShow) return;
    super.draw(gp);
    drawLine(
      gp,
      this.pointlist[0].x,
      this.pointlist[0].y,
      this.pointlist[1].x,
      this.pointlist[1].y
    );
  }
}

export class incompletepolygon extends obj {
  addPoint(x, y) {
    this.pointlist.push(new point(x, y));
    this.refPoints.push(new point(x, y));
  }

  draw(gp) {
    if (!this.isShow) return;
    super.draw(gp);
    if (this.pointlist.length < 2) {
      return;
    }

    for (let i = 0; i < this.pointlist.length - 1; i++) {
      this.drawLine(
        gp,
        this.pointlist[i],
        this.pointlist[(i + 1) % this.pointlist.length]
      );
    }

    // Draw the last line connecting the last point to the first point to close the polygon
    this.drawLine(
      gp,
      this.pointlist[this.pointlist.length - 1],
      this.pointlist[0]
    );
  }

  drawLine(gp, point1, point2) {
    // Bresenham's line algorithm to draw a line between two points
    let dx = Math.abs(point2.x - point1.x);
    let dy = Math.abs(point2.y - point1.y);
    let sx = point1.x < point2.x ? 1 : -1;
    let sy = point1.y < point2.y ? 1 : -1;
    let err = dx - dy;

    while (true) {
      gp.setPixel(point1.x, point1.y);
      if (point1.x === point2.x && point1.y === point2.y) break;
      let e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        point1.x += sx;
      }
      if (e2 < dx) {
        err += dx;
        point1.y += sy;
      }
    }
  }
}

export class cubicBezierSpline extends obj {
  constructor(x0, y0, x1, y1, x2, y2, x3, y3) {
    super();
    this.pointlist.push(new point(x0, y0));
    this.pointlist.push(new point(x1, y1));
    this.pointlist.push(new point(x2, y2));
    this.pointlist.push(new point(x3, y3));

    this.refPoints.push(new point(x0, y0));
    this.refPoints.push(new point(x1, y1));
    this.refPoints.push(new point(x2, y2));
    this.refPoints.push(new point(x3, y3));
  }

  draw(gp) {
    if (!this.isShow) return;
    super.draw(gp);
    let interval = 1 / cf.RENDER_PRECISION;
    let u = 0;
    let u1;
    let px;
    let py;
    let lastpx = this.pointlist[0].x;
    let lastpy = this.pointlist[0].y;
    while (u <= 1) {
      u1 = 1 - u;
      px =
        this.pointlist[0].x * u1 * u1 * u1 +
        this.pointlist[1].x * 3 * u * u1 * u1 +
        this.pointlist[2].x * 3 * u * u * u1 +
        this.pointlist[3].x * u * u * u;
      py =
        this.pointlist[0].y * u1 * u1 * u1 +
        this.pointlist[1].y * 3 * u * u1 * u1 +
        this.pointlist[2].y * 3 * u * u * u1 +
        this.pointlist[3].y * u * u * u;
      px = parseInt(px);
      py = parseInt(py);

      drawLine(gp, lastpx, lastpy, px, py);

      lastpx = px;
      lastpy = py;
      u = u + interval;
    }
  }
}

export class splineChain extends cubicBezierSpline {
  constructor(x0, y0, x1, y1, x2, y2, x3, y3) {
    super(x0, y0, x1, y1, x2, y2, x3, y3);
    this.sectionNum = 1;
    this.sectionPointer = 0;
  }

  findP1(x3, y3, x2, y2) {
    let xPrime = 2 * x3 - x2;
    let yPrime = 2 * y3 - y2;
    return new point(xPrime, yPrime);
  }

  findP2(x3, y3, x2, y2, x1, y1) {
    let xPrime = 3 * (x3 - x2) + x1;
    let yPrime = 3 * (y3 - y2) + y1;
    return new point(xPrime, yPrime);
  }

  addPoint(x, y) {
    const p3 = this.pointlist[this.pointlist.length - 1];
    const p2 = this.pointlist[this.pointlist.length - 2];
    const p1 = this.pointlist[this.pointlist.length - 3];
    const p0new = new point(p3.x, p3.y);
    const p1new = this.findP1(p3.x, p3.y, p2.x, p2.y);
    const p2new = this.findP2(p3.x, p3.y, p2.x, p2.y, p1.x, p1.y);

    this.pointlist.push(p0new); // p0
    this.pointlist.push(p1new); // p1
    this.pointlist.push(p2new); // p2
    this.pointlist.push(new point(x, y)); // p3

    this.sectionNum++;
  }

  draw(gp) {
    if (!this.isShow) return;
    super.draw(gp);
    let interval = 1 / 1024;
    let u = 0;
    let u1;
    let px;
    let py;
    let sectionOffset = this.sectionPointer * 4;
    console.log(this.pointlist);

    while (u < 1) {
      u1 = 1 - u;
      px =
        this.pointlist[sectionOffset + 0].x * u1 * u1 * u1 +
        this.pointlist[sectionOffset + 1].x * 3 * u * u1 * u1 +
        this.pointlist[sectionOffset + 2].x * 3 * u * u * u1 +
        this.pointlist[sectionOffset + 3].x * u * u * u;
      py =
        this.pointlist[sectionOffset + 0].y * u1 * u1 * u1 +
        this.pointlist[sectionOffset + 1].y * 3 * u * u1 * u1 +
        this.pointlist[sectionOffset + 2].y * 3 * u * u * u1 +
        this.pointlist[sectionOffset + 3].y * u * u * u;

      gp.setPixel(parseInt(px), parseInt(py));
      u = u + interval;
    }
    this.sectionPointer++;
    if (this.sectionPointer < this.sectionNum) this.draw();
    this.sectionPointer = 0;
  }
}

export function drawAll(objectlist, gp) {
  for (let i = 0; i < objectlist.length; i++) {
    objectlist[i].draw(gp);
  }
}

export function drawScenes(scenes, gp) {
  scenes.forEach((scene) => {
    for (const property in scene) {
      const object = scene[property];
      if (!(object instanceof obj)) continue;
      if (!object.isShow) continue;
      object.draw(gp);
    }
  });
}

export function translation(obj, tx, ty, percent) {
  tx = Math.round(tx * percent);
  ty = Math.round(ty * percent);
  for (let i = 0; i < obj.pointlist.length; i++) {
    obj.pointlist[i].x = obj.refPoints[i].x + tx;
    obj.pointlist[i].y = obj.refPoints[i].y + ty;
  }
}

export function rotation(obj, degree, centerx, centery, percent) {
  degree = degree * percent;
  let rad = (degree * Math.PI) / 180;

  let cos = Math.cos(rad);
  let sin = Math.sin(rad);
  let cos1 = 1 - Math.cos(rad);

  const compMatrix = math.matrix([
    [cos, -sin, centerx * cos1 + centery * sin],
    [sin, cos, centery * cos1 - centerx * sin],
    [0, 0, 1],
  ]);
  for (let i = 0; i < obj.pointlist.length; i++) {
    const pointMatrix = math.matrix([
      [obj.refPoints[i].x],
      [obj.refPoints[i].y],
      [1],
    ]);
    const res = math.multiply(compMatrix, pointMatrix);

    obj.pointlist[i].x = parseInt(res.subset(math.index(0, 0)));
    obj.pointlist[i].y = parseInt(res.subset(math.index(1, 0)));
  }
}

export function scaling(obj, sx, sy, fixedpointx, fixedpointy, percent) {
  sx = 1 + (sx - 1) * percent;
  sy = 1 + (sy - 1) * percent;
  for (let i = 0; i < obj.pointlist.length; i++) {
    const pointMatrix = math.matrix([
      [obj.refPoints[i].x],
      [obj.refPoints[i].y],
      [1],
    ]);
    const compMatrix = math.matrix([
      [sx, 0, (1 - sx) * fixedpointx],
      [0, sy, (1 - sy) * fixedpointy],
      [0, 0, 1],
    ]);

    const res = math.multiply(compMatrix, pointMatrix);

    obj.pointlist[i].x = parseInt(res.subset(math.index(0, 0)));
    obj.pointlist[i].y = parseInt(res.subset(math.index(1, 0)));
  }
} //

export function shearx(obj, sh, yref, percent) {
  sh = sh * percent;
  for (let i = 0; i < obj.pointlist.length; i++) {
    const pointMatrix = math.matrix([
      [obj.refPoints[i].x],
      [obj.refPoints[i].y],
      [1],
    ]);
    const compMatrix = math.matrix([
      [1, sh, -(sh * yref)],
      [0, 1, 0],
      [0, 0, 1],
    ]);

    const res = math.multiply(compMatrix, pointMatrix);

    obj.pointlist[i].x = parseInt(res.subset(math.index(0, 0)));
    obj.pointlist[i].y = parseInt(res.subset(math.index(1, 0)));
  }
}

export function sheary(obj, sh, xref, percent) {
  sh = sh * percent;
  for (let i = 0; i < obj.pointlist.length; i++) {
    const pointMatrix = math.matrix([
      [obj.refPoints[i].x],
      [obj.refPoints[i].y],
      [1],
    ]);
    const compMatrix = math.matrix([
      [1, 0, 0],
      [sh, 1, -(sh * xref)],
      [0, 0, 1],
    ]);

    const res = math.multiply(compMatrix, pointMatrix);

    obj.pointlist[i].x = parseInt(res.subset(math.index(0, 0)));
    obj.pointlist[i].y = parseInt(res.subset(math.index(1, 0)));
  }
}

export function stay(obj, percent) {}
