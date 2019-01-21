'use strict';

const SmokeDetector = require('../../lib/devices/SmokeDetector');

module.exports = RFDriver => class SA33Device extends SmokeDetector(RFDriver) {};
