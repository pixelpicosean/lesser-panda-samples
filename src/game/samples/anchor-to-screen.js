import engine from 'engine/core';
import Scene from 'engine/scene';

import Actor from 'engine/actor';

import AnchorToScreen from 'behaviors/anchor-to-screen';

import { TEXTURES } from 'game/data';

class AnchorToScreenScene extends Scene {
  constructor() {
    super();

    const leftTop = this.spawnActor(Actor, 0, 0, 'stage')
      .initSprite(TEXTURES['asteroids']['shield'])
      .behave(AnchorToScreen, {
        left: '20%',
        right: '60%',
        top: '20%',
      });

    const rightTop = this.spawnActor(Actor, 0, 0, 'stage')
      .initSprite(TEXTURES['asteroids']['power'])
      .behave(AnchorToScreen, {
        right: '20%',
        top: '20%',
      });

    const leftBottom = this.spawnActor(Actor, 0, 0, 'stage')
      .initSprite(TEXTURES['asteroids']['power'])
      .behave(AnchorToScreen, {
        left: '20%',
        bottom: '20%',
      });

    const rightBottom = this.spawnActor(Actor, 0, 0, 'stage')
      .initSprite(TEXTURES['asteroids']['shield'])
      .behave(AnchorToScreen, {
        right: '20%',
        bottom: '20%',
      });
  }
}

engine.addScene('AnchorToScreen', AnchorToScreenScene);
