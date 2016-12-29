const core = require('engine/core');
const Game = require('engine/Game');

const Entity = require('engine/Entity');

const SystemGfx = require('engine/gfx');
const Graphics = require('engine/gfx/Graphics');

const SystemPhysics = require('engine/physics');
const AABBSolver = require('engine/physics/AABBSolver');
const Collider = require('engine/physics/Collider');

const { Groups } = require('game/data');

// Extend to create a custom Entity
// Entity is just a container for components like
// gfx node or collider.
class MyEntity extends Entity {
  // x and y is the position, s is a settings object
  // which might be undefined sometimes
  constructor(x, y, s = {}) {
    // Settings object will be merged into this object,
    // and you might not want that happen. Simple pass
    // a null can be a good choice
    //
    // You can also override the `setup` method, which
    // is used to handle setting object.
    super(x, y, null);

    // Create a Graphics as our `gfx`
    this.gfx = Graphics({
      shape: 'Box',
      width: s.width || 10,
      height: s.height || 10,
      color: s.color || 0xff2f62,
    });
    this.coll = Collider({
      shape: 'Box',
      width: s.width || 10,
      height: s.height || 10,
      mass: Number.isFinite(s.mass) ? s.mass : 0.2,
      collisionGroup: Groups.Box,
      collideAgainst: Groups.Solid | Groups.Box,
      collide: () => true,
    });
  }
}

class SampleEntity extends Game {
  constructor() {
    super();

    this.addSystem(new SystemPhysics({
      // Physics always requires a collision solver
      solver: new AABBSolver(),
      // Give it a gravity towards the bottom
      gravity: { y: 100 },
    }));
    this.addSystem(new SystemGfx());

    // Create a layer for our entities
    this.sysGfx.createLayer('my_boxes');

    // Spawn an Entity
    const box1 = this.spawnEntity(MyEntity, 160, 20, 'my_boxes');

    // Spawn an Entity with some settigns
    const box2 = this.spawnEntity(MyEntity, 160, 120, 'my_boxes', {
      width: 100,
      color: 0x29ADFF,
      mass: 0,
    });
  }
}

module.exports = SampleEntity;
