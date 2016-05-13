import engine from 'engine/core';
import Scene from 'engine/scene';
import Vector from 'engine/vector';

import Actor from 'engine/actor';

import Steering from 'behaviors/steering';
import WrapAroundScreen from 'behaviors/wrap-around-screen';

class Vehicle extends Actor {

  canEverTick = true;

  constructor({ target }) {
    super();

    this.target = target;

    this.initGraphics({
      shape: 'Polygon',
      points: [
        Vector.create(-5, -4),
        Vector.create(5, 0),
        Vector.create(-5, 4),
      ],
      color: 0xffffff,
    });

    this.initBody();

    this.behave(Steering, {})
      .behave(WrapAroundScreen, {});
  }
  prepare() {}
  update() {
    // Steering
    let force = this.behaviors.Steering.pursuit(this.target);
    this.body.force.copy(force);
    Vector.recycle(force);

    // Update graphic
    if (this.body.velocity.squaredLength() > 0.01) {
      this.rotation = this.body.velocity.angle();
    }
  }
}

class SteeringScene extends Scene {
  awake() {
    let a = this.spawnActor(Actor, 100, 100, 'stage')
      .initGraphics({
        shape: 'Polygon',
        points: [
          Vector.create(-5, -4),
          Vector.create(5, 0),
          Vector.create(-5, 4),
        ],
        color: 0xff0000,
      })
      .initBody({
        velocityLimit: Vector.create(80, 80),
      })
      .behave(Steering, {})
      .behave(WrapAroundScreen, {});
    a.canEverTick = true;
    a.update = function() {
      let force = this.behaviors.Steering.wander();
      this.body.force.copy(force);
      Vector.recycle(force);

      if (this.body.velocity.squaredLength() > 0.01) {
        this.rotation = this.body.velocity.angle();
      }
    };

    this.spawnActor(Vehicle, 10, 10, 'stage', { target: a });
  }
};
engine.addScene('Steering', SteeringScene);
