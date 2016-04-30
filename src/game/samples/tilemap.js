import engine from 'engine/core';
import PIXI from 'engine/pixi';
import Scene from 'engine/scene';
import Tilemap from 'engine/tilemap';
import keyboard from 'engine/keyboard';

import Actor from 'engine/actor';

import { TEXTURES, MAP, GROUPS } from 'game/data';

class TilemapSample extends Scene {
  awake() {
    this.backgroundColor = 0xaaaaaa;

    this.bottomLayer = new PIXI.Container().addTo(this.stage);
    this.topLayer = new PIXI.Container().addTo(this.stage);

    // Tileset table
    const tilesets = {
      'tileset.png': TEXTURES['tileset'],
    };

    // Create a tilemap from Tiled JSON map
    const tilemap = Tilemap.fromTiledJson(MAP, tilesets, GROUPS.SOLID)
      .addTo(this, this.bottomLayer);

    // Create a box that collides with the tilemap
    const box = this.spawnActor(Actor, 16, 144, 'bottomLayer')
      .initGraphics({ shape: 'Box', color: 0xfff4ed, width: 8 })
      .initBody({ mass: 0.4, collisionGroup: GROUPS.BOX, collideAgainst: [GROUPS.SOLID] });
    box.body.velocityLimit.set(200);
    box.body.collide = function(other, res) {
      if (other.collisionGroup === GROUPS.SOLID) {
        if ((this.velocity.y < 0 && res.overlapN.y < 0) ||
          this.velocity.y > 0 && res.overlapN.y > 0) {
          this.velocity.y = 0;
        }
        return true;
      }
    };
    this.box = box;

    keyboard.on('keydown', (k) => {
      if (k === 'UP') {
        box.body.velocity.y = -160;
      }
    });

    // Collision layer debug draw: edges and normals
    this.drawBody(box.body, box.sprite);
    for (let i = 0; i < tilemap.collisionLayer.bodies.length; i++) {
      this.drawBodyStatic(tilemap.collisionLayer.bodies[i], this.topLayer);
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

      let vecN = body.shape.normals[i].clone().multiply(4);
      let segNormalGfx = new PIXI.Graphics().addTo(parent);
      segNormalGfx.lineStyle(1, 0x00e56e);
      segNormalGfx.moveTo(0, 0);
      segNormalGfx.lineTo(vecN.x, vecN.y);
      segNormalGfx.position
        .copy(p1).subtract(p0).multiply(0.5)
        .add(p0);
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

engine.addScene('Tilemap', TilemapSample);
