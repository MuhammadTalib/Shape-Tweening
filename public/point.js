class Point{

    constructor(p){
        this.x=p.x
        this.y=p.y
    }
    draw(){

        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, true);
        ctx.stroke();

    }

}