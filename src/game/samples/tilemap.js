import engine from 'engine/core';
import Scene from 'engine/scene';
import BackgroundMap from 'engine/tilemap/background-map';
import loader from 'engine/loader';
import keyboard from 'engine/keyboard';

const LAYER_1 = [
  [86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  6,  7,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 25, 26, 27,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
];
const LAYER_2 = [
  [31, 32,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 31, 32],
  [51, 52,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 51, 52],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [71, 72, 73, 74, 75, 74, 74, 74, 74, 76,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [91, 92, 154, 154, 95, 154, 154, 154, 154, 96, 71, 72, 73, 74, 75, 74, 73, 73, 74, 76],
  [151, 154, 154, 130, 150, 154, 154, 154, 154, 156, 91, 92, 93, 94, 95, 154, 154, 112, 154, 156],
];

class TilemapSample extends Scene {
  awake() {
    this.backgroundColor = 0xaaaaaa;

    this
      .createLayer('bottomLayer', 'stage')
      .createLayer('topLayer', 'stage');

    this.bg0 = new BackgroundMap(16, LAYER_1, loader.getTexture('pizza-boy.png')).addTo(this.bottomLayer);
    this.bg1 = new BackgroundMap(16, LAYER_2, loader.getTexture('pizza-boy.png')).addTo(this.bottomLayer);

    // Let the maps repeat
    this.bg0.isRepeat = true;
    this.bg1.isRepeat = true;
  }
  update(_, sec) {
    if (keyboard.down('LEFT')) {
      this.bg0.position.x = this.bg1.position.x = this.bg0.position.x - 40 * sec;
    }
    else if (keyboard.down('RIGHT')) {
      this.bg0.position.x = this.bg1.position.x = this.bg0.position.x + 40 * sec;
    }
    if (keyboard.down('UP')) {
      this.bg0.position.y = this.bg1.position.y = this.bg0.position.y - 40 * sec;
    }
    else if (keyboard.down('DOWN')) {
      this.bg0.position.y = this.bg1.position.y = this.bg0.position.y + 40 * sec;
    }
  }
}

engine.addScene('TilemapSample', TilemapSample);
