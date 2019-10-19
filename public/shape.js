class Shape{
    constructor(){
        this.points=[]
    }
    addPoint(p){
        this.points.push(p)
    }
    draw(){
        for(var i=1;i<this.points.length;i++){
            ctx.moveTo(this.points[i-1].x,this.points[i-1].y);
            ctx.lineTo(this.points[i].x,this.points[i].y);
            ctx.stroke();
        }
    }
}