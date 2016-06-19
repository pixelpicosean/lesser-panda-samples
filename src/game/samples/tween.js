import engine from 'engine/core';
import Scene from 'engine/scene';
import PIXI from 'engine/pixi';
import Timer from 'engine/timer';
import loader from 'engine/loader';

// Import `animation` module to be able to use tween animation
import 'engine/animation';

class TweenSample extends Scene {
  constructor() {
    super();

    // PIXI instance
    const text = new PIXI.extras.BitmapText('Lesser Panda', {
      font: '24px KenPixel',
    }).addTo(this.stage);
    text.y = engine.height * 0.5;
    text.pivot.y = 20;
    this.info = text;

    // Both number and string text can be tweened
    this.tween(text)
      .to({ 'scale.x': 1.5, 'scale.y': 1.5 }, 120)
      .to({ 'scale.x': 1.0, 'scale.y': 1.0 }, 120)
      .repeat(3)
      .wait(600)
      .to({ text: 'Made By Sean with Love' }, 1600);
  }
  update(deltaMS, deltaSec) {
    this.info.x = engine.width * 0.5 - this.info.width * 0.5;
  }
};

 engine.addScene('TweenSample', TweenSample);
