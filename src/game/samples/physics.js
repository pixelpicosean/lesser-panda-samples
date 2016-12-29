const core = require('engine/core');
const Game = require('engine/Game');
const Vector = require('engine/Vector');

const SystemGfx = require('engine/gfx');
const Graphics = require('engine/gfx/Graphics');

const SystemPhysics = require('engine/physics');
const AABBSolver = require('engine/physics/AABBSolver');
const Collider = require('engine/physics/Collider');
const { LEFT, RIGHT, TOP, BOTTOM } = require('engine/physics/const');

const { Groups } = require('game/data');

class SamplePhysics extends Game {
  constructor() {
    super();

    this.addSystem(new SystemPhysics({
      solver: new AABBSolver(),
      gravity: { y: 900 },
    }));
    this.addSystem(new SystemGfx());

    // Add some solid boxes to construct a manger
    this.addSolidBox(core.width / 2, core.height - 10, 240, 12, { color: 0x39bdfd });
    this.addSolidBox(42, core.height - 28, 12, 40, { color: 0x39bdfd });
    this.addSolidBox(core.width - 42, core.height - 28, 12, 40, { color: 0x39bdfd });

    // Add a box that bouncing off the manger
    this.box = this.addBox(80, core.height - 50, 16, 16, { color: 0xcdced1, mass: 0.3 });
    this.box.coll.velocity.x = 30;

    // Add a circle that bouncing off the manger
    this.circle = this.addCircle(core.width - 80, core.height - 50, 8, { color: 0xff91b7, mass: 0.3 });
    this.circle.coll.velocity.x = -30;
  }
  fixedUpdate(dt, sec) {
    super.fixedUpdate(dt, sec);

    // Animate box rotation, this will also affect collisions
    this.box.gfx.rotation += Math.PI * sec * (this.box.coll.velocity.x * 0.075);
  }

  addBox(x, y, w, h, { color, mass = 0 }) {
    const g = Graphics({
      shape: 'Box',
      width: w,
      height: h,
      color: color,
    }).addTo(this.sysGfx.root);
    const c = Collider({
      shape: 'Box',
      width: w,
      height: h,
      mass: mass,
      collisionGroup: Groups.Box,
      collideAgainst: Groups.Solid | Groups.Circle,
      collide: function(other, res) {
        // Always bounce back the solid
        if (other.collisionGroup === Groups.Solid) {
          if (res === BOTTOM) {
            this.velocity.y = -this.velocity.y;
          }
          else if (res === RIGHT || res === LEFT) {
            this.velocity.x = -this.velocity.x;
          }

          // Apply collision response to self
          return true;
        }
        else if (other.collisionGroup === Groups.Circle) {
          this.velocity.x *= -1;
          return true;
        }
      },
    }).addTo(this.sysPhysics);

    // Share position between Collider and Graphics
    c.position = g.position.set(x, y);

    return {
      gfx: g,
      coll: c,
    };
  }
  addCircle(x, y, r, { color, mass = 0 }) {
    const g = Graphics({
      shape: 'Circle',
      radius: r,
      color: color,
    }).addTo(this.sysGfx.root);
    const c = Collider({
      shape: 'Circle',
      radius: r,
      mass: mass,
      collisionGroup: Groups.Circle,
      collideAgainst: Groups.Solid | Groups.Box,
      collide: function(other, res) {
        // Always bounce off the target
        const vec = Vector.create(1, 0).rotate(res.angle + Math.PI * 0.5);
        this.velocity.reflect(vec);
        Vector.recycle(vec);

        return true;
      },
    }).addTo(this.sysPhysics);

    // Share position between Collider and Graphics
    c.position = g.position.set(x, y);

    return {
      gfx: g,
      coll: c,
    };
  }
  addSolidBox(x, y, w, h, { color }) {
    const g = Graphics({
      shape: 'Box',
      width: w,
      height: h,
      color: color,
    }).addTo(this.sysGfx.root);
    const c = Collider({
      shape: 'Box',
      width: w,
      height: h,
      isStatic: true,
      collisionGroup: Groups.Solid,
    }).addTo(this.sysPhysics);

    // Share position between Collider and Graphics
    c.position = g.position.set(x, y);

    return {
      gfx: g,
      coll: c,
    };
 };
}

module.exports = SamplePhysics;
