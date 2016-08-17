import engine from 'engine/core';
import PIXI from 'engine/pixi';
import Scene from 'engine/scene';
import BackgroundMap from 'engine/tilemap/background-map';
import CollisionMap from 'engine/tilemap/collision-map';
import keyboard from 'engine/keyboard';
import loader from 'engine/loader';
import tiledToMap from 'engine/level/tiled-to-map';

import Actor from 'engine/actor';

import { GROUPS } from 'game/data';

class Hero extends Actor {
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
Actor.register('Hero', Hero);

class TiledLevelSample extends Scene {
  awake() {
    this.backgroundColor = 0xaaaaaa;

    this
      .createLayer('bottomLayer', 'stage')
      .createLayer('topLayer', 'stage');

    // Convert Tiled JSON into LesserPanda level format
    let mapData = tiledToMap(loader.resources['pizza-boy.json'].data);

    // Load the converted map
    this.loadLevel(mapData, {
      collisionGroup: GROUPS.SOLID,
      container: 'bottomLayer',
    });

    // Get the hero instance
    this.hero = this.getActorByName('hero');

    keyboard.on('keydown', (k) => {
      if (k === 'UP') {
        this.hero.body.velocity.y = -160;
      }
    });
  }
  update(_, dt) {
    if (keyboard.down('LEFT') && !keyboard.down('RIGHT')) {
      this.hero.body.velocity.x = -80;
    }
    else if (!keyboard.down('LEFT') && keyboard.down('RIGHT')) {
      this.hero.body.velocity.x = 80;
    }
    else {
      this.hero.body.velocity.x = 0;
    }
  }
}

engine.addScene('TiledLevelSample', TiledLevelSample);
