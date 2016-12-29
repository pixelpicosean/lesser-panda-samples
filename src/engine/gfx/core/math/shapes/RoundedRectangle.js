const CONST = require('../../../const');

/**
 * The Rounded Rectangle object is an area that has nice rounded corners, as indicated by its top-left corner point (x, y) and by its width and its height and its radius.
 *
 * @class
 */
class RoundedRectangle {
  /**
   * @constructor
   * @param {number} x      The X coordinate of the upper-left corner of the rounded rectangle
   * @param {number} y      The Y coordinate of the upper-left corner of the rounded rectangle
   * @param {number} width  The overall width of this rounded rectangle
   * @param {number} height The overall height of this rounded rectangle
   * @param {number} radius Controls the radius of the rounded corners
   */
  constructor(x, y, width, height, radius) {
    /**
     * @member {number}
     * @default 0
     */
    this.x = x || 0;

    /**
     * @member {number}
     * @default 0
     */
    this.y = y || 0;

    /**
     * @member {number}
     * @default 0
     */
    this.width = width || 0;

    /**
     * @member {number}
     * @default 0
     */
    this.height = height || 0;

    /**
     * @member {number}
     * @default 20
     */
    this.radius = radius || 20;

    /**
     * The type of the object, mainly used to avoid `instanceof` checks
     *
     * @member {number}
     */
    this.type = CONST.SHAPES.RREC;
  }

  /**
   * Creates a clone of this Rounded Rectangle
   *
   * @return {RoundedRectangle} a copy of the rounded rectangle
   */
  clone() {
    return new RoundedRectangle(this.x, this.y, this.width, this.height, this.radius);
  }

  /**
   * Checks whether the x and y coordinates given are contained within this Rounded Rectangle
   *
   * @param {number} x The X coordinate of the point to test
   * @param {number} y The Y coordinate of the point to test
   * @return {boolean} Whether the x/y coordinates are within this Rounded Rectangle
   */
  contains(x, y) {
    if (this.width <= 0 || this.height <= 0) {
      return false;
    }

    if (x >= this.x && x <= this.x + this.width) {
      if (y >= this.y && y <= this.y + this.height) {
        return true;
      }
    }

    return false;
  }
}

module.exports = RoundedRectangle;
