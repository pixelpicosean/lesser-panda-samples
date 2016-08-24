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
      .behave(VerticalMove, 'bVerticalMove', {
        range: 100,
        startPct: 0.5,
        useKeyboard: false,
      })
      .on('reachStart', function() {
        this.bVerticalMove.moveDown();
      })
      .on('reachEnd', function() {
        this.bVerticalMove.moveUp();
      });;
    vertical.sprite.scale.set(3);

    vertical.bVerticalMove.moveDown();

    const horizontal = this.spawnActor(Actor, 100, engine.height * 0.5, 'stage')
      .initSprite({
        texture: ['asteroids', 'shield'],
      })
      .behave(HorizontalMove, 'bHorizontalMove', {
        range: 160,
        startPct: 0,
        useKeyboard: false,
      })
      .on('reachStart', function() {
        this.bHorizontalMove.moveRight();
      })
      .on('reachEnd', function() {
        this.bHorizontalMove.moveLeft();
      });;
    horizontal.sprite.scale.set(3);

    horizontal.bHorizontalMove.moveRight();
  }
}

engine.addScene('TwoWayMoveSample', TwoWayMoveSample);
