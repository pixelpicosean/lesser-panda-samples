import engine from 'engine/core';
import Scene from 'engine/scene';

import Actor from 'engine/actor';

import FaceTheMouse from 'behaviors/face-the-mouse';

import 'game/data';

class FaceTheMouseSample extends Scene {
  constructor() {
    super();

    let base = this.spawnActor(Actor, engine.width * 0.5, engine.height * 0.5, 'stage')
      .initSprite({
        texture: 'tank-base',
      });

    let cannon = this.spawnActor(Actor, engine.width * 0.5, engine.height * 0.5, 'stage')
      .initSprite({
        texture: 'tank-cannon',
        anchor: { x: 0.36, y: 0.5 },
      })
      .behave(FaceTheMouse);
  }
}

engine.addScene('FaceTheMouseSample', FaceTheMouseSample);
