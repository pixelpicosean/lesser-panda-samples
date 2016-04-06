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

// Load bitmap fonts
loader.addAsset('KenPixel.fnt');

// Load audio files

export const TEXTURES = {};
loader.once('complete', () => {

  TEXTURES['asteroids'] = loader.resources['asteroids'].textures;

});
