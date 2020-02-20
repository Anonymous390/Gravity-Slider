
// CREATE GLOBAL VARIABLES
// For Engine, World, Bodies and any other that you have in mind to make your coding life easier.
// remember to create an array of boxes.
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var ground;
var boxes = [];
var gSlider;
var gSlider2;
var test;
 
 
function setup() {
    createCanvas(400, 400);

    // Create an instance of Engine, World
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
 
    // A slider is already created for you here. This slider will dictate the gravity of the world
    gSlider = createSlider(0, 100, 50);
    gSlider.position(10, 365);
    gSlider.input = map(engine.world.gravity, gSlider.min, gSlider.max, 0, 1);

 
    // Create a ground rectangle that would hold all the boxes and add it to the world.
    var ground_options = {
        isStatic: true
    }
    ground = Bodies.rectangle(200, height - 50, width, 10, ground_options);
    World.add(world, ground);
}
 
function mousePressed() {
    if (mouseY < 350) {
        boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)));
    }
}
 
function draw() {


    // Draw all the elements including the slider that 
    Engine.update(engine);

    background(51);
    // This is the value of your gravity. You can optionally show it to the viewer.
    var fVal = gSlider.value();

    fill(255);
    textSize(15);
    text("Gravity = " + fVal, 160, 381);   

    rectMode(CENTER);
    rect(ground.position.x,ground.position.y, 400, 20);
 
    // Use a for loop to show all the boxes
    for(var i = 0; i < boxes.length; i++){
        boxes[i].show();
    }
}
 

// You can either create a file for the class Box or build a simple function that creates one box at a time.
// I have gone for the second option.
function Box(x, y, w, h, options) {

    // add options such as friction and restitution. Experiment with the values
    var options = {
        restitution: 0.5
    }
 
    // create your box using the function arguments
    // x - x-coordinate
    // y - y-coordinate
    // w - width of the box
    // h - height of the box
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
   

    // Create a show method which will draw the box every time it is called inside the draw method.
    // remember to push and pop.
    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
 
        push();
        rectMode(CENTER);
        fill(255);
        rect(pos.x,pos.y, this.w, this.h);
        pop();
    }
}