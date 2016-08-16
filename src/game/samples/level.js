import engine from 'engine/core';
import PIXI from 'engine/pixi';
import Scene from 'engine/scene';
import BackgroundMap from 'engine/tilemap/background-map';
import CollisionMap from 'engine/tilemap/collision-map';
import keyboard from 'engine/keyboard';
import loader from 'engine/loader';
import 'engine/level';

import Actor from 'engine/actor';

import { GROUPS } from 'game/data';

class Box extends Actor {
  constructor() {
    super();

    this.initGraphics({
      shape: 'Box',
      color: 0xfff4ed,
      width: 12,
      height: 20,
    })
    .initBody({
      mass: 0.4,
      velocityLimit: { x: 200, y: 200 },
      collisionGroup: GROUPS.BOX,
      collideAgainst: [GROUPS.SOLID],
      collide: function(other, res) {
        if (other.collisionGroup === GROUPS.SOLID) {
          if ((this.velocity.y < 0 && res.overlapN.y < 0) ||
            this.velocity.y > 0 && res.overlapN.y > 0) {
            this.velocity.y = 0;
          }
          return true;
        }
      },
    });
  }
}
Actor.register('Box', Box);

class LevelSample extends Scene {
  awake() {
    this.backgroundColor = 0xaaaaaa;

    this
      .createLayer('bottomLayer', 'stage')
      .createLayer('topLayer', 'stage');

    this.loadLevel([
      {
        type: 'tile',
        tilesize: 16,
        tileset: 'pizza-boy.png',
        data: [
          [45,46,46,46,46,46,46,47],
          [ 0, 0, 0, 0, 0, 0, 0, 0],
          [ 0, 0, 0, 0, 0, 0, 0, 0],
          [ 0, 0, 0, 0, 0, 0, 0, 0],
          [45,46,46,46,46,46,46,47],
        ],
        parent: 'bottomLayer',
      },
      {
        type: 'collision',
        tilesize: 16,
        data: [
          [1,1,1,1,1,1,1,1],
          [1,0,0,0,0,0,0,1],
          [1,0,0,0,0,0,0,1],
          [1,0,0,0,0,0,0,1],
          [1,1,1,1,1,1,1,1],
        ],
        parent: 'bottomLayer',
      },
      {
        type: 'actor',
        container: 'bottomLayer',
        actors: [
          ['Box', 40, 40, { name: 'box' }],
        ],
      },
    ], {
      collisionGroup: GROUPS.SOLID,
      container: 'bottomLayer',
    });

    // Create a box that collides with the tilemap
    this.box = this.getActorByName('box');

    keyboard.on('keydown', (k) => {
      if (k === 'UP') {
        this.box.body.velocity.y = -160;
      }
    });
  }
  update(_, dt) {
    if (keyboard.down('LEFT') && !keyboard.down('RIGHT')) {
      this.box.body.velocity.x = -80;
    }
    else if (!keyboard.down('LEFT') && keyboard.down('RIGHT')) {
      this.box.body.velocity.x = 80;
    }
    else {
      this.box.body.velocity.x = 0;
    }
  }
}

engine.addScene('LevelSample', LevelSample);
