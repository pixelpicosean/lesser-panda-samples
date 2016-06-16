import engine from 'engine/core';
import Scene from 'engine/scene';

import Actor from 'engine/actor';

import RotateAroundPoint from 'behaviors/rotate-around-point';

import 'game/data';

class RotateAroundSample extends Scene {
  constructor() {
    super();

    this.spawnActor(Actor, engine.width * 0.5, 20, 'stage')
      .initSprite({
        texture: ['asteroids', 'shield'],
        scale: { x: 2, y: 2 },
      })
      .behave(RotateAroundPoint, {
        center: { x: engine.width * 0.5, y: engine.height * 0.5 },
      });
  }
}

engine.addScene('RotateAroundSample', RotateAroundSample);
