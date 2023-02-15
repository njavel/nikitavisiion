let mic;

function setup() {
  createCanvas(710, 200);
  let bg = color(242,0,255);
  noStroke();
  fill(bg);
  background(bg);
  

  mic = new p5.AudioIn();

 
  mic.start();
}

function draw() {

  let vol = mic.getLevel();
  fill(127);
  stroke(0);

  let h = map(vol, 0, 1, height, 0);
  ellipse(width / 2, h - 25, 50, 50);
}
