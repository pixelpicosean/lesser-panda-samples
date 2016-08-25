import engine from 'engine/core';
import Scene from 'engine/scene';
import PIXI from 'engine/pixi';
import physics from 'engine/physics';
import Actor from 'engine/actor';

import config from 'game/config';

// Constants
const GROUPS = {
  SOLID:  physics.getGroupMask(0),
  BOX:    physics.getGroupMask(1),
  CIRCLE: physics.getGroupMask(2),
};

class PhysicsSample extends Scene {
  constructor() {
    super();

    // Add some solid boxes to construct a manger
    this.addSolidBox(engine.width * 0.5, engine.height - 10, 240, 12, { color: 0x39bdfd });
    this.addSolidBox(42, engine.height - 28, 12, 40, { color: 0x39bdfd });
    this.addSolidBox(engine.width - 42, engine.height - 28, 12, 40, { color: 0x39bdfd });

    // Add a box that bouncing off the manger
    this.box = this.addBox(80, engine.height - 50, 16, 16, { color: 0xcdced1, mass: 0.3 });
    this.box.rotation = Math.PI * 0.25;
    this.box.body.velocity.x = 30;

    // Add a circle that bouncing off the manger
    this.circle = this.addCircle(engine.width - 80, engine.height - 50, 8, { color: 0xff91b7, mass: 0.3 });
    this.circle.body.velocity.x = -30;
  }
  update(deltaMS, deltaSec) {
    // Animate box rotation, this will also affect collisions
    this.box.rotation += Math.PI * deltaSec * (this.box.body.velocity.x * 0.075);
  }

  addBox(x, y, w, h, { color, mass = 0 }) {
    return this.spawnActor(Actor, x, y, 'stage')
      .initGraphics({
        width: w,
        height: h,
        color: color,
      })
      .initBody({
        mass: mass,
        collisionGroup: GROUPS.BOX,
        collideAgainst: [GROUPS.SOLID, GROUPS.CIRCLE],
        collide: function(other, response) {
          // Always bounce back the solid
          if (other.collisionGroup === GROUPS.SOLID) {
            if (config.physics.solver === 'SAT') {
              this.velocity.reflectN(response.overlapN.perp());
            }
            else {
              if (response & physics.DOWN) {
                this.velocity.y = -this.velocity.y;
              }
              else if (response & (physics.RIGHT | physics.LEFT)) {
                this.velocity.x = -this.velocity.x;
              }
            }

            // Apply collision response to self
            return true;
          }
          else if (other.collisionGroup === GROUPS.CIRCLE) {
            this.velocity.x *= -1;
            return true;
          }
        },
      });
  }
  addCircle(x, y, r, { color, mass = 0 }) {
    return this.spawnActor(Actor, x, y, 'stage')
      .initGraphics({
        shape: 'Circle',
        radius: r,
        color: color,
      })
      .initBody({
        mass: mass,
        collisionGroup: GROUPS.CIRCLE,
        collideAgainst: [GROUPS.SOLID, GROUPS.BOX],
        collide: function(other, response) {
          // Always bounce back
          if (other.collisionGroup === GROUPS.SOLID) {
            if (config.physics.solver === 'SAT') {
              this.velocity.reflectN(response.overlapN.perp());
            }
            else {
              if (response & physics.DOWN) {
                this.velocity.y = -this.velocity.y;
              }
              else if (response & (physics.RIGHT | physics.LEFT)) {
                this.velocity.x = -this.velocity.x;
              }
            }
            // Apply collision response to self
            return true;
          }
          else if (other.collisionGroup === GROUPS.BOX) {
            this.velocity.x *= -1;
            return true;
          }
        },
      });
  }
  addSolidBox(x, y, w, h, { color }) {
    return this.spawnActor(Actor, x, y, 'stage')
      .initGraphics({
        width: w,
        height: h,
        color: color,
      })
      .initBody({
        isStatic: true,
        collisionGroup: GROUPS.SOLID,
      });
    }
 };

 engine.addScene('PhysicsSample', PhysicsSample);
