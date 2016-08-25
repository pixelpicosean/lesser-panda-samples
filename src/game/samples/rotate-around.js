import engine from 'engine/core';
import Scene from 'engine/scene';
import Vector from 'engine/vector';

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
        center: Vector.create(engine.width * 0.5, engine.height * 0.5),
      });
  }
}

engine.addScene('RotateAroundSample', RotateAroundSample);
