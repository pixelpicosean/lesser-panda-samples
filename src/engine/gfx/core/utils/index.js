const core = require('engine/core');
var CONST = require('../../const');

var utils = {
  _uid: 0,
  saidHello: false,

  EventEmitter: require('engine/EventEmitter'),
  pluginTarget: require('./pluginTarget'),
  async: require('engine/loader').async,

  /**
   * Gets the next unique identifier
   *
   * @return {number} The next unique identifier to use.
   */
  uid: function() {
    return ++utils._uid;
  },

  /**
   * Converts a hex color number to an [R, G, B] array
   *
   * @param hex {number}
   * @param  {number[]} [out=[]]
   * @return {number[]} An array representing the [R, G, B] of the color.
   */
  hex2rgb: require('engine/utils/color').hex2rgb,

  /**
   * Converts a hex color number to a string.
   *
   * @param hex {number}
   * @return {string} The string color.
   */
  hex2string: require('engine/utils/color').hex2string,

  /**
   * Converts a color as an [R, G, B] array to a hex number
   *
   * @param rgb {number[]}
   * @return {number} The color number
   */
  rgb2hex: require('engine/utils/color').rgb2hex,

  /**
   * Checks whether the Canvas BlendModes are supported by the current browser
   *
   * @return {boolean} whether they are supported
   */
  canUseNewCanvasBlendModes: function() {
    if (typeof document === 'undefined') {
      return false;
    }

    var pngHead = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/';
    var pngEnd = 'AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';

    var magenta = new Image();
    magenta.src = pngHead + 'AP804Oa6' + pngEnd;

    var yellow = new Image();
    yellow.src = pngHead + '/wCKxvRF' + pngEnd;

    var canvas = document.createElement('canvas');
    canvas.width = 6;
    canvas.height = 1;

    var context = canvas.getContext('2d');
    context.globalCompositeOperation = 'multiply';
    context.drawImage(magenta, 0, 0);
    context.drawImage(yellow, 2, 0);

    var data = context.getImageData(2,0,1,1).data;

    return (data[0] === 255 && data[1] === 0 && data[2] === 0);
  },

  /**
   * Given a number, this function returns the closest number that is a power of two
   * this function is taken from Starling Framework as its pretty neat ;)
   *
   * @param number {number}
   * @return {number} the closest number that is a power of two
   */
  getNextPowerOfTwo: function(number) {
      // see: http://en.wikipedia.org/wiki/Power_of_two#Fast_algorithm_to_check_if_a_positive_number_is_a_power_of_two
    if (number > 0 && (number & (number - 1)) === 0) {
      return number;
    }
    else {
      var result = 1;

      while (result < number) {
        result <<= 1;
      }

      return result;
    }
  },

  /**
   * checks if the given width and height make a power of two rectangle
   *
   * @param width {number}
   * @param height {number}
   * @return {boolean}
   */
  isPowerOfTwo: function(width, height) {
    return (width > 0 && (width & (width - 1)) === 0 && height > 0 && (height & (height - 1)) === 0);
  },

  /**
   * get the resolution of an asset by looking for the prefix
   * used by spritesheets and image urls
   *
   * @param url {string} the image path
   * @return {number}
   */
  getResolutionOfUrl: function(url) {
    var resolution = CONST.RETINA_PREFIX.exec(url);

    if (resolution) {
      return parseFloat(resolution[1]);
    }

    return 1;
  },

  /**
   * Logs out the version and renderer information for this running instance of
   * If you don't want to see this message you can set `core.sayHello = true;`
   * so the library thinks it already said it.
   *
   * @param {string} type - The string renderer type to log.
   * @constant
   * @static
   */
  sayHello: function(type) {
    if (!core.sayHello || utils.saidHello) {
      return;
    }

    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      var args = [
        '\n %c %c LesserPanda ' + core.version + ' - ✰ ' + type + ' ✰ %c \n\n',
        'background: #ff66a5; padding:5px 0;',
        'color: #ff66a5; background: #030307; padding:5px 0;',
        'background: #ff66a5; padding:5px 0;',
      ];

      window.console.log.apply(console, args); // jshint ignore:line
    }
    else if (window.console) {
      window.console.log('LesserPanda ' + core.version); // jshint ignore:line
    }

    utils.saidHello = true;
  },

  /**
   * Helper for checking for webgl support
   *
   * @return {boolean}
   */
  isWebGLSupported: function() {
    var contextOptions = { stencil: true };
    try {
      if (!window.WebGLRenderingContext) {
        return false;
      }

      var canvas = document.createElement('canvas'),
        gl = canvas.getContext('webgl', contextOptions) || canvas.getContext('experimental-webgl', contextOptions);

      return !!(gl && gl.getContextAttributes().stencil);
    }
    catch (e) {
      return false;
    }
  },

  /**
   * Returns sign of number
   *
   * @param n {number}
   * @returns {number} 0 if n is 0, -1 if n is negative, 1 if n i positive
   */
  sign: function(n) {
    return n ? (n < 0 ? -1 : 1) : 0;
  },

  /**
   * removeItems
   *
   * @param {array} arr The target array
   * @param {number} startIdx The index to begin removing from (inclusive)
   * @param {number} removeCount How many items to remove
   */
  removeItems: require('engine/utils/array').removeItems,

  /**
   * @todo Describe property usage
   * @private
   */
  TextureCache: {},

  /**
   * @todo Describe property usage
   * @private
   */
  BaseTextureCache: {},
};

module.exports = utils;
