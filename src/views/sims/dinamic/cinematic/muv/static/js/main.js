

var res = 10
var grid_X
var grid_Y
var sizeScreenWidth
var sizeScreenHeight
var p1
var p2
var Ex

var overBox = false
var locked = false
var widthScreen = 800
var heightScreen = 500
let dt = 0.0000004
//*(1-d/widthScreen)
Ex = (p) => {
    d = p.pos.x
    let E = $('#rangeE').val()*100
    p.V = Math.round((E / d))
    return p
}

function showDdp(p1,p2){
    $('#p1').text(`p1: ${p1.V}V`)
    $('#p2').text(`p2: ${p2.V}V`)
    let ddp = Math.abs(p1.V-p2.V)
    if(ddp>=3){
        $('#jetEletric').html(`<span><img height='50px' src='/psj/simulations/electromagnetism/fieldElectric/parallelCapacitor/assets/imgs/art/jet_eletric.gif'></span>`)
        playSound()

    }
    else{
        $('#jetEletric').html('')
        stopSound()
    }
    $('#ddp').text(`ddp: ${ddp}V`)
}


class Ball {
    constructor(x, y, name,color, r) {
        this.color = color
        this.name = name
        this.pos = createVector(x, y)
        this.r = r
        this.V = 0
        this.overBox = false
        this.locked = false
        this.xOffSet = 0
        this.yOffSet = 0
    }
    show() {
        this.pos.x = this.pos.x <= this.r ? this.r : this.pos.x 
        this.pos.x = this.pos.x >= widthScreen-this.r ? widthScreen-this.r : this.pos.x
        
        this.pos.y = this.pos.y <= this.r ? this.r : this.pos.y
        this.pos.y = this.pos.y >=heightScreen - this.r?heightScreen-this.r : this.pos.y 

        stroke(255)
        strokeWeight(2)
        fill(this.color[0],this.color[1],this.color[2])
        //text(this.name,this.pos.x,this.pos.y)
        ellipse(this.pos.x, this.pos.y, this.r)
        fill(25,0,70)
        text(this.name,this.pos.x,this.pos.y)
    }

    mouseDragged() {
        
        if (this.locked) {
            this.pos.x = mouseX - this.xOffSet*dt
            this.pos.y = mouseY - this.yOffSet*dt
        }
    }

    mouseReleased() {
 
        this.locked = false
    }

    mousePressed() {
        console.log(this.V)
        if (this.overBox) {
            this.locked = true
        }
        else {
            this.locked = false
        }
        this.xOffSet = (mouseX - this.pos.x)*dt
        this.yOffSet = (mouseY - this.pos.y)*dt
    }

    moving() {

        if (
            mouseX > this.pos.x - this.r &&
            mouseX < this.pos.x + this.r &&
            mouseY > this.pos.y - this.r &&
            mouseY < this.pos.y + this.r
        ) {
            this.overBox = true
 
            if (!this.locked) {
      
            }
        }
            else {
                this.overBox = false
      
            
        }
    }
}


function drawGrid() {
    stroke(255, 120)
    for (var i = 0; i < width; i += 20) {
        line(1, i, width, i)
        line(i, 1, i, height)

    }
}



function drawLines() {


    for (var i = 0; i <heightScreen; i++) {


        x = random(width);
        var xf = floor(x / (res));
        y = random(height);
        var yf = floor(y / (res));

        stroke(255, 255)
        line(x, y, x + grid_X[xf][yf], y + grid_Y[xf][yf])


    }
}



function setup() {
    createCanvas(widthScreen,heightScreen);

    grid_X = new Array(width / res);
    grid_Y = new Array(width / res);
    for (var i = 0; i < width / res; i++) {
        grid_X[i] = new Array(height / res);
        grid_Y[i] = new Array(height / res);
    }
    p1 = new Ball(200, 200, 'p1',[255,250,21], 32)
    p2 = new Ball(200, 100, 'p2',[15,255,13], 32)




}



function mousePressed() {
    // p1.pos.x = mouseX
    // p1.pos.y = mouseY

    p1.mousePressed()
   

    p2.mousePressed()
    
}

function mouseDragged() {
    p1.mouseDragged()
    p2.mouseDragged()
}

function mouseReleased() {
    p1.mouseReleased()
    p2.mouseReleased()
}


function draw() {
    background(0);



    p1 = Ex(p1)
    p2 = Ex(p2)
    p1.moving()
    p2.moving()

    p1.show()
    p2.show()
    showDdp(p1,p2)
    strokeWeight(1)
    drawGrid();

    stroke(255, 0, 0)
    strokeWeight(40)
    fill(211, 10)
    line(0,heightScreen, 0, 0)

    stroke(0, 0, 255)
    strokeWeight(40)
    fill(211, 10)
    line(widthScreen,heightScreen, widthScreen, 0)


}


