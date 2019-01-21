'use strict';

const util = require('homey-rfdriver').util;

module.exports = RFDevice => class AlectoDevice extends RFDevice {

    static generateData() {
		const data = {
			address: util.generateRandomBitString(this.config.signalLength),
			state: 0,
			generated: true,
		};
		data.id = data.address;
		return data;
    }
    
    static payloadToData(payload) { // Convert received data to usable variables
		if (payload.length === this.config.signalLength) {
			const data = {
				address: util.bitArrayToString(payload),
				state: 1,
			};
			data.id = data.address;
			return data;
		}
		return null;
    }
    
    static dataToPayload(data) {
		if (data.address.length === this.config.signalLength) {
			return util.bitStringToBitArray(data.address);
		}
		return null;
	}
};
