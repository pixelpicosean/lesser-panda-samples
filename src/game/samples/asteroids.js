import engine from 'engine/core';
import Scene from 'engine/scene';

import SpriteActor from 'engine/actors/sprite-actor';
import AsteroidsMove from 'behaviors/asteroids-move';
import WrapAroundScreen from 'behaviors/wrap-around-screen';

import { TEXTURES } from 'game/data';

class Asteroids extends Scene {
  constructor() {
    super();

    // Create a ship actor
    const ship = new SpriteActor(TEXTURES['asteroids']['ship-blue'])
      .addTo(this, this.stage);
    ship.position.set(engine.width * 0.5, engine.height * 0.5);

    // Give the ship ability to move
    new AsteroidsMove({
        forwardKey: 'W',
        backwardKey: 'S',
        leftKey: 'A',
        rightKey: 'D',
        forwardForce: 40,
        forwardForce: 30,
        torque: 2,
      })
      .addTo(ship, this)
      .activate();

    // Make the ship able to wrap around screen
    new WrapAroundScreen().addTo(ship, this).activate();

    // TODO: Make the ship able to shoot bullets

    // TODO: Spawn asteroids
  }
}

engine.addScene('Asteroids', Asteroids);
