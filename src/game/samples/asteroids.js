import engine from 'engine/core';
import Scene from 'engine/scene';

import Actor from 'engine/actor';
import AsteroidsMove from 'behaviors/asteroids-move';
import WrapAroundScreen from 'behaviors/wrap-around-screen';

import { TEXTURES } from 'game/data';

class AsteroidsSample extends Scene {
  constructor() {
    super();

    // Create a ship actor
    const ship = this.spawnActor(Actor, engine.width * 0.5, engine.height * 0.5, 'stage')
      .initSprite({
        texture: ['asteroids', 'ship-blue'],
        anchor: { x: 0.5, y: 0.5 },
      })
      .initBody()
      // Give the ship ability to move
      .behave(AsteroidsMove, 'bAsteroidsMove', {
        forwardKey: 'W',
        backwardKey: 'S',
        leftKey: 'A',
        rightKey: 'D',
        forwardForce: 50,
        torque: 4,
      })
      // Make the ship able to wrap around screen
      .behave(WrapAroundScreen, 'bWrapAroundScreen');

    // TODO: Make the ship able to shoot bullets

    // TODO: Spawn asteroids
  }
}

engine.addScene('AsteroidsSample', AsteroidsSample);
