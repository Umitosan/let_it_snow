/*jshint esversion: 6 */


function FlakeType1(x,y) {
  this.x = x;
  this.y = y;
  this.xVel = 0;
  this.yVel = undefined;
  this.radius = undefined;
  this.pattern = undefined;

  this.init = function() {
    this.radius = getRandomIntInclusive(5,30);
    this.pattern = this.getRandPattern(); // randPattern(size)
    this.yVel = getRandomIntInclusive(1,5) / 2;
  };

  this.getRandPattern = function() {
    let newPat = [];
    for (let i = 0; i < this.radius; i++) {
      newPat.push(getRandomIntInclusive(1,this.radius/2));
    }
    return newPat;
  };

  this.draw = function() {
    let pixelSize = 2;
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.fillStyle = 'white';
    // center pixel
    ctx.beginPath();
    ctx.fillRect(0,0,pixelSize,pixelSize); // x y width height
    for (let i = 0; i < this.pattern.length; i++) {
      let offset = this.pattern[i];
      // top
      ctx.beginPath();
      ctx.fillRect(-offset,-i,pixelSize,pixelSize);
      ctx.beginPath();
      ctx.fillRect(0,-i,pixelSize,pixelSize);
      ctx.beginPath();
      ctx.fillRect(offset,-i,pixelSize,pixelSize);
      // bot
      ctx.beginPath();
      ctx.fillRect(-offset,i,pixelSize,pixelSize);
      ctx.beginPath();
      ctx.fillRect(0,i,pixelSize,pixelSize);
      ctx.beginPath();
      ctx.fillRect(offset,i,pixelSize,pixelSize);
      // left
      ctx.beginPath();
      ctx.fillRect(-i,-offset,pixelSize,pixelSize);
      ctx.beginPath();
      ctx.fillRect(-i,0,pixelSize,pixelSize);
      ctx.beginPath();
      ctx.fillRect(-i,offset,pixelSize,pixelSize);
      // left
      ctx.beginPath();
      ctx.fillRect(i,-offset,pixelSize,pixelSize);
      ctx.beginPath();
      ctx.fillRect(i,0,pixelSize,pixelSize);
      ctx.beginPath();
      ctx.fillRect(i,offset,pixelSize,pixelSize);
    }
    ctx.restore();
  };

  this.update = function() {
    this.x += this.xVel;
    this.y += this.yVel;
  };

} // END FLAKETYPE1


function FlakeType2(x,y) {
  this.x = x;
  this.y = y;
  this.xVel = 0;
  this.yVel = undefined;
  this.radius = undefined;
  this.pattern = undefined;
  this.randomFlakeAngle = undefined;

  this.init = function() {
    this.radius = getRandomIntInclusive(5,20);
    this.pattern = this.getRandPattern(); // randPattern(size)
    this.yVel = getRandomIntInclusive(1,5) / 2;
    this.randomFlakeAngle = getRandomIntInclusive(5,30);  // vary the rotation of the flake each time
  };

  this.getRandPattern = function() {
    let newPat = [];
    for (let i = 0; i < this.radius; i++) {
      newPat.push(getRandomIntInclusive(1,this.radius/2));
    }
    return newPat;
  };

  this.draw = function() {
    let pixelSize = 2;
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.fillStyle = 'white';
    // center pixel
    ctx.beginPath();
    ctx.fillRect(0,0,pixelSize,pixelSize); // x y width height
    for (let i = 0; i < this.pattern.length; i++) {
      let offset = this.pattern[i];
      // 1 60 degree face
      for (let j = 0; j < 6; j++) {
        ctx.rotate((j*60) * ( Math.PI / 180) + this.randomFlakeAngle);
        ctx.beginPath();
        ctx.fillRect(-offset,-i*2,pixelSize,pixelSize);
        ctx.beginPath();
        ctx.fillRect(0,-i*2,pixelSize,pixelSize);
        ctx.beginPath();
        ctx.fillRect(offset,-i*2,pixelSize,pixelSize);
        ctx.rotate(-(j*60) * ( Math.PI / 180) - this.randomFlakeAngle);
      }
    }
    ctx.restore();
  };

  this.update = function() {
    this.x += this.xVel;
    this.y += this.yVel;
  };

} // END FLAKETYPE1
