const loader = require('engine/loader');
const { getGroupMask } = require('engine/physics');

// Group constants for collision detection
module.exports.Groups = {
  Solid:  getGroupMask(0),
  Box:    getGroupMask(1),
  Circle: getGroupMask(2),
};

// Load textures
loader.add('asteroids', 'asteroids.json');
loader.add('pizza-boy.png');
loader.add('pizza-boy.json');
loader.add('tank-base', 'tank-base.png');
loader.add('tank-cannon', 'tank-cannon.png');

// Load bitmap fonts
loader.add('KenPixel.fnt');
loader.add('04b03.fnt');
