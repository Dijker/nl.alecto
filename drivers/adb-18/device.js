'use strict';

const DipswitchDoorbell = require('../../lib/devices/DipswitchDoorbell');

module.exports = RFDevice => class ADB18Device extends DipswitchDoorbell(RFDevice) {};
