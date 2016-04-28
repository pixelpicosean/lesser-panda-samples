import engine from 'engine/core';
import Scene from 'engine/scene';

import Actor from 'engine/actor';

import { TEXTURES, GROUPS } from 'game/data';

class MyActor extends Actor {
  constructor() {
    super();

    this.initGraphics({
      shape: 'Box',
      width: 10,
      height: 10,
      color: 0xff2f62,
    })
    .initBody({
      mass: 0.2,
      collisionGroup: GROUPS.BOX,
      collideAgainst: [GROUPS.SOLID],
    });
  }
}

class Actors extends Scene {
  constructor() {
    super();

    let box1 = this.spawnActor(Actor, 100, 160, 'stage')
      .initGraphics({
        shape: 'Box',
        width: 64,
        height: 10,
        color: 0xcdced1,
      })
      .initBody({
        collisionGroup: GROUPS.SOLID,
      });

    let box2 = this.spawnActor(MyActor, 100, 100, 'stage');
  }
}

engine.addScene('Actors', Actors);
