const AbstractFilter = require('../../core/renderers/webgl/filters/AbstractFilter');

/**
 * This inverts your Display Objects colors.
 *
 * @class
 * @extends AbstractFilter
 */
function InvertFilter() {
  AbstractFilter.call(this,
        // vertex shader
        null,
        // fragment shader
        require('./invert.frag'),
        // custom uniforms
    {
      invert: { type: '1f', value: 1 },
    }
    );
}

InvertFilter.prototype = Object.create(AbstractFilter.prototype);
InvertFilter.prototype.constructor = InvertFilter;
module.exports = InvertFilter;

Object.defineProperties(InvertFilter.prototype, {
    /**
     * The strength of the invert. `1` will fully invert the colors, and
     * `0` will make the object its normal color.
     *
     * @member {number}
     * @memberof filters.InvertFilter#
     */
  invert: {
    get: function() {
      return this.uniforms.invert.value;
    },
    set: function(value) {
      this.uniforms.invert.value = value;
    },
  },
});
