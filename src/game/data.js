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

// Load bitmap fonts
loader.addAsset('KenPixel.fnt');

// Load audio files

export const TEXTURES = {};
export let MAP;
loader.once('complete', () => {

  TEXTURES['asteroids'] = loader.resources['asteroids'].textures;
  TEXTURES['tileset'] = loader.resources['tileset'].texture;

  MAP = loader.resources['map'].data;

});
