import * as elem from './elementControl.js';
import * as cf from '../config.js'

class point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

class obj {
    constructor(){
        
    }

    draw(){
        for(let i = 0;i < this.pointlist.length;i++){
            gp.setPixel(this.pointlist[i].x,this.pointlist[i].y);
        } 
    }
}

function drawLine(gp,x1,y1,x2,y2){
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let sx = x1 < x2 ? 1 : -1;
    let sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;

        while (true) {
            gp.setPixel(x1, y1);
            if (x1 === x2 && y1 === y2) break;
            let e2 = 2 * err;
            if (e2 > -dy) { err -= dy; x1 += sx; }
            if (e2 < dx) { err += dx; y1 += sy; }
        }
}

export class Line extends obj {
    constructor (gp,x1,y1,x2,y2) {
        super();
        this.gp = gp;
        this.pointlist = [];
        this.pointlist.push(new point(x1,y1));
        this.pointlist.push(new point(x2,y2));
    }
    draw(){
        drawLine(this.gp,this.pointlist[0].x, this.pointlist[0].y, this.pointlist[1].x, this.pointlist[1].y);
    }
}

export class incompletepolygon extends obj {
    constructor (gp) {
        super();
        this.gp = gp;
        this.pointlist = [];
    }

    addPoint (x, y) {
        this.pointlist.push(new point(x, y));
    }

    draw(){
        if (this.pointlist.length < 2) {
            return;
        }

        for (let i = 0; i < this.pointlist.length-1; i++) {
            this.drawLine(this.pointlist[i], this.pointlist[(i + 1)%this.pointlist.length]);
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
            if (e2 > -dy) { err -= dy; point1.x += sx; }
            if (e2 < dx) { err += dx; point1.y += sy; }
        }
    }
}

export class cubicBezierSpline extends obj {
    constructor (gp,x0,y0,x1,y1,x2,y2,x3,y3) {
        super();
        this.gp = gp;
        this.pointlist = [];
        this.pointlist.push(new point(x0,y0));
        this.pointlist.push(new point(x1,y1));
        this.pointlist.push(new point(x2,y2));
        this.pointlist.push(new point(x3,y3));
    }

    draw() {
        let interval = 1/cf.RENDER_FREQUENCY;
        let u = 0;
        let u1;
        let px;
        let py;
        let lastpx = this.pointlist[0].x;
        let lastpy = this.pointlist[0].y;
        while (u <= 1) {
            u1 = 1-u;
            px = ( this.pointlist[0].x*u1*u1*u1 ) + ( this.pointlist[1].x*3*u*u1*u1 ) + ( this.pointlist[2].x*3*u*u*u1 ) + ( this.pointlist[3].x*u*u*u );
            py = ( this.pointlist[0].y*u1*u1*u1 ) + ( this.pointlist[1].y*3*u*u1*u1 ) + ( this.pointlist[2].y*3*u*u*u1 ) + ( this.pointlist[3].y*u*u*u );
            px = parseInt(px);
            py = parseInt(py);

            drawLine(this.gp,lastpx,lastpy,px,py);

            lastpx = px;
            lastpy = py;
            u = u+interval;
        }
    }
}

export function drawAll(objectlist) {
    for(let i = 0;i < objectlist.length;i++){
        objectlist[i].draw();
    }
}

export function translation (obj, tx, ty) {
    for ( let i = 0; i < obj.pointlist.length; i++ ) {
        obj.pointlist[i].x = obj.pointlist[i].x + tx;
        obj.pointlist[i].y = obj.pointlist[i].y + ty;
    }
}

export function rotation (obj, degree, centerx,centery) {
    let rad = degree * Math.PI/180;

    let cos = Math.cos(rad);
    let sin = Math.sin(rad);
    let cos1 = 1 - (Math.cos(rad));

    const compMatrix = math.matrix([ [cos,-sin,(centerx*cos1) + (centery*sin)], [sin,cos,(centery*cos1) - (centerx*sin)], [0,0,1] ]);
    for( let i = 0; i < obj.pointlist.length;i++ ) {
        const pointMatrix = math.matrix([ [obj.pointlist[i].x],[obj.pointlist[i].y],[1] ]);
        const res = math.multiply(compMatrix,pointMatrix);

        obj.pointlist[i].x = parseInt(  res.subset( math.index(0,0) )  );
        obj.pointlist[i].y = parseInt(  res.subset( math.index(1,0) )  );
    }
}

export function scaling (obj, sx, sy, fixedpointx, fixedpointy) {
    for( let i = 0; i < obj.pointlist.length;i++ ) {
        const pointMatrix = math.matrix([ [obj.pointlist[i].x],[obj.pointlist[i].y],[1] ]);
        const compMatrix = math.matrix([ [sx, 0, (1-sx) * fixedpointx], [0, sy, (1-sy) * fixedpointy], [0,0,1] ]);

        const res = math.multiply(compMatrix,pointMatrix);

        obj.pointlist[i].x = parseInt(  res.subset( math.index(0,0) )  );
        obj.pointlist[i].y = parseInt(  res.subset( math.index(1,0) )  );
    }
    
}

export function shearx(obj, sh, yref) {
    for( let i = 0; i < obj.pointlist.length;i++ ) {
        const pointMatrix = math.matrix([ [obj.pointlist[i].x], [obj.pointlist[i].y], [1] ]);
        const compMatrix = math.matrix([ [1, sh, -(sh*yref)], [0, 1, 0], [0,0,1] ]);

        const res = math.multiply(compMatrix,pointMatrix);

        obj.pointlist[i].x = parseInt(  res.subset( math.index(0,0) )  );
        obj.pointlist[i].y = parseInt(  res.subset( math.index(1,0) )  );
    }
}

export function sheary(obj, sh, xref) {
    for( let i = 0; i < obj.pointlist.length;i++ ) {
        const pointMatrix = math.matrix([ [obj.pointlist[i].x], [obj.pointlist[i].y], [1] ]);
        const compMatrix = math.matrix([ [1, 0, 0], [sh, 1, -(sh*xref)], [0,0,1] ]);

        const res = math.multiply(compMatrix,pointMatrix);

        obj.pointlist[i].x = parseInt(  res.subset( math.index(0,0) )  );
        obj.pointlist[i].y = parseInt(  res.subset( math.index(1,0) )  );
    }
}

