'use strict';

const util = require('homey-rfdriver').util;

module.exports = RFDevice => class AlectoDevice extends RFDevice {
       
    static payloadToData(payload) { // Convert received data to usable variables
		if (payload.length === 17 || payload.length === 24) {
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
			if (data.address.length === 17 || payload.length === 24) {
				return util.bitStringToBitArray(data.address);
			}
		return null;
	}
};
