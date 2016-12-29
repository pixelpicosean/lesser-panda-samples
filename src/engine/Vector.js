const { clamp } = require('engine/utils/math');

/**
 * Vector instance pool
 * @private
 * @static
 * @type {array<Vector>}
 */
const pool = [];

/**
 * The Vector object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
 * Prefer {@link Vector.create} for new instances.
 *
 * @class Vector
 */
class Vector {
  /**
   * @constructor
   * @param  {Number} [x=0] X coordinate
   * @param  {Number} [y=0] Y coordinate
   */
  constructor(x, y) {
    /**
     * @type {Number}
     */
    this.x = x || 0;
    /**
     * @type {Number}
     */
    this.y = y || ((y !== 0) ? this.x : 0);
  }

  /**
   * Set vector values.
   * @method set
   * @memberof Vector#
   * @param {number} [x=0]  Position of the point on the x axis
   * @param {number} [y=0]  Position of the point on the y axis
   * @return {Vector}       Vector itself for chaining.
   */
  set(x, y) {
    this.x = x || 0;
    this.y = y || ((y !== 0) ? this.x : 0);
    return this;
  }

  /**
   * Clone this vector.
   * @method clone
   * @memberof Vector#
   * @return {Vector} The cloned vector.
   */
  clone() {
    return Vector.create(this.x, this.y);
  }

  /**
   * Copy values from another vector.
   * @method copy
   * @memberof Vector#
   * @param {Vector} v Vector to copy from.
   * @return {Vector}  Self for chaining.
   */
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  /**
   * Add to vector values.
   * @method add
   * @memberof Vector#
   * @param {number|Vector} x Number or `Vector` to add to self.
   * @param {number} [y]      Number to add to `y`.
   * @return {Vector}         Self for chaining.
   */
  add(x, y) {
    this.x += x instanceof Vector ? x.x : x;
    this.y += x instanceof Vector ? x.y : (y || ((y !== 0) ? x : 0));
    return this;
  }

  /**
   * Subtract from vector values.
   * @method subtract
   * @memberof Vector#
   * @param {number|Vector} x  Number or `Vector` to subtract from.
   * @param {number} [y]       Number to subtract from `y`.
   * @return {Vector}          Self for chaining.
   */
  subtract(x, y) {
    this.x -= x instanceof Vector ? x.x : x;
    this.y -= x instanceof Vector ? x.y : (y || ((y !== 0) ? x : 0));
    return this;
  }

  /**
   * Multiply self with another vector or 2 numbers.
   * @method multiply
   * @memberof Vector#
   * @param {number|Vector} x  Number or `Vector` to multiply.
   * @param {number} [y]       Number to multiply to `y`.
   * @return {Vector}          Self for chaining.
   */
  multiply(x, y) {
    this.x *= x instanceof Vector ? x.x : x;
    this.y *= x instanceof Vector ? x.y : (y || ((y !== 0) ? x : 0));
    return this;
  }

  /**
   * Divide self by another vector or 2 numbers.
   * @method divide
   * @memberof Vector#
   * @param {number|Vector} x  Number or `Vector` to divide.
   * @param {number} [y]       Number to divide by.
   * @return {Vector}          Self for chaining.
   */
  divide(x, y) {
    this.x /= x instanceof Vector ? x.x : x;
    this.y /= x instanceof Vector ? x.y : (y || ((y !== 0) ? x : 0));
    return this;
  }

  /**
   * Get distance of two vectors.
   * @method distance
   * @memberof Vector#
   * @param {Vector} vector Target vector to calculate distance from.
   * @return {number} Distance.
   */
  distance(vector) {
    const x = vector.x - this.x;
    const y = vector.y - this.y;
    return Math.sqrt(x * x + y * y);
  }

  /**
   * Get squared euclidian distance of two vectors.
   * @method squaredDistance
   * @memberof Vector#
   * @param {Vector} vector Target vector to calculate distance from.
   * @return {number} Squared distance value.
   */
  squaredDistance(vector) {
    const x = vector.x - this.x;
    const y = vector.y - this.y;
    return x * x + y * y;
  }

  /**
   * Get length of vector.
   * @method length
   * @memberof Vector#
   * @return {number} Length of this vector.
   */
  length() {
    return Math.sqrt(this.squaredLength());
  }

  /**
   * Get squared length of vector.
   * @method squaredLength
   * @memberof Vector#
   * @return {number} Squared length of this vector.
   */
  squaredLength() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Dot operation with another vector.
   * @method dot
   * @memberof Vector#
   * @param {Vector} [vector] Vector to dot with.
   * @return {number} Result of dot operation.
   */
  dot(vector) {
    if (vector instanceof Vector) {
      return this.x * vector.x + this.y * vector.y;
    }
    else {
      return this.x * this.x + this.y * this.y;
    }
  }

  /**
   * Get normalized dot of vector.
   * @method dotNormalized
   * @memberof Vector#
   * @param {Vector} [vector] Vector to dot with
   * @return {number} Result of the dot operation.
   */
  dotNormalized(vector) {
    const len1 = this.length();
    const x1 = this.x / len1;
    const y1 = this.y / len1;

    if (vector instanceof Vector) {
      const len2 = vector.length();
      const x2 = vector.x / len2;
      const y2 = vector.y / len2;
      return x1 * x2 + y1 * y2;
    }
    else {
      return x1 * x1 + y1 * y1;
    }
  }

