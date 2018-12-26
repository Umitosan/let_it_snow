/*jshint esversion: 6 */


function SnowAnim(someQuantity) {
  this.quantity = someQuantity;
  this.flakes = undefined;

  this.init = function() {
    this.flakes = [];
    for (let i = 0; i < this.quantity; i++) {
      this.addFlake('rand');
    }
  };

  this.addFlake = function(spawn = 'rand') {
    let randX, randY;
    if (spawn === 'rand') {
      randX = getRandomIntInclusive(0,canW);
      randY = getRandomIntInclusive(0,canH);
    } else if (spawn === 'top') {
      randX = getRandomIntInclusive(0,canW);
      randY = 0;
    } else {
      console.log('invalid addFlake args');
    }
    let newF = new Flake(randX,randY);
    newF.init();
    this.flakes.push( newF );
  };

  this.draw = function() {
    for (let i = 0; i < this.flakes.length; i++) {
      this.flakes[i].draw();
    }
  };

  this.update = function() {
    for (let i = 0; i < this.flakes.length; i++) {
      this.flakes[i].update();
      if (this.flakes[i].y > canH) {
        this.flakes.splice(i,1);
      }
    }
    if (this.flakes.length < this.quantity) {
      // check every 200 ms if another flake is needed then try to create one
      if ( ((performance.now() % 100) <= 18) && (getRandomIntInclusive(1,2) === 1) ) {
        this.addFlake('top');
      }
    }
  };

} // END SNOW
