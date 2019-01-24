'use strict';

const DipswitchDoorbell = require('../../lib/devices/DipswitchDoorbell');

module.exports = RFDevice => class ADB12Device extends DipswitchDoorbell(RFDevice) {};