  /**
   * Rotate vector in radians.
   * @method rotate
   * @memberof Vector#
   * @param {number} angle Angle to rotate.
   * @return {Vector} Self for chaining.
   */
  rotate(angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const x = this.x * c - this.y * s;
    const y = this.y * c + this.x * s;
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Normalize vector.
   * @method normalize
   * @memberof Vector#
   * @return {Vector} Self for chaining
   */
  normalize() {
    const len = this.length();
    this.x /= len || 1;
    this.y /= len || 1;
    return this;
  }

  /**
   * Limit vector values.
   * @method limit
   * @memberof Vector#
   * @param {Vector} vector Clamp this vector to a limitation(vector)
   * @return {Vector}       Self for chaining.
   */
  limit(vector) {
    this.x = clamp(this.x, -vector.x, vector.x);
    this.y = clamp(this.y, -vector.y, vector.y);
    return this;
  }

  /**
   * Get angle vector angle or angle between two vectors.
   * @method angle
   * @memberof Vector#
   * @param {Vector} [vector] Target vector to calculate with, angle of self is returned when it is not provided.
   * @return {number} Angle between self and target.
   */
  angle(vector) {
    if (vector) {
      return Math.atan2(vector.y - this.y, vector.x - this.x);
    }
    else {
      return Math.atan2(this.y, this.x);
    }
  }

  /**
   * Get angle between two vectors from origin.
   * @method angleFromOrigin
   * @memberof Vector#
   * @param {Vector} vector The vector to calculate angle from.
   * @return {number} Angle.
   */
  angleFromOrigin(vector) {
    return Math.atan2(vector.y, vector.x) - Math.atan2(this.y, this.x);
  }

  /**
   * Round vector values.
   * @method round
   * @memberof Vector#
   * @return {Vector} Self for chaining
   */
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }

  /**
   * Returns true if the given point is equal to this point
   * @method equals
   * @memberof Vector#
   * @param  {Vector} vector Vector to compare to.
   * @return {boolean}  Whether the two vectors are equal
   */
  equals(vector) {
    return (vector.x === this.x) && (vector.y === this.y);
  }

  /**
   * Change this vector to be perpendicular to what it was before. (Effectively
   * roatates it 90 degrees in a clockwise direction)
   * @method perp
   * @memberof Vector#
   * @return {Vector} Self for chaining.
   */
  perp() {
    const x = this.x;
    this.x = this.y;
    this.y = -x;
    return this;
  }

  /**
   * Reverse this vector
   * @method reverse
   * @memberof Vector#
   * @return {Vector} Self for chaining.
   */
  reverse() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  /**
   * Project this vector on to another vector.
   * @method project
   * @memberof Vector#
   * @param {Vector} other The vector to project onto
   * @return {Vector} Self for chaining.
   */
  project(other) {
    const amt = this.dot(other) / other.squaredLength();
    this.x = amt * other.x;
    this.y = amt * other.y;
    return this;
  }

  /**
   * Project this vector onto a vector of unit length. This is slightly more efficient
   * than `project` when dealing with unit vectors.
   * @method projectN
   * @memberof Vector#
   * @param {Vector} other The unit vector to project onto
   * @return {Vector} Self for chaining.
   */
  projectN(other) {
    const amt = this.dot(other);
    this.x = amt * other.x;
    this.y = amt * other.y;
    return this;
  }

  /**
   * Reflect this vector on an arbitrary axis.
   * @method reflect
   * @memberof Vector#
   * @param {Vector} axis The vector representing the axis
   * @return {Vector} Self for chaining.
   */
  reflect(axis) {
    const x = this.x;
    const y = this.y;
    this.project(axis).multiply(2);
    this.x -= x;
    this.y -= y;
    return this;
  }

  /**
   * Reflect this vector on an arbitrary axis (represented by a unit vector). This is
   * slightly more efficient than `reflect` when dealing with an axis that is a unit vector.
   * @method reflectN
   * @memberof Vector#
   * @param {Vector} axis The unit vector representing the axis
   * @return {Vector} Self for chaining.
   */
  reflectN(axis) {
    const x = this.x;
    const y = this.y;
    this.projectN(axis).multiply(2);
    this.x -= x;
    this.y -= y;
    return this;
  }

  /**
   * Check whether the direction from self to other vector is clockwise.
   * @method sign
   * @memberof Vector#
   * @param {Vector} vector Vector to calculate from
   * @return {number} Result (1 = CW, -1 = CCW)
   */
  sign(vector) {
    return (this.y * vector.x > this.x * vector.y) ? -1 : 1;
  }
}

/**
 * Create a vecotr instance. This is prefered than `new Vector()` since
 * the instance may come from the pool.
 * @param  {number} [x] Position of the point on the x axis
 * @param  {number} [y] Position of the point on the y axis
 * @return {Vector}     Vector instance
 */
Vector.create = function(x, y) {
  let v = pool.pop();
  if (!v) {
    v = new Vector(x, y);
  }
  else {
    v.set(x, y);
  }
  return v;
};

/**
 * Recycle a `Vector` instance into the pool for later use.
 * @see Vector.create
 * @param  {Vector} vector Vector instance to be recycled.
 */
Vector.recycle = function(vector) {
  pool.push(vector);
};

/**
 * @exports engine/Vector
 * @see Vector
 */
module.exports = Vector;
