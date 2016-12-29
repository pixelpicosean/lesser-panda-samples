const core = require('engine/core');
const Game = require('engine/Game');

const Loading = require('game/Loading');

// Samples
const SampleEntity = require('game/samples/entity');
// const SampleAction = require('game/samples/action');
// const SampleAnchorToScreen = require('game/samples/anchor-to-screen');
// const SampleAsteroids = require('game/samples/asteroids');
// const SampleFaceTheMouse = require('game/samples/face-the-mouse');
// const SamplePhysics = require('game/samples/physics');
// const SampleRotateAround = require('game/samples/rotate-around');
// const SampleSteering = require('game/samples/steering');
// const SampleTilemap = require('game/samples/tilemap');
// const SampleTilemapCollision = require('game/samples/tilemap-collision');
// const SampleLevel = require('game/samples/level');
// const SampleTiledLevel = require('game/samples/tiled-level');
// const SampleTimer = require('game/samples/timer');
// const SampleTwoWayMove = require('game/samples/two-way-move');
// const SampleTween = require('game/samples/tween');

class Boot extends Game {
  awake() {
    // Initialize anything before you game start here
    // i.e. Storage, API...
    //
    // NOTE: This game class is not required but easier to use
    //       in most cases.

    // Switch to a sample game
    core.setGame(SampleEntity);
  }
};

// `Boot` is the first game to start after loading complete
// `Loading` is just a special `Game` that shows loading progress
core.main(Boot, Loading);
