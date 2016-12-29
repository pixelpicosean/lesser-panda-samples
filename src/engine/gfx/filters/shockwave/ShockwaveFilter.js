const AbstractFilter = require('../../core/renderers/webgl/filters/AbstractFilter');

/**
 * The ColorMatrixFilter class lets you apply a 4x4 matrix transformation on the RGBA
 * color and alpha values of every pixel on your displayObject to produce a result
 * with a new set of RGBA color and alpha values. It's pretty powerful!
 *
 * @class
 * @extends AbstractFilter
 */
function ShockwaveFilter() {
  AbstractFilter.call(this,
        // vertex shader
        null,
        // fragment shader
        require('./shockwave.frag'),
        // custom uniforms
    {
      center: { type: 'v2', value: { x: 0.5, y: 0.5 } },
      params: { type: 'v3', value: { x: 10, y: 0.8, z: 0.1 } },
      time: { type: '1f', value: 0 },
    }
    );
}

ShockwaveFilter.prototype = Object.create(AbstractFilter.prototype);
ShockwaveFilter.prototype.constructor = ShockwaveFilter;
module.exports = ShockwaveFilter;

Object.defineProperties(ShockwaveFilter.prototype, {
    /**
     * Sets the center of the shockwave in normalized screen coords. That is
     * (0,0) is the top-left and (1,1) is the bottom right.
     *
     * @member {object<string, number>}
     * @memberof filters.ShockwaveFilter#
     */
  center: {
    get: function() {
      return this.uniforms.center.value;
    },
    set: function(value) {
      this.uniforms.center.value = value;
    },
  },
    /**
     * Sets the params of the shockwave. These modify the look and behavior of
     * the shockwave as it ripples out.
     *
     * @member {object<string, number>}
     * @memberof filters.ShockwaveFilter#
     */
  params: {
    get: function() {
      return this.uniforms.params.value;
    },
    set: function(value) {
      this.uniforms.params.value = value;
    },
  },
    /**
     * Sets the elapsed time of the shockwave. This controls the speed at which
     * the shockwave ripples out.
     *
     * @member {number}
     * @memberof filters.ShockwaveFilter#
     */
  time: {
    get: function() {
      return this.uniforms.time.value;
    },
    set: function(value) {
      this.uniforms.time.value = value;
    },
  },
});
