'use strict';

const Doorbell = require('../../lib/devices/Doorbell');
const util = require('homey-rfdriver').util;

module.exports = RFDevice => class ADB18Device extends Doorbell(RFDevice) {
	static generateData() {
		const data = {
			address: util.generateRandomBitString(24), //alecto 2 is 24bit long
			state: 0,
			generated: true,
		};
		data.id = data.address;
		return data;
	}

	static dipswitchesToData(dipswitches) {
		const data = {
			address: `${dipswitches.reduce((result, next) => result += next ? '00' : '01', '')}01010101`,
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
		return util.bitStringToBitArray(data.address).concat(util.bitStringToBitArray(data.sound)); 
	}

	parseOutgoingData(outgoingData) {
		outgoingData.sound = this.getSetting('sound') || outgoingData.sound;
		return outgoingData;
	}
};
