import loader from 'engine/loader';
import physics from 'engine/physics';

// Constants
export const GROUPS = {
  SOLID:  physics.getGroupMask(0),
  BOX:    physics.getGroupMask(1),
  CIRCLE: physics.getGroupMask(2),
};

// Load textures
loader.addAsset('asteroids.json', 'asteroids');
loader.addAsset('tileset.png', 'tileset');
loader.addAsset('room.json', 'map');
loader.addAsset('tank-base.png', 'tank-base');
loader.addAsset('tank-cannon.png', 'tank-cannon');

// Load bitmap fonts
loader.addAsset('KenPixel.fnt');
loader.addAsset('04b03.fnt');
