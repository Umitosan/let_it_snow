/*jshint esversion: 6 */


function SnowAnim(someQuantity = 100) {
  this.quantity = someQuantity;
  this.flakes = undefined;
  this.windVel = 0;
  this.maxWindVel = 3;
  this.windUpdateDur = 500; // ms to wait before changing wind speed
  this.xBoundOffset = 50; // extra X pixels spawn area to make animation look better as wind blows flakes from off screen

  this.init = function() {
    this.flakes = [];
    for (let i = 0; i < this.quantity; i++) {
      this.addFlake('rand');
    }
  };

  this.addFlake = function(spawn = 'rand') {
    let randX, randY;
    if (spawn === 'rand') {
      randX = getRandomIntInclusive(-(this.xBoundOffset-2),canW+this.xBoundOffset-2);
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

  this.applyWind = function() {
    for (let i = 0; i < this.flakes.length; i++) {
      if (getRandomIntInclusive(1,3) !== 1 ) {
        this.flakes[i].x += this.windVel;
      }
    }
  };

  this.draw = function() {
    for (let i = 0; i < this.flakes.length; i++) {
      this.flakes[i].draw();
    }
  };

  this.update = function() {
    if ((performance.now() % this.windUpdateDur) <= 17) {
      if (getRandomIntInclusive(1,2) === 1) {
        this.windVel += getRandomIntInclusive(-1,1) * 0.5;
        if (this.windVel >= this.maxWindVel) { // control max wind velocity
          this.windVel = this.maxWindVel;
        } else if (this.windVel < -this.maxWindVel) {
          this.windVel = -this.maxWindVel;
        } else {
          // nothing
        }
      }
    }
    this.applyWind();
    for (let i = 0; i < this.flakes.length; i++) {
      this.flakes[i].update();
      // check bounds and destroy/create new flakes
      if ( (this.flakes[i].y > canH) || (this.flakes[i].x > (canW+this.xBoundOffset)) || (this.flakes[i].x < -this.xBoundOffset) ) {
        this.flakes.splice(i,1);
      }
    }
    if (this.flakes.length < this.quantity) {
      // check every 200 ms if another flake is needed then try to create one
      if ( ((performance.now() % 100) <= 18) ) {
        this.addFlake('top');
      }
    }
  };

} // END SNOW
