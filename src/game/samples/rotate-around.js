import engine from 'engine/core';
import Scene from 'engine/scene';

import Actor from 'engine/actor';

import RotateAroundPoint from 'behaviors/rotate-around-point';

import { TEXTURES } from 'game/data';

class RotateAroundScene extends Scene {
  constructor() {
    super();

    this.spawnActor(Actor, engine.width * 0.5, 20, 'stage')
      .initSprite({ texture: ['asteroids', 'shield'], scale: { x: 4, y: 4 } })
      .behave(RotateAroundPoint, {
        center: { x: engine.width * 0.5, y: engine.height * 0.5 },
      });
  }
}

engine.addScene('RotateAround', RotateAroundScene);