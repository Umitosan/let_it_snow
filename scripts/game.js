/*jshint esversion: 6 */


function Game(updateDur) {
  this.timeGap = 0;
  this.lastUpdate = 0;
  this.lastDirKeyX = undefined;
  this.lastDirKeyY = undefined;
  this.updateDuration = updateDur; // milliseconds duration between update()
  this.paused = false;
  this.bg = new Image();
  this.pausedTxt = undefined;
  this.mode = 'init';
  this.mySnowAnim = undefined;

  this.init = function() {
    this.bg.src = 'hood.jpg';
    let sa = new SnowAnim();
    sa.init();
    this.mySnowAnim = sa;
    this.lastUpdate = performance.now();
  };

  this.pauseIt = function() {
    myGame.paused = true;
  };
  this.unpauseIt = function() {
    myGame.paused = false;
    this.lastUpdate = performance.now();
    this.timeGap = 0;
  };

  this.resize = function() {
    console.log('game time to resize, making new SnowAnim');
    let sa = new SnowAnim();
    sa.init();
    this.mySnowAnim = sa;
  };

  this.drawBG = function() { // display background over canvas
    ctx.imageSmoothingEnabled = false;  // turns off AntiAliasing
    ctx.drawImage(this.bg,0,0,CANVAS.width,CANVAS.height);
  };

  this.draw = function() {
    this.drawBG();
    this.mySnowAnim.draw();
  }; // end draw

  this.update = function() {
      if (this.paused === false) { // performance based update: myGame.update() runs every myGame.updateDuration milliseconds
            this.timeGap = performance.now() - this.lastUpdate;

            if ( this.timeGap >= this.updateDuration ) { // this update is restricted to updateDuration
              let timesToUpdate = this.timeGap / this.updateDuration;
              for (let i=1; i < timesToUpdate; i++) { // update children objects
                // if (timesToUpdate > 2) {
                //   console.log('timesToUpdate = ', timesToUpdate);
                // }
                // general update area
                this.mySnowAnim.update();
              }
              this.lastUpdate = performance.now();
            } // end if

            // if (this.mode === "draw") { // run this every update cycle regardless of timing
            //   // general draw area
            // } else {
            //   // mode is none
            // }

      } else if (this.paused === true) {
        // PAUSED! do nothin
      } else {
        console.log('game pause issue');
      }

  }; // end update

} // end myGame
