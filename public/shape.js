class Shape{
    constructor(){
        this.points=[]
        this.lines=[]
    }
    addPoint(p){
        this.points.push(p)
        if(this.points.length>1){
            var l={p1:this.points[this.points.length-2],p2:p}
            this.lines.push(l)
        }
    }
    draw(){
        for(var i=1;i<this.points.length;i++){
            ctx.moveTo(this.points[i-1].x,this.points[i-1].y);
            ctx.lineTo(this.points[i].x,this.points[i].y);
            ctx.stroke();
        }
        
    }
    findPoint(p){
        for(var i=0;i<this.points.length;i++){
            if(p.x-this.points[i].x<3 && p.y-this.points[i].y<3){
                return i
            }
        }
        return null
    }
    drawCircumCircle(){
        var bisectors=[]
        for(var i=0;i<this.lines.length-1;i++){
            var p1=this.lines[i].p1,p2=this.lines[i].p2
            var mid=new Point({x:(p1.x+p2.x)/2,y:(p1.y+p2.y)/2})
            //mid.draw()
            var m1=(p2.y-p1.y)/(p2.x-p1.x)
            var m2=(-1)/m1
            //Equation==> y=m(x-x1)+y1
            var b=new Point({x:mid.x-200,y:0})
            b.y=m2*(b.x-mid.x)+mid.y
           // b.draw()

            var a=new Point({x:mid.x+200,y:0})
            a.y=m2*(a.x-mid.x)+mid.y
          // a.draw()
            bisectors.push({p1:a,p2:b,s:m2})

            //  this.drawLine(mid,a)
            //  this.drawLine(mid,b)
        }
        var b1=bisectors[0]
        var b2=bisectors[1]
        if(b1 !== undefined && b2 !== undefined){
            var intersector= new Point({x:0,y:0})
            intersector.x=(((b1.s*b1.p1.x)-b1.p1.y)-((b2.s*b2.p1.x)-b2.p1.y))/(b1.s-b2.s)
            intersector.y=b1.s*(intersector.x-b1.p1.x)+b1.p1.y

            
            //intersector.draw()
    
            var p=this.points[0]
            var radius=Math.sqrt(Math.pow((p.x-intersector.x),2)+Math.pow((p.y-intersector.y),2))
            ctx.beginPath();
            ctx.arc(intersector.x, intersector.y, radius, 0, 2 * Math.PI, true);
            ctx.stroke();
        }
       
        

    }
    drawInscribedCircle(){
        for(var i=0;i<this.lines.length;i++){
            var mid= new Point({x:(this.lines[i].p1.x+this.lines[i].p2.x)/2,y:(this.lines[i].p1.y+this.lines[i].p2.y)/2})
            mid.draw()
            this.drawLine(mid,this.points[i+2])
        }
    }
    getPointFromDistance(p1,d){
        
    }
    drawLine(p1,p2){
        ctx.beginPath()
		ctx.moveTo(p1.x,p1.y);
		ctx.lineTo(p2.x,p2.y);
		ctx.stroke();
    }
    replace(index,p){
        this.points[index]=p
        if(index!==0 && index!==this.points.length-1){
            this.lines[index-1].p2=p
            this.lines[index].p1=p  
        }
        else if(index===0){
            
            this.lines[index].p1=p
            this.lines[this.lines.length-1].p2=p  
        }
        else if(index===this.points.length-1){
            this.lines[0].p1=p
            this.lines[this.lines.length-1].p2=p  
        }
        
    }
    getLinePercent(l){
        var x=((l.p1.x-l.p2.x)/10)+l.p1.x
        var y=((l.p1.y-l.p2.y)/10)+l.p1.y
        return {x,y}
    }
}