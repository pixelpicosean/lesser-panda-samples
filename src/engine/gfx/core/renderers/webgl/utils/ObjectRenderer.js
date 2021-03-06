var WebGLManager = require('../managers/WebGLManager');

/**
 * Base for a common object renderer that can be used as a system renderer plugin.
 *
 * @class
 * @extends WebGLManager
 * @param renderer {WebGLRenderer} The renderer this object renderer works for.
 */
function ObjectRenderer(renderer) {
  WebGLManager.call(this, renderer);
}


ObjectRenderer.prototype = Object.create(WebGLManager.prototype);
ObjectRenderer.prototype.constructor = ObjectRenderer;
module.exports = ObjectRenderer;

/**
 * Starts the renderer and sets the shader
 *
 */
ObjectRenderer.prototype.start = function() {
  // set the shader..
};

/**
 * Stops the renderer
 *
 */
ObjectRenderer.prototype.stop = function() {
  this.flush();
};

/**
 * flushes
 *
 */
ObjectRenderer.prototype.flush = function() {
  // flush!
};

/**
 * Renders an object
 *
 * @param object {DisplayObject} The object to render.
 */
ObjectRenderer.prototype.render = function(object) { /* eslint no-unused-vars:0*/
  // render the object
};
