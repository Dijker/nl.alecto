'use strict';

const Doorbell = require('../../lib/devices/Doorbell');

module.exports = RFDevice => class ADB15Device extends Doorbell(RFDevice) {};
