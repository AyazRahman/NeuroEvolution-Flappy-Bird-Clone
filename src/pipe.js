class Pipe {
  constructor() {
    this.bottom = 150;
    this.top = random(height - this.bottom);
    this.x = width;
    this.w = 20;
    this.speed = 3;

    this.highlight = false;
  }

  hits(bird) {
    if (
      bird.x + bird.radius > this.x &&
      bird.x - bird.radius < this.x + this.w
    ) {
      if (
        bird.y - bird.radius < this.top ||
        bird.y + bird.radius > this.top + this.bottom
      ) {
        this.highlight = true;
        return true;
      } else {
        bird.score += 1;
      }
    }
    this.highlight = false;

    return false;
  }

  show() {
    fill(255);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(
      this.x,
      this.top + this.bottom,
      this.w,
      height - this.top - this.bottom
    );
  }

  update() {
    this.x -= this.speed;
  }

  offScreen() {
    return this.x < -this.w;
  }
}
