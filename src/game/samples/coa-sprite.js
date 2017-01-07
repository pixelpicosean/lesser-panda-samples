const core = require('engine/core');
const Game = require('engine/Game');
const loader = require('engine/loader');

const SystemGfx = require('engine/gfx');
const COASprite = require('engine/gfx/COASprite');

// Only need to load the scon file here
loader.add('someone', 'player.scon');

class SampleCOASprite extends Game {
  constructor() {
    super();

    this.addSystem(new SystemGfx());

    const me =  COASprite('someone', 'Player')
      .addTo(this.sysGfx.root);
    me.position.set(core.width / 2, core.height - 30);
    me.scale.multiply(0.5);
    me.play('walk');
  }
}

module.exports = SampleCOASprite;
