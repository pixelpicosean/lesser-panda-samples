const core = require('engine/core');
const Game = require('engine/Game');

const Loading = require('game/Loading');

// Samples
const SampleEntity = require('game/samples/entity');
const SampleTimer = require('game/samples/timer');
const SampleTween = require('game/samples/tween');
const SamplePhysics = require('game/samples/physics');

// const SampleAction = require('game/samples/action');
// const SampleAnchorToScreen = require('game/samples/anchor-to-screen');
// const SampleAsteroids = require('game/samples/asteroids');
// const SampleFaceTheMouse = require('game/samples/face-the-mouse');
// const SampleRotateAround = require('game/samples/rotate-around');
// const SampleSteering = require('game/samples/steering');
// const SampleTilemap = require('game/samples/tilemap');
// const SampleTilemapCollision = require('game/samples/tilemap-collision');
// const SampleTwoWayMove = require('game/samples/two-way-move');

class Boot extends Game {
  awake() {
    // Initialize anything before you game start here
    // i.e. Storage, API...
    //
    // NOTE: This game class is not required but easier to use
    //       in most cases.

    // Switch to a sample game
    core.setGame(SamplePhysics);
  }
};

// `Boot` is the first game to start after loading complete
// `Loading` is just a special `Game` that shows loading progress
core.main(Boot, Loading);
