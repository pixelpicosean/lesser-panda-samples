const core = require('engine/core');
const device = require('engine/device');
const Game = require('engine/Game');

const SystemGfx = require('engine/gfx');
const BitmapText = require('engine/gfx/BitmapText');
const Sprite = require('engine/gfx/Sprite');
require('engine/gfx/interaction'); // Import the gfx interaction plugin

const SystemTimer = require('engine/Timer');

class SampleTimer extends Game {
  constructor() {
    super();

    this.addSystem(new SystemGfx());
    this.addSystem(new SystemTimer());

    // Enable mouse/touch input
    this.sysGfx.root.interactive = true;
    this.sysGfx.root.containsPoint = () => true;

    // Create some texts
    this.title = BitmapText({
      text: '',
      font: '24px 04b03',
    }).addTo(this.sysGfx.root);

    this.text = BitmapText({
      text: 'Counting',
      font: '36px 04b03',
    }).addTo(this.sysGfx.root);

    this.asteroid = Sprite({
      texture: ['asteroids', 'asteroid'],
      anchor: { x: 0.5, y: 0.5 },
      position: { x: 0, y: core.height / 2 },
      visible: false,
    }).addTo(this.sysGfx.root);

    this.moveAsteroid = false;
  }
  awake() {
    super.awake();

    // Start the first case
    this.startCase_Later();
  }
  fixedUpdate(_, dt) {
    super.fixedUpdate(_, dt);

    // Center align texts
    this.title.position.set(core.width * 0.5, 16)
      .subtract(this.title.width * 0.5, this.title.height * 0.5);
    this.text.position.set(core.width * 0.5, core.height * 0.5)
      .subtract(this.text.width * 0.5, this.text.height * 0.5);

    // Move the asteroid
    if (this.moveAsteroid) {
      this.asteroid.position.x += dt * 100;
    }
    if (this.asteroid.position.x > core.width) {
      this.asteroid.position.x -= core.width;
    }
  }

  startCase_Later() {
    this.title.text = '"later" timer';
    this.text.text = '';

    // Change text after short durations
    this.sysTimer.later(1000, () => this.text.text = '3');
    this.sysTimer.later(2000, () => this.text.text = '2');
    this.sysTimer.later(3000, () => this.text.text = '1');
    this.sysTimer.later(4000, () => this.text.text = 'WOW');

    /* You can pass a context as the third parameter */
    this.sysTimer.later(5000, this.startCase_Interval, this);
  }
  startCase_Interval() {
    this.title.text = '"interval" timer';
    this.text.text = '';

    // Change text every second
    // By using Arraw-functions, you don't need to pass
    // context to the timer
    let count = 0;
    const repeatTimer = this.sysTimer.interval(1000, () => {
      this.text.text = `${count++}`;

      // Stop the inteval timer when looped 5 times
      if (count > 5) {
        this.sysTimer.remove(repeatTimer);
        this.sysTimer.later(1000, this.startCase_Slowmotion, this);
      }
    });
  }
  startCase_Slowmotion() {
    this.title.text = 'before slowmotion';
    this.text.text = '';

    this.asteroid.visible = true;
    this.moveAsteroid = true;

    this.sysTimer.later(750, () => {
      this.title.text = 'slowmotion now';
      core.speed = 0.5;
    });
    this.sysTimer.later(2500, () => {
      this.title.text = 'normal speed again';
      core.speed = 1;
    });
    this.sysTimer.later(4000, () => {
      this.asteroid.visible = false;
      this.moveAsteroid = false;
      this.startCase_Tag();
    });
  }
  startCase_Tag() {
    this.title.text = 'Tagged timers';
    this.text.text = '';

    this.asteroid.visible = true;
    this.asteroid.position.x = 0;

    let count = 0;
    let t1 = this.sysTimer.interval(50, () => {
      this.text.text = `${count++}`;
    }, null, 'tag_1');
    let t2 = this.sysTimer.interval(50, () => {
      this.asteroid.position.x += 10;
    }, null, 'tag_2');
    this.sysTimer.later(2000, () => {
      this.title.text = 'Pause tag 2';
      this.sysTimer.pauseTimersTagged('tag_2');
    });
    this.sysTimer.later(3000, () => {
      this.title.text = 'Resume tag 2';
      this.sysTimer.resumeTimersTagged('tag_2');
    });
    this.sysTimer.later(4000, () => {
      this.text.text = '';

      this.sysTimer.remove(t1);
      this.sysTimer.remove(t2);

      this.asteroid.visible = false;
      this.asteroid.position.x = 0;

      this.waitForRepeat();
    });
  }

  waitForRepeat() {
    this.title.text = '';
    this.text.text = 'Touch to\nRestart';

    if (device.mobile) {
      this.sysGfx.root.once('touchstart', this.startCase_Later, this);
    }
    else {
      this.sysGfx.root.once('mousedown', this.startCase_Later, this);
    }
  }
}

module.exports = SampleTimer;
