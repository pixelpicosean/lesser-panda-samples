const AbstractFilter = require('../../core/renderers/webgl/filters/AbstractFilter');

/**
 * The BlurDirFilter applies a Gaussian blur toward a direction to an object.
 *
 * @class
 * @param {number} dirX
 * @param {number} dirY
 * @extends AbstractFilter
 */
function BlurDirFilter(dirX, dirY) {
  AbstractFilter.call(this,
        // vertex shader
        require('./blurDir.vert'),
        // fragment shader
        require('./blurDir.frag'),
        // set the uniforms
    {
      strength: { type: '1f', value: 1 },
      dirX: { type: '1f', value: dirX || 0 },
      dirY: { type: '1f', value: dirY || 0 },
    }
    );

  this.defaultFilter = new AbstractFilter();

    /**
     * Sets the number of passes for blur. More passes means higher quaility bluring.
     *
     * @member {number}
     * @default 1
     */
  this.passes = 1;

    /**
     * Sets the X direction of the blur
     *
     * @member {number}
     * @default 0
     */
  this.dirX = dirX || 0;

    /**
     * Sets the Y direction of the blur
     *
     * @member {number}
     * @default 0
     */
  this.dirY = dirY || 0;

  this.strength = 4;
}

BlurDirFilter.prototype = Object.create(AbstractFilter.prototype);
BlurDirFilter.prototype.constructor = BlurDirFilter;
module.exports = BlurDirFilter;

BlurDirFilter.prototype.applyFilter = function(renderer, input, output, clear) {

  var shader = this.getShader(renderer);

  this.uniforms.strength.value = this.strength / 4 / this.passes * (input.frame.width / input.size.width);

  if (this.passes === 1) {
    renderer.filterManager.applyFilter(shader, input, output, clear);
  }
  else {
    var renderTarget = renderer.filterManager.getRenderTarget(true);

    renderer.filterManager.applyFilter(shader, input, renderTarget, clear);

    for (var i = 0; i < this.passes - 2; i++) {
            // this.uniforms.strength.value = this.strength / 4 / (this.passes+(i*2)) * (input.frame.width / input.size.width);
      renderer.filterManager.applyFilter(shader, renderTarget, renderTarget, clear);
    }

    renderer.filterManager.applyFilter(shader, renderTarget, output, clear);

    renderer.filterManager.returnRenderTarget(renderTarget);
  }
};


Object.defineProperties(BlurDirFilter.prototype, {
    /**
     * Sets the strength of both the blur.
     *
     * @member {number}
     * @memberof filters.BlurDirFilter#
     * @default 2
     */
  blur: {
    get: function() {
      return this.strength;
    },
    set: function(value) {
      this.padding = value * 0.5;
      this.strength = value;
    },
  },
    /**
     * Sets the X direction of the blur.
     *
     * @member {number}
     * @memberof filters.BlurYFilter#
     * @default 0
     */
  dirX: {
    get: function() {
      return this.dirX;
    },
    set: function(value) {
      this.uniforms.dirX.value = value;
    },
  },
    /**
     * Sets the Y direction of the blur.
     *
     * @member {number}
     * @memberof filters.BlurDirFilter#
     * @default 0
     */
  dirY: {
    get: function() {
      return this.dirY;
    },
    set: function(value) {
      this.uniforms.dirY.value = value;
    },
  },
});
