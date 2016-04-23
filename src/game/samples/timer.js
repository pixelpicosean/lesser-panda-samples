import engine from 'engine/core';
import PIXI from 'engine/pixi';
import Scene from 'engine/scene';
import device from 'engine/device';
import Timer from 'engine/timer';

import { TEXTURES } from 'game/data';

class TimerScene extends Scene {
  awake() {
    // Enable mouse/touch input
    this.stage.interactive = true;
    this.stage.containsPoint = () => true;

    // Create some texts
    this.title = new PIXI.extras.BitmapText('', {
      font: '24px 04b03',
    }).addTo(this.stage);

    this.text = new PIXI.extras.BitmapText('Counting', {
      font: '36px 04b03',
    }).addTo(this.stage);

    this.asteroid = new PIXI.Sprite(TEXTURES['asteroids'].asteroid).addTo(this.stage);
    this.asteroid.anchor.set(0.5);
    this.asteroid.position.set(0, engine.height * 0.5);
    this.asteroid.visible = false;

    // Start the first case
    this.startCase_Later();
  }
  update(_, dt) {
    // Center align texts
    this.title.position.set(engine.width * 0.5, 16)
      .subtract(this.title.width * 0.5, this.title.height * 0.5);
    this.text.position.set(engine.width * 0.5, engine.height * 0.5)
      .subtract(this.text.width * 0.5, this.text.height * 0.5);

    // Move the asteroid
    this.asteroid.position.x += dt * 100;
    if (this.asteroid.position.x > engine.width) {
      this.asteroid.position.x -= engine.width;
    }
  }

  startCase_Later() {
    this.title.text = '"later" timer';
    this.text.text = '';

    // Change text after short durations
    Timer.later(1000, () => this.text.text = '3');
    Timer.later(2000, () => this.text.text = '2');
    Timer.later(3000, () => this.text.text = '1');
    Timer.later(4000, () => this.text.text = 'WOW');

    /* You can pass a context as the third parameter */
    Timer.later(5000, this.startCase_Interval, this);
  }
  startCase_Interval() {
    this.title.text = '"interval" timer';
    this.text.text = '';

    // Change text every second
    // By using Arraw-functions, you don't need to pass
    // context to the timer
    let count = 0;
    const repeatTimer = Timer.interval(1000, () => {
      this.text.text = `${count++}`;

      // Stop the inteval timer when looped 5 times
      if (count > 5) {
        Timer.remove(repeatTimer);
        Timer.later(1000, this.startCase_Slowmotion, this);
      }
    });
  }
  startCase_Slowmotion() {
    this.title.text = 'before slowmotion';
    this.text.text = '';

    this.asteroid.visible = true;

    Timer.later(750, () => {
      this.title.text = 'slowmotion now';
      engine.speed = 0.5;
    });
    Timer.later(2500, () => {
      this.title.text = 'normal speed again';
      engine.speed = 1;
    });
    Timer.later(4000, () => {
      this.asteroid.visible = false;
      this.waitForRepeat();
    });
  }

  waitForRepeat() {
    this.title.text = '';
    this.text.text = 'Touch to\nRestart';

    if (device.mobile) {
      this.stage.once('touchstart', this.startCase_Later, this);
    }
    else {
      this.stage.once('mousedown', this.startCase_Later, this);
    }
  }
}

engine.addScene('Timer', TimerScene);
