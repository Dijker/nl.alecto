'use strict';

const Doorbell = require('../../lib/devices/Doorbell');
const util = require('homey-rfdriver').util;

module.exports = RFDevice => class ADB15Device extends Doorbell(RFDevice) {
    static generateData() {
		const data = {
			address: util.generateRandomBitString(17), //alecto 1/4 is 17bit long
			state: 0,
			generated: true,
		};
		data.id = data.address;
		return data;
	}
};
