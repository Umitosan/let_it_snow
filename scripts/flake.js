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
  this.curFlakeAngle = undefined;
  this.rotationVel = undefined;

  this.init = function() {
    this.radius = getRandomIntInclusive(5,20);
    this.pattern = this.getRandPattern(); // randPattern(size)
    this.yVel = getRandomIntInclusive(1,5) / 2;
    this.curFlakeAngle = getRandomIntInclusive(5,30);  // vary the rotation of the flake each time
    this.rotationVel = getRandomIntInclusive(0,2) * 0.01;  // vary the rotation speed
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
      // 1x 60 degree flake face face
      for (let j = 0; j < 6; j++) {
        ctx.rotate((j*60) * ( Math.PI / 180) + this.curFlakeAngle);
        ctx.beginPath();
        ctx.fillRect(-offset,-i*2,pixelSize,pixelSize);
        ctx.beginPath();
        ctx.fillRect(0,-i*2,pixelSize,pixelSize);
        ctx.beginPath();
        ctx.fillRect(offset,-i*2,pixelSize,pixelSize);
        ctx.rotate(-(j*60) * ( Math.PI / 180) - this.curFlakeAngle);
      }
    }
    ctx.restore();
  };

  this.update = function(windVel) {
    this.x += this.xVel;
    this.y += this.yVel;
    if (windVel < 0 ) {
      this.rotationVel = -Math.abs(this.rotationVel);
    } else {
      this.rotationVel = Math.abs(this.rotationVel);
    }
    this.curFlakeAngle += (this.rotationVel) + (windVel * 0.01);
  };

} // END FLAKETYPE1
