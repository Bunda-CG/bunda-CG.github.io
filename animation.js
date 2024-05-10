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

export class rectangle extends obj {
    constructor(gp,x,y,width,height){
        super();
        this.gp = gp;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(){
        let xw = this.x + this.width;
        let yh = this.y + this.height;
        for(let i = 0; i <= this.width; i++ ) {
            this.gp.setPixel(this.x+i, this.y);
            this.gp.setPixel(this.x+i, yh);
        }
        for(let i = 0; i <= this.height; i++ ) {
            this.gp.setPixel(this.x, this.y+i);
            this.gp.setPixel(xw,this.y+i);
        }
    }
}

export class polygon extends obj {
    constructor (gp) {
        super();
        this.gp = gp;
        this.pointlist = [];
    }

    addPoint (x,y) {
        this.pointlist.push(new point(x,y));
    }

    draw(){

    }
}

export class cubicBezierSpline extends obj {
    constructor (gp,x1,y1,x2,y2,x3,y3,x4,y4) {
        super();
        this.gp = gp;

        this.x1 = x1;
        this.y1 = y1;

        this.x2 = x2;
        this.y2 = y2;
        
        this.x3 = x3;
        this.y3 = y3;

        this.x4 = x4;
        this.y4 = y4;
    }

    draw() {
        let interval = 1/1024;
        let u = 0;
        let u1;
        let px;
        let py;
        while (u < 1) {
            u1 = 1-u;
            px = ( this.x1*u1*u1*u1 ) + ( this.x2*3*u*u1*u1 ) + ( this.x3*3*u*u*u1 ) + ( this.x4*u*u*u );
            py = ( this.y1*u1*u1*u1 ) + ( this.y2*3*u*u1*u1 ) + ( this.y3*3*u*u*u1 ) + ( this.y4*u*u*u );
            
            this.gp.setPixel(parseInt(px), parseInt(py));
            u = u+interval;
        }
    }
}

export function drawAll(objectlist) {
    for(let i = 0;i < objectlist.length;i++){
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

