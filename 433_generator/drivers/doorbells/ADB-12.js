'use strict';

const Doorbell = require('../doorbell');

module.exports = class ADB12 extends Doorbell {

	dipswitchesToData(dipswitches) {
		const data = {
			address: `${dipswitches.reduce((result, next) => result += next ? '00' : '01', '')}0101`,
			sound: '11000000',
			state: 0,
		};
		data.id = data.address;
		return data;
	}

	payloadToData(payload) { // Convert received data to usable variables
		const data = {
			address: this.bitArrayToString(payload.slice(0, 16)),
			sound: this.bitArrayToString(payload.slice(16, 24)),
			state: 1,
		};
		data.id = data.address;
		return data;
	}

	dataToPayload(data) {
		return this.bitStringToBitArray(data.address)
			.concat(this.bitStringToBitArray(this.getSettings(data.id).sound || data.sound));
	}

	generateDevice(data) {
		if (data.toggle) {
			return null;
		}
		return {
			name: __(this.config.name),
			data: Object.assign({}, data, { driver_id: this.config.id }),
			settings: {
				sound: data.sound,
			},
		};
	}
};
