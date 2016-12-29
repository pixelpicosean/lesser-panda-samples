const AbstractFilter = require('../../core/renderers/webgl/filters/AbstractFilter');

/**
 * This filter applies a twist effect making display objects appear twisted in the given direction.
 *
 * @class
 * @extends AbstractFilter
 */
function TwistFilter() {
  AbstractFilter.call(this,
        // vertex shader
        null,
        // fragment shader
        require('./twist.frag'),
        // custom uniforms
    {
      radius: { type: '1f', value: 0.5 },
      angle: { type: '1f', value: 5 },
      offset: { type: 'v2', value: { x: 0.5, y: 0.5 } },
    }
    );
}

TwistFilter.prototype = Object.create(AbstractFilter.prototype);
TwistFilter.prototype.constructor = TwistFilter;
module.exports = TwistFilter;

Object.defineProperties(TwistFilter.prototype, {
    /**
     * This point describes the the offset of the twist.
     *
     * @member {Point}
     * @memberof filters.TwistFilter#
     */
  offset: {
    get: function() {
      return this.uniforms.offset.value;
    },
    set: function(value) {
      this.uniforms.offset.value = value;
    },
  },

    /**
     * This radius of the twist.
     *
     * @member {number}
     * @memberof filters.TwistFilter#
     */
  radius: {
    get: function() {
      return this.uniforms.radius.value;
    },
    set: function(value) {
      this.uniforms.radius.value = value;
    },
  },

    /**
     * This angle of the twist.
     *
     * @member {number}
     * @memberof filters.TwistFilter#
     */
  angle: {
    get: function() {
      return this.uniforms.angle.value;
    },
    set: function(value) {
      this.uniforms.angle.value = value;
    },
  },
});
