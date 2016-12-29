const core = require('engine/core');
const Game = require('engine/Game');

const SystemGfx = require('engine/gfx');
const BitmapText = require('engine/gfx/BitmapText');

// Tween is supported by anime system
const SystemAnime = require('engine/anime');

class SampleTween extends Game {
  constructor() {
    super();

    this.addSystem(new SystemAnime());
    this.addSystem(new SystemGfx());

    const text = BitmapText({
      text: 'Lesser Panda',
      font: '16px KenPixel',
      position: { y: core.height / 2 },
      pivot: { y: 10 },
      align: 'center',
    }).addTo(this.sysGfx.root);
    this.info = text;

    // Both number and string text can be tweened
    this.sysAnime.tween(text)
      .to({ 'scale.x': 1.8, 'scale.y': 1.8 }, 120)
      .to({ 'scale.x': 1.5, 'scale.y': 1.5 }, 100)
      .repeat(2)
      .wait(600)
      .to({ 'scale.x': 1, 'scale.y': 1 }, 0)
      .to({ text: 'Made By Sean\nwith Love' }, 1600);
  }
  fixedUpdate(dt, sec) {
    super.fixedUpdate(dt, sec);

    this.info.x = core.width * 0.5 - this.info.width * 0.5;
  }
};

 module.exports = SampleTween;
