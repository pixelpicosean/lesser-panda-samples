import engine from 'engine/core';
import PIXI from 'engine/pixi';
import Scene from 'engine/scene';

import AnchorToScreen from 'behaviors/anchor-to-screen';

class AnchorToScreenScene extends Scene {
  constructor() {
    super();

    const text = new PIXI.extras.BitmapText('Left-Top', {
        font: '16px KenPixel',
      })
      .addTo(this.stage);
    new AnchorToScreen({
        left: '10%',
        top: '10%',
      })
      .addTo(text, this)
      .activate();

    const text2 = new PIXI.extras.BitmapText('Right-Bottom', {
        font: '16px KenPixel',
      })
      .addTo(this.stage);
    new AnchorToScreen({
        right: 140,
        bottom: 40,
      })
      .addTo(text2, this)
      .activate();
  }
}

engine.addScene('AnchorToScreen', AnchorToScreenScene);
