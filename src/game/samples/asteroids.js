import engine from 'engine/core';
import Scene from 'engine/scene';

import Actor from 'engine/actor';
import AsteroidsMove from 'behaviors/asteroids-move';
import WrapAroundScreen from 'behaviors/wrap-around-screen';

import { TEXTURES } from 'game/data';

class Asteroids extends Scene {
  constructor() {
    super();

    // Create a ship actor
    const ship = this.spawnActor(Actor, engine.width * 0.5, engine.height * 0.5, 'stage')
      .initSprite(TEXTURES['asteroids']['ship-blue'])
      .initBody()
      // Give the ship ability to move
      .behave(AsteroidsMove, {
        forwardKey: 'W',
        backwardKey: 'S',
        leftKey: 'A',
        rightKey: 'D',
        forwardForce: 40,
        forwardForce: 30,
        torque: 2,
      })
      // Make the ship able to wrap around screen
      .behave(WrapAroundScreen);

    // TODO: Make the ship able to shoot bullets

    // TODO: Spawn asteroids
  }
}

engine.addScene('Asteroids', Asteroids);
