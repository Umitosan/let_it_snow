/*jshint esversion: 6 */


function SnowAnim(someQuantity) {
  this.quantity = someQuantity;
  this.flakes = undefined;

  this.init = function() {
    this.flakes = [];
    for (let i = 0; i < this.quantity; i++) {
      this.flakes.push( new Flake(x,y) );
    }
  };

  this.draw = function() {

  };

  this.update = function() {

  };

} // END SNOW
