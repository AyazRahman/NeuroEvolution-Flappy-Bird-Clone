const TOTAL = 100;

var birds = [];
var savedBirds = [];
var pipes = [];
var counter = 0;

function setup() {
  /* scoreElem = createDiv();
  scoreElem.position(20, 20);
  scoreElem.id = "score";
  scoreElem.style("font-weight", "bold"); */
  tf.setBackend("cpu");
  createCanvas(400, 600);
  resetSketch();
  //pipes.push(new Pipe());
}

function draw() {
  counter++;
  background(0);

  if (counter % 100 == 0) {
    pipes.push(new Pipe());
  }

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].offScreen()) {
      pipes.splice(i, 1);
    }
  }
  for (let bird of birds) {
    if (counter % 50 == 0) {
      bird.score++;
      /*  scoreElem.html("Score : " + this.bird.score); */
    }
    bird.think(pipes);
    bird.update();
    bird.show();
    for (let i = birds.length - 1; i >= 0; i--) {
      if (hit(birds[i])) {
        savedBirds.push(birds.splice(i, 1)[0]);
      }
    }
  }

  if (!birds.length) {
    nextGeneration();
  }
}

function hit(bird) {
  if (bird.y - bird.radius < 0 || bird.y + bird.radius > height) {
    return true;
  } else {
    for (var i = 0; i < pipes.length; i++) {
      if (pipes[i].hits(bird)) {
        return true;
      }
    }
  }
  return false;
}

/* function gameOver() {
  scoreElem.style("color", "red");
  scoreElem.html("Game Over. Final score : " + this.bird.score);
  noLoop();
} */

function keyPressed() {
  /*if (key == " ") {
    bird.up();
  } else*/ if (keyCode === ENTER) {
    this.bird.brain.dispose();
    resetSketch();
    loop();
  }
}

function resetSketch() {
  clear();
  /* this.pipes = [];
  scoreElem.remove();
   */
  birds = [];
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
  pipes = [];
  pipes.push(new Pipe());
  counter = 0;
  /* scoreElem.html("Score : " + this.bird.score);
  scoreElem.style("color", "white"); */
}
