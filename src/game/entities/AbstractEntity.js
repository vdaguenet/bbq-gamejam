'use strict';

/**
 * AbstractEntity class
 * Will be extended by each Game Entity
 */
export default class AbstractEntity {
  constructor(options) {
    this.position = options.position || {x: 0, y: 0};
    this.velocity = options.velocity || {x: 0, y: 0};
    this.acceleration = options.acceleration || {x: 0, y: 0};
    this.mass = options.mass || 1;
  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

  applyImpulse(impulse, scale = 1) {
    this.velocity.x += impulse.x * scale / this.mass;
    this.velocity.y += impulse.y * scale / this.mass;
  }

  applyForce(force, scale = 1) {
    this.acceleration.x += force.x * scale / this.mass;
    this.acceleration.y += force.y * scale / this.mass;
  }
}
