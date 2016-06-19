import engine from 'engine/core';
import Scene from 'engine/scene';
import loader from 'engine/loader';
import filmstrip from 'engine/tilemap/filmstrip';
import Actor from 'engine/actor';

// `Action` is included in the animation module
import { Action } from 'engine/animation';

loader.addAsset('coin.png', 'coin');

class ActionSample extends Scene {
  constructor() {
    super();

    // AnimatedSprite with frames
    const coin = this.spawnActor(Actor, engine.width * 0.5, 50)
      .initAnimatedSprite({
        textures: filmstrip(loader.resources['coin'].texture, 10, 10),
        anims: [
          { name: 'rotate', frames: [0, 1, 2, 3, 2, 1], settings: { speed: 12 } },
        ],
        anchor: { x: 0.5, y: 0.5 },
        scale: { x: 2, y: 2 },
      });
    coin.sprite.play('rotate');

    // Create Blender/Flash like keyframe based animation
    const moveAction = Action.create()
      .channel('position.x')
        .key(0, engine.width * 0.5)
        .key(1000, engine.width * 0.8)
        .key(3000, engine.width * 0.2)
        .key(4000, engine.width * 0.5)
      .channel('position.y')
        .key(0, 50)
        .key(1000, 100)
        .key(3000, 150)
        .key(4000, 50);

    // Create a animation player to run the action
    const animPlayer = this.runAction(moveAction, coin);

    // You can set the playback speed
    // animPlayer.speed = -1;

    // And subscribe to playback events
    let count = 0;
    animPlayer.on('loop', () => console.log(`loop ${++count} times`));
  }
};

 engine.addScene('ActionSample', ActionSample);
