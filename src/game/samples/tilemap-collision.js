import engine from 'engine/core';
import PIXI from 'engine/pixi';
import Scene from 'engine/scene';
import BackgroundMap from 'engine/tilemap/background-map';
import CollisionMap from 'engine/tilemap/collision-map';
import keyboard from 'engine/keyboard';
import loader from 'engine/loader';

import Actor from 'engine/actor';

import { GROUPS } from 'game/data';

const LAYER_1 = [
  [86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  6,  7,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 25, 26, 27,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
  [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65],
];
const LAYER_2 = [
  [31, 32,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 31, 32],
  [51, 52,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 51, 52],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [71, 72, 73, 74, 75, 74, 74, 74, 74, 76,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [91, 92, 154, 154, 95, 154, 154, 154, 154, 96, 71, 72, 73, 74, 75, 74, 73, 73, 74, 76],
  [151, 154, 154, 130, 150, 154, 154, 154, 154, 156, 91, 92, 93, 94, 95, 154, 154, 112, 154, 156],
];

const COLLISION = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

class TilemapCollisionSample extends Scene {
  awake() {
    this.backgroundColor = 0xaaaaaa;

    this
      .createLayer('bottomLayer', 'stage')
      .createLayer('topLayer', 'stage');

    new BackgroundMap(16, LAYER_1, loader.getTexture('pizza-boy.png')).addTo(this.bottomLayer);
    new BackgroundMap(16, LAYER_2, loader.getTexture('pizza-boy.png')).addTo(this.bottomLayer);

    const collisionMap = new CollisionMap(16, COLLISION, GROUPS.SOLID).addTo(this);

    // Create a box that collides with the tilemap
    this.box = this.spawnActor(Actor, 40, 120, 'bottomLayer')
      .initGraphics({
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

    keyboard.on('keydown', (k) => {
      if (k === 'UP') {
        this.box.body.velocity.y = -160;
      }
    });

    // Collision map debug draw: edges and normals
    this.drawBody(this.box.body, this.topLayer);
    for (let i = 0; i < collisionMap.bodies.length; i++) {
      this.drawBodyStatic(collisionMap.bodies[i], this.topLayer);
    }
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

  drawBody(body, parent, lineWidth = 1) {
    for (let i = 0; i < body.shape.points.length; i++) {
      let p0 = body.shape.points[i];
      let p1 = p0.clone().add(body.shape.edges[i]);

      let segGfx = new PIXI.Graphics().addTo(parent);
      segGfx.lineStyle(lineWidth, 0xff2f62);
      segGfx.moveTo(p0.x, p0.y);
      segGfx.lineTo(p1.x, p1.y);
      segGfx.position = body.position;

      let vecN = body.shape.normals[i].clone().multiply(4);
      let segNormalGfx = new PIXI.Graphics().addTo(parent);
      segNormalGfx.lineStyle(1, 0x00e56e);
      segNormalGfx.moveTo(0, 0);
      segNormalGfx.lineTo(vecN.x, vecN.y);
      segNormalGfx.pivot
        .copy(p1).subtract(p0).multiply(0.5)
        .add(p0)
        .multiply(-1);
      segNormalGfx.position = body.position;
    }
  }
  drawBodyStatic(body, parent, lineWidth = 1) {
    for (let i = 0; i < body.shape.points.length; i++) {
      let p0 = body.shape.points[i];
      let p1 = p0.clone().add(body.shape.edges[i]);

      let segGfx = new PIXI.Graphics().addTo(parent);
      segGfx.lineStyle(lineWidth, 0xff2f62);
      segGfx.moveTo(p0.x, p0.y);
      segGfx.lineTo(p1.x, p1.y);
      segGfx.position.add(body.position);

      let vecN = body.shape.normals[i].clone().multiply(4);
      let segNormalGfx = new PIXI.Graphics().addTo(parent);
      segNormalGfx.lineStyle(1, 0x00e56e);
      segNormalGfx.moveTo(0, 0);
      segNormalGfx.lineTo(vecN.x, vecN.y);
      segNormalGfx.position
        .copy(p1).subtract(p0).multiply(0.5)
        .add(p0)
        .add(body.position);
    }
  }
}

engine.addScene('TilemapCollisionSample', TilemapCollisionSample);
