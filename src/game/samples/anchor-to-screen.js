import engine from 'engine/core';
import Scene from 'engine/scene';

import Actor from 'engine/actor';

import AnchorToScreen from 'behaviors/anchor-to-screen';

import 'game/data';

class AnchorToScreenSample extends Scene {
  constructor() {
    super();

    const leftTop = this.spawnActor(Actor, 0, 0, 'stage')
      .initSprite({
        texture: ['asteroids', 'shield'],
        anchor: { x: 0.5, y: 0.5 },
      })
      .behave(AnchorToScreen, {
        left: '20%',
        top: '20%',
      });

    const rightTop = this.spawnActor(Actor, 0, 0, 'stage')
      .initSprite({
        texture: ['asteroids', 'power'],
        anchor: { x: 0.5, y: 0.5 },
      })
      .behave(AnchorToScreen, {
        right: '20%',
        top: '20%',
      });

    const leftBottom = this.spawnActor(Actor, 0, 0, 'stage')
      .initSprite({
        texture: ['asteroids', 'power'],
        anchor: { x: 0.5, y: 0.5 },
      })
      .behave(AnchorToScreen, {
        left: '20%',
        bottom: '20%',
      });

    const rightBottom = this.spawnActor(Actor, 0, 0, 'stage')
      .initSprite({
        texture: ['asteroids', 'shield'],
        anchor: { x: 0.5, y: 0.5 },
      })
      .behave(AnchorToScreen, {
        right: '20%',
        bottom: '20%',
      });
  }
}

engine.addScene('AnchorToScreenSample', AnchorToScreenSample);
