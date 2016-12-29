const AbstractFilter = require('../../core/renderers/webgl/filters/AbstractFilter');

/**
 * This applies a sepia effect to your Display Objects.
 *
 * @class
 * @extends AbstractFilter
 */
function SepiaFilter() {
  AbstractFilter.call(this,
        // vertex shader
        null,
        // fragment shader
        require('./sepia.frag'),
        // custom uniforms
    {
      sepia: { type: '1f', value: 1 },
    }
    );
}

SepiaFilter.prototype = Object.create(AbstractFilter.prototype);
SepiaFilter.prototype.constructor = SepiaFilter;
module.exports = SepiaFilter;

Object.defineProperties(SepiaFilter.prototype, {
    /**
     * The strength of the sepia. `1` will apply the full sepia effect, and
     * `0` will make the object its normal color.
     *
     * @member {number}
     * @memberof filters.SepiaFilter#
     */
  sepia: {
    get: function() {
      return this.uniforms.sepia.value;
    },
    set: function(value) {
      this.uniforms.sepia.value = value;
    },
  },
});
