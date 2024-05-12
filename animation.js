class point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class obj {
  constructor() {}

  draw() {
    for (let i = 0; i < this.pointlist.length; i++) {
      gp.setPixel(this.pointlist[i].x, this.pointlist[i].y);
    }
  }
}

export class rectangle extends obj {
  constructor(gp, x, y, width, height) {
    super();
    this.gp = gp;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    let xw = this.x + this.width;
    let yh = this.y + this.height;
    for (let i = 0; i <= this.width; i++) {
      this.gp.setPixel(this.x + i, this.y);
      this.gp.setPixel(this.x + i, yh);
    }
    for (let i = 0; i <= this.height; i++) {
      this.gp.setPixel(this.x, this.y + i);
      this.gp.setPixel(xw, this.y + i);
    }
  }
}

export class incompletepolygon extends obj {
  constructor(gp) {
    super();
    this.gp = gp;
    this.pointlist = [];
  }

  addPoint(x, y) {
    this.pointlist.push(new point(x, y));
  }

  draw() {
    if (this.pointlist.length < 2) {
      return;
    }

    for (let i = 0; i < this.pointlist.length - 1; i++) {
      this.drawLine(
        this.pointlist[i],
        this.pointlist[(i + 1) % this.pointlist.length]
      );
    }

    // Draw the last line connecting the last point to the first point to close the polygon
    this.drawLine(this.pointlist[this.pointlist.length - 1], this.pointlist[0]);
  }

  drawLine(point1, point2) {
    // Bresenham's line algorithm to draw a line between two points
    let dx = Math.abs(point2.x - point1.x);
    let dy = Math.abs(point2.y - point1.y);
    let sx = point1.x < point2.x ? 1 : -1;
    let sy = point1.y < point2.y ? 1 : -1;
    let err = dx - dy;

    while (true) {
      this.gp.setPixel(point1.x, point1.y);
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
  constructor(gp, x0, y0, x1, y1, x2, y2, x3, y3) {
    super();
    this.gp = gp;
    this.pointlist = [];
    this.pointlist.push(new point(x0, y0));
    this.pointlist.push(new point(x1, y1));
    this.pointlist.push(new point(x2, y2));
    this.pointlist.push(new point(x3, y3));
  }

  draw() {
    let interval = 1 / 1024;
    let u = 0;
    let u1;
    let px;
    let py;
    while (u < 1) {
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

      this.gp.setPixel(parseInt(px), parseInt(py));
      u = u + interval;
    }
  }
}

export class splineChain extends cubicBezierSpline {
  constructor(gp, x0, y0, x1, y1, x2, y2, x3, y3) {
    super();
    this.gp = gp;
    this.pointlist = [];
    this.pointlist.push(new point(x0, y0));
    this.pointlist.push(new point(x1, y1));
    this.pointlist.push(new point(x2, y2));
    this.pointlist.push(new point(x3, y3));
    this.sectionNum = 1;
    this.sectionPointer = 0;

    // Calculate the new control points 1 and 2 using the provided formulas
    // const x0 = prevBezierSpline.pointlist[3].x;
    // const y0 = prevBezierSpline.pointlist[3].y;

    // const x2_old = prevBezierSpline.pointlist[2].x;
    // const y2_old = prevBezierSpline.pointlist[2].y;

    // const x1_new =
    //   ((prevBezierSpline.pointlist.length - 1) * (x0 - x2_old) + x0) /
    //   (this.pointlist.length - 1);
    // const y1_new =
    //   ((prevBezierSpline.pointlist.length - 1) * (y0 - y2_old) + y0) /
    //   (this.pointlist.length - 1);

    // const x2_new =
    //   ((prevBezierSpline.pointlist.length - 1) *
    //     (prevBezierSpline.pointlist.length - 2) *
    //     (x1_new - 2 * x2_old + x0)) /
    //     ((this.pointlist.length - 1) * (this.pointlist.length - 2)) +
    //   (2 * x0 - x2_old);
    // const y2_new =
    //   ((prevBezierSpline.pointlist.length - 1) *
    //     (prevBezierSpline.pointlist.length - 2) *
    //     (y1_new - 2 * y2_old + y0)) /
    //     ((this.pointlist.length - 1) * (this.pointlist.length - 2)) +
    //   (2 * y0 - y2_old);

    // Add the new control points
    // this.pointlist.push(new point(x1_new, y1_new));
    // this.pointlist.push(new point(x2_new, y2_new));

    // // Add the end point of the new spline
    // this.pointlist.push(new point(x3, y3));
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

  draw() {
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

      this.gp.setPixel(parseInt(px), parseInt(py));
      u = u + interval;
    }
    this.sectionPointer++;
    if (this.sectionPointer < this.sectionNum) this.draw();
    this.sectionPointer = 0;
  }
}

export function drawAll(objectlist) {
  for (let i = 0; i < objectlist.length; i++) {
    objectlist[i].draw();
  }
}

/*export function translation (p, tx, ty) {
    p.x = p.x + tx;
    p.y = p.y + ty;
}

export function rotation (p, degree, center) {
    let rad = degree * Math.PI/180;

    let cos = Math.cos(rad);
    let sin = Math.sin(rad);
    let cos1 = 1 - (Math.cos(rad));

    const pointMatrix = math.matrix([p.x],[p.y],1);
    const compMatrix = math.matrix([cos,-sin,(center.x*cos1) + (center.y*sin)], [sin,cos,(center.y*cos1) - (center.x*sin)], [0,0,1]);

    const res = math.multiply(pointMatrix,compMatrix);

    p.x = res.subset(math.index(0,0));
    p.x = res.subset(math.index(0,1));
}

export function scaling (p, sx, sy, fixedpoint) {
    const pointMatrix = math.matrix([p.x],[p.y],1);
    const compMatrix = math.matrix([sx, 0, (1-sx) * fixedpoint.x], [0, sy, (1-sy) * fixedpoint.y], [0,0,1]);

    const res = math.multiply(pointMatrix,compMatrix);

    p.x = res.subset(math.index(0,0));
    p.x = res.subset(math.index(0,1));
}

export function shearx(p, sh, yref) {
    const pointMatrix = math.matrix([p.x],[p.y],1);
    const compMatrix = math.matrix([1, sh, -(sh*yref)], [0, 1, 0], [0,0,1]);

    const res = math.multiply(pointMatrix,compMatrix);

    p.x = res.subset(math.index(0,0));
    p.x = res.subset(math.index(0,1));
}

export function sheary(p, sh, xref) {
    const pointMatrix = math.matrix([p.x],[p.y],1);
    const compMatrix = math.matrix([1, 0, 0], [sh, 1, -(sh*xref)], [0,0,1]);

    const res = math.multiply(pointMatrix,compMatrix);

    p.x = res.subset(math.index(0,0));
    p.x = res.subset(math.index(0,1));
}*/
