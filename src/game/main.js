import engine from 'engine/core';
import Scene from 'engine/scene';
import audio from 'engine/audio';
import loader from 'engine/loader';
import PIXI from 'engine/pixi';

// Loading scene
import 'game/loading';

// Scenes
// import 'game/samples/action';
// import 'game/samples/actor';
// import 'game/samples/anchor-to-screen';
// import 'game/samples/asteroids';
// import 'game/samples/face-the-mouse';
// import 'game/samples/physics';
// import 'game/samples/rotate-around';
// import 'game/samples/steering';
// import 'game/samples/tilemap';
// import 'game/samples/tilemap-collision';
// import 'game/samples/level';
// import 'game/samples/tiled-level';
// import 'game/samples/timer';
// import 'game/samples/two-way-move';
// import 'game/samples/tween';

import 'game/samples/tilemap-test';

class Main extends Scene {
  awake() {
    engine.setScene('TilemapTestSample');
  }
};
engine.addScene('Main', Main);

engine.startWithScene('Loading');
