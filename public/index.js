window.onload=init()
var cvs,ctx,count,x1,y1,x2,y2,shapeNumber,shape1,shape2,t,clearButton,shape,tweenShape,pencil_line,mouse
function init(){
	shapeNumber=0,t=0,count=0,pencil_line=0,mouse=0
	shape1=new Shape()
	shape2=new Shape()

	cvs=document.getElementById("mycanvas")
	ctx=cvs.getContext("2d");

	ctx.strokeStyle = '#000';
	ctx.lineJoin="round";
	ctx.lineCap="round";
	ctx.lineWidth = 1;

	clearButton=document.getElementById("clear")
    
	shape=new Shape()

	clearButton.onclick=function(){clearCanvas()}
	redraw.onclick=()=>RedrawShapes()
	transform.onclick=()=>tween()
	line.onclick=()=>{
		console.log("shape",shape,mouse,count)
		if(shape.points.length>0){
			console.log("shape",shape)
			shape.points=[]
		}
		pencil_line=1
	}
	pencil.onclick=()=>{
		if(shape.points.length>0){
			shape.points=[]
		}
		pencil_line=0
	}

	document.body.addEventListener('keydown',function(e){
		e=event||window.event;
		
		var keyCode=e.charCode || e.keyCode;
		console.log("keydown",keyCode)
		if(keyCode=== 13){
			changeShape()
		}
		
	})

	cvs.onclick=function(e){
		if(pencil_line===1){
			var p=new Point(getMousePos(e))
			shape.addPoint(p)
			console.log("p",p)
			if(count===0){
				x1=p.x;
				y1=p.y;
				count++;
			}
			else{
				x2=p.x;
				y2=p.y;
				ctx.moveTo(x1,y1);
				ctx.lineTo(x2,y2);
				ctx.stroke();
				x1=x2;
				y1=y2;
			}
			// if(shapeNumber===0 && shape.points.length>0){
			// 	shapeNumber===1
			// }
		}
	}
	document.body.addEventListener('mousedown',function(e){
		if(pencil_line===0){
			var p=new Point(getMousePos(e))
			shape.addPoint(p)
			mouse=1;
			x1=p.x;
			y1=p.y;
		}
	})
	document.body.addEventListener('mousemove',function(e){
		if(pencil_line===0 && mouse===1){
			var p=new Point(getMousePos(e))
			shape.addPoint(p)
			x2=p.x;
			y2=p.y;
			ctx.beginPath()
			ctx.moveTo(x1,y1);
			ctx.lineTo(x2,y2);
			ctx.stroke();
			x1=x2;
			y1=y2;
		}
		
	})
	document.body.addEventListener('mouseup',function(e){
		if(pencil_line===0){
			mouse=0;
		}
		
	})
	
}

function getMousePos(e){
    var rect=cvs.getBoundingClientRect();
    return{
        x:e.clientX-rect.left,
        y:e.clientY-rect.top
    }

}
function tween(){
	if(shape1.points.length>shape2.points.length){
		p1=shape2.points.pop()
		p2=shape2.points.pop()
		p3=new Point({x:(p1.x+p2.x)/2,y:(p1.y+p2.y)/2})
		shape2.points.push(p2)
		shape2.points.push(p3)
		shape2.points.push(p1)
		tween()
	}else if(shape2.points.length>shape1.points.length){
		p1=shape1.points.pop()
		p2=shape1.points.pop()
		p3=new Point({x:(p1.x+p2.x)/2,y:(p1.y+p2.y)/2})
		shape1.points.push(p2)
		shape1.points.push(p3)
		shape1.points.push(p1)
		tween()
	}
	if(shape1.points.length===shape2.points.length){	
		tweenShape=new Shape()
		t=0
		requestAnimationFrame(gameLoop)
	}
}

function gameLoop() {
	if(t<=1){
		clearCanvas()
		update()
		render()
		requestAnimationFrame(gameLoop)
	}

}
function changeShape(){
	if(shape.points.length>1){
		shapeNumber++
		if(shape1.points.length<1){
			shape1.points=shape.points
			shape=new Shape()
			console.log("shape",shape1)
			count=0
		}else if(shape2.points.length<1){
			shape2.points=shape.points
			shape=new Shape()
			console.log("shape",shape2)
			count=0
		}

	}
}
function render(){
    tweenShape.draw()
}
function update(){
	for(var i=0;i<shape1.points.length;i++){
		tweenShape.points[i]={x:lerp(shape1.points[i].x,shape2.points[i].x,t),y:lerp(shape1.points[i].y,shape2.points[i].y,t)}
	}
	t+=0.002
}
function lerp(start,end,t){
	return (1-t)*start+(t*end)
}

function clearCanvas(){
	const ctx = cvs.getContext("2d")
	ctx.save()
	ctx.globalCompositeOperation ="copy"
	ctx.strokeStyle="transparent"
	ctx.beginPath()
	ctx.lineTo(0,0)
	ctx.stroke()
	ctx.restore()
}
function RedrawShapes(){
	shape1.draw()
	shape2.draw()
}