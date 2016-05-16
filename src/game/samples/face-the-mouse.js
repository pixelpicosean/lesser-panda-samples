import engine from 'engine/core';
import Scene from 'engine/scene';

import Actor from 'engine/actor';

import FaceTheMouse from 'behaviors/face-the-mouse';

import { TEXTURES } from 'game/data';

class FaceTheMouseScene extends Scene {
  constructor() {
    super();

    this.spawnActor(Actor, engine.width * 0.5, engine.height * 0.5, 'stage')
      .initSprite({ texture: ['asteroids', 'shield'], scale: { x: 4, y: 4 } })
      .behave(FaceTheMouse);
  }
}

engine.addScene('FaceTheMouse', FaceTheMouseScene);
