import engine from 'engine/core';
import PIXI from 'engine/pixi';
import Scene from 'engine/scene';

import HorizontalMove from 'behaviors/horizontal-move';
import VerticalMove from 'behaviors/vertical-move';

import { TEXTURES } from 'game/data';

class TwoWayMove extends Scene {
  constructor() {
    super();

    const textures = TEXTURES['asteroids'];

    this.vertical = new PIXI.Sprite(textures['power'])
      .addTo(this.stage);
    this.vertical.anchor.set(0.5);
    this.vertical.scale.set(3);
    this.vertical.position.set(40, engine.height * 0.5);
    new VerticalMove({
        range: 100,
        startPct: 0.5,
        useKeyboard: false,
      })
      .addTo(this.vertical, this)
      .activate()
      .on('reachStart', function() {
        this.target.moveDown();
      })
      .on('reachEnd', function() {
        this.target.moveUp();
      });
    this.vertical.moveDown();

    this.horizontal = new PIXI.Sprite(textures['shield'])
      .addTo(this.stage);
    this.horizontal.anchor.set(0.5);
    this.horizontal.scale.set(3);
    this.horizontal.position.set(100, engine.height * 0.5);
    new HorizontalMove({
        range: 160,
        startPct: 0,
        useKeyboard: false,
      })
      .addTo(this.horizontal, this)
      .activate()
      .on('reachStart', function() {
        this.target.moveRight();
      })
      .on('reachEnd', function() {
        this.target.moveLeft();
      });
    this.horizontal.moveRight();
  }
}

engine.addScene('TwoWayMove', TwoWayMove);
