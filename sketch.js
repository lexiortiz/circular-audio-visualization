let sound;
let amp;
let volHistory = [];
let button;

// Toggle to pause or play sound
function toggleSong() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.play();
  }
}

// Load sound file before setup() function runs
function preload() {
  // Load the sound file
  sound = loadSound("forestdark-compressed.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
  // blendMode(DODGE);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  // Loop the sound continuously
  sound.loop();
  
  // Create Amplitude object
  amp = new p5.Amplitude ();

  noStroke();
}

function draw() {
  let blk = color('rgba(18, 19, 23, 0.1)');
  background(blk);
  let vol = amp.getLevel();
  volHistory.push(vol);
  
//   let offsetX = map(mouseX, 0, width, 20, -20);
//   let offsetY = map(mouseY, 0, height, 20, -20);
  
//   drawingContext.shadowOffsetX = offsetX;
//   drawingContext.shadowOffsetY = offsetY;
//   drawingContext.shadowBlur = 12;
//   drawingContext.shadowColor = color('rgba(18, 19, 10, 1)');
  noFill(); 
  translate(width / 2, height / 2);
  beginShape();
  for (let i = 1; i < 360; i++) {
    // map(value, start1, stop1, start2, stop2, [withinBounds])
    let r = map(volHistory[i], 0, 1, 10, height / 2);
    let x = r * cos(i);
    let y = r * sin(i);
    stroke(i, 255, 255);
    strokeWeight(1);
    line(0, 0, x, y);
  }
  endShape();
  
  if (volHistory.length > 360) {
    volHistory.splice(0, 1);
  }
  
  // stroke(255);
  // ellipse(0, 0, 200, vol - 200);
}
