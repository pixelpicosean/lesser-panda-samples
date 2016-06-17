import engine from 'engine/core';
import Scene from 'engine/scene';

import Actor from 'engine/actor';

import HorizontalMove from 'behaviors/horizontal-move';
import VerticalMove from 'behaviors/vertical-move';

import 'game/data';

class TwoWayMoveSample extends Scene {
  constructor() {
    super();

    const vertical = this.spawnActor(Actor, 40, engine.height * 0.5, 'stage')
      .initSprite({
        texture: ['asteroids', 'power'],
      })
      .behave(VerticalMove, {
        range: 100,
        startPct: 0.5,
        useKeyboard: false,
      })
      .on('reachStart', function() {
        this.behaviors['VerticalMove'].moveDown();
      })
      .on('reachEnd', function() {
        this.behaviors['VerticalMove'].moveUp();
      });;
    vertical.sprite.scale.set(3);

    vertical.behaviors['VerticalMove'].moveDown();

    const horizontal = this.spawnActor(Actor, 100, engine.height * 0.5, 'stage')
      .initSprite({
        texture: ['asteroids', 'shield'],
      })
      .behave(HorizontalMove, {
        range: 160,
        startPct: 0,
        useKeyboard: false,
      })
      .on('reachStart', function() {
        this.behaviors['HorizontalMove'].moveRight();
      })
      .on('reachEnd', function() {
        this.behaviors['HorizontalMove'].moveLeft();
      });;
    horizontal.sprite.scale.set(3);

    horizontal.behaviors['HorizontalMove'].moveRight();
  }
}

engine.addScene('TwoWayMoveSample', TwoWayMoveSample);
