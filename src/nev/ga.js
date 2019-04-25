function nextGeneration() {
  let bestBirds = savedBirds
    .sort(function(a, b) {
      return b.score - a.score;
    })
    .splice(0, 10);

  for (let i = 0; i < savedBirds.length; i++) {
    //savedBirds[i].brain.mutate(0.1);
    savedBirds[i].brain.dispose();
  }
  savedBirds = [];

  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird(bestBirds[i % 10].brain);
    birds[i].brain.mutate(0.1);
  }
  for (let i = 0; i < bestBirds.length; i++) {
    //bestBirds[i].brain.mutate(0.1);
    bestBirds[i].brain.dispose();
  }

  savedBirds = [];
  pipes = [];
  pipes.push(new Pipe());
  counter = 0;
}

//savedBirds.sort(function(a,b){return b.score-a.score})
