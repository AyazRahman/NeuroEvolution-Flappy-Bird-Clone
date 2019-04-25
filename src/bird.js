class Bird {
  constructor(brain) {
    this.y = height / 2;
    this.x = 64;
    this.radius = 16;

    this.gravity = 0.6;
    this.lift = -15;
    this.velocity = 0;

    this.score = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }
  }

  closestPipe(pipes) {
    let closest = null;
    let closestDist = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let dist = pipes[i].x - this.x;
      if (dist < closestDist && dist > 0) {
        closest = pipes[i];
        closestDist = dist;
      }
    }
    return closest;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  think(pipes) {
    let pipe = this.closestPipe(pipes);
    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = pipe.top / height;
    inputs[2] = pipe.top / height + pipe.bottom / height;
    inputs[3] = pipe.x / width;
    inputs[4] = pipe.x / width + pipe.w / width;

    let output = this.brain.predict(inputs);
    if (output[0] > output[1]) {
      this.up();
    }
  }

  up() {
    this.velocity += this.lift;
  }

  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}
