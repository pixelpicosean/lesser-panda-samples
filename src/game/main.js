import engine from 'engine/core';
import Scene from 'engine/scene';
import audio from 'engine/audio';
import loader from 'engine/loader';
import PIXI from 'engine/pixi';

// Include device patches you need
import 'engine/device-patch';

// Loading scene
import 'game/loading';

// Scenes
// import 'game/samples/asteroids';
// import 'game/samples/anchor-to-screen';
// import 'game/samples/two-way-move';
// import 'game/samples/tilemap';
// import 'game/samples/timer';
import 'game/samples/actor';

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

class Main extends Scene {
  awake() {
    engine.setScene('Actor');
  }
};
engine.addScene('Main', Main);

engine.startWithScene('Loading');
