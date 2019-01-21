'use strict';

const Doorbell = require('../../lib/devices/Doorbell');
const util = require('homey-rfdriver').util;

module.exports = RFDevice => class ADB12Device extends Doorbell(RFDevice) {

    static dipswitchesToData(dipswitches) {
		const data = {
			address: `${dipswitches.reduce((result, next) => result += next ? '00' : '01', '')}0101`,
			sound: '11000000',
			state: 0,
		};
		data.id = data.address;
        return data;
    }

    static payloadToData(payload) { // Convert received data to usable variables
		const data = {
			address: util.bitArrayToString(payload.slice(0, 16)),
			sound: util.bitArrayToString(payload.slice(16, 24)),
			state: 1,
		};
		data.id = data.address;
		return data;
    }
    
    static dataToPayload(data) {
		return util.bitStringToBitArray(data.address)
			.concat(util.bitStringToBitArray(this.getSettings(data.id).sound || data.sound)); // move to onData
	}
};
