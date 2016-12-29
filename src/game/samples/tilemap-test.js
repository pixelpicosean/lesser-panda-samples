import engine from 'engine/core';
import PIXI from 'engine/pixi';
import Scene from 'engine/scene';
import BackgroundMap from 'engine/tilemap/background-map';
import CollisionMap from 'engine/tilemap/collision-map';
import keyboard from 'engine/keyboard';
import loader from 'engine/loader';
import 'engine/level';

loader.addAsset('collision-16.png');

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
      .addGraphics({
        shape: 'Circle',
        color: 0xff0000,
        radius: 1,
      }, 'sprite')
    .initBody({
      mass: 0.8,
      damping: 0.999999,
      velocityLimit: { x: 100, y: 100 },
      collisionGroup: GROUPS.BOX,
      collideAgainst: [GROUPS.SOLID],
      collide: function(other, res) {
        if (other.collisionGroup === GROUPS.SOLID) {
          if ((this.velocity.y < 0 && res.overlapN.y < 0) ||
            this.velocity.y > 0 && res.overlapN.y > 0) {
            this.velocity.y = 0;
          }
          if (res.overlapN.y > 0 && res.overlapN.x !== 0) {
          }
          return true;
        }
      },
    });
  }
}
Actor.register('Box', Box);

class TilemapTestSample extends Scene {
  awake() {
    this.backgroundColor = 0xaaaaaa;

    this
      .createLayer('bottomLayer', 'stage')
      .createLayer('topLayer', 'stage');

    this.loadLevel([
      {
        type: 'tile',
        tilesize: 16,
        tileset: 'collision-16.png',
        data: [
          [1,1,1,1,1],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,0,0,3,1],
          [1,1,1,1,1],
        ],
        parent: 'bottomLayer',
      },
      {
        type: 'collision',
        tilesize: 16,
        data: [
          [1,1,1,1,1],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,0,0,3,1],
          [1,1,1,1,1],
        ],
      },
      {
        type: 'actor',
        container: 'bottomLayer',
        actors: [
          ['Box', 40, 40, { name: 'box' }],
        ],
      },
    ], {
      // collisionGroup: GROUPS.SOLID,
      container: 'bottomLayer',
    });

    // Create a box that collides with the tilemap
    this.box = this.getActorByName('box');

    keyboard.on('keydown', (k) => {
      if (k === 'UP') {
        this.box.body.velocity.y = -160;
      }
    });

    this.info = new PIXI.Text('', {
      font: '16px Verdana',
      fill: 'white',
    }, engine.resolution).addTo(this.topLayer);
    this.info.position.set(10, 100);
  }
  update(_, dt) {
    if (keyboard.down('LEFT') && !keyboard.down('RIGHT')) {
      this.box.body.velocity.x = -80;
    }
    else if (!keyboard.down('LEFT') && keyboard.down('RIGHT')) {
      this.box.body.velocity.x = 80;
    }
    else {
      // this.box.body.velocity.x = 0;
    }
  }
}

engine.addScene('TilemapTestSample', TilemapTestSample);
