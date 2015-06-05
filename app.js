var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
document.getElementById("screen").appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('http://pixijs.github.io/examples/_assets/basics/bunny.png');

var star = {
  position: {
    x: 400,
    y: 300
  },
  mass: 1000
};

var bunnies = [];
var frameCount = 0;

for(var i=0; i<5000; i++) {
  // create a new Sprite using the texture
  var bunny = new PIXI.Sprite(texture);

  // center the sprite's anchor point
  bunny.anchor.x = 0.5;
  bunny.anchor.y = 0.5;

  // move the sprite to the center of the screen
  bunny.position.x = 400;
  bunny.position.y = Math.random()*250 + 25;

  // set the initial velocity
  bunny.velocity = {};
  bunny.velocity.x = 31.5 / Math.sqrt(1*(star.position.y - bunny.position.y));//Math.random() * 5;
  bunny.velocity.y = 0;

  bunnies.push(bunny)
  stage.addChild(bunny);
}

var starBunny = new PIXI.Sprite(texture);
starBunny.position.x = 400;
starBunny.position.y = 300;
starBunny.anchor.x = 0.5;
starBunny.anchor.y = 0.5;
starBunny.scale.x = 3;
starBunny.scale.y = 3;
stage.addChild(starBunny);

// start animating
console.dir(bunnies[0]);
animate();
function animate() {
    requestAnimationFrame(animate);

    // just for fun, let's rotate mr rabbit a little
    for(var i=0; i<bunnies.length; i++) {

      bunny = bunnies[i];
      var delX = star.position.x - bunny.position.x;
      var delY = star.position.y - bunny.position.y; 
      var delVMultiplier = star.mass / Math.pow(Math.pow(delX, 2) + Math.pow(delY, 2), 1.5);
      var delVx = delX * delVMultiplier;
      var delVy = delY * delVMultiplier;

      bunny.velocity.x += delVx;
      bunny.velocity.y += delVy;

      bunny.position.x += bunny.velocity.x;
      bunny.position.y += bunny.velocity.y;
      if (frameCount === 1 && i === 5) {
        console.log("del X: ", delX)
        console.log("del Y: ", delY)
        console.log(delVMultiplier)
        console.log(delVx)
        console.log(delVy)
        console.log("bunny velocity: ", bunny.velocity)
      }

      // bunny.position.y += bunny.velocity.y;

      // if(bunny.position.y < 500.1 || bunny.velocity < 0) {
      //   bunny.velocity.y += 0.1;
      // };

      // if(bunny.position.y >= 500) {
      //   bunny.position.y = 500;
      //   bunny.velocity.y = Math.floor(bunny.velocity.y * -8) / 10;
      // }
    }
    starBunny.rotation += 0.1
    // render the container
    frameCount += 1
    renderer.render(stage);
}