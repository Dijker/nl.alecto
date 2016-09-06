'use strict';

const ADB12 = require('./ADB-12');

module.exports = class ADB18 extends ADB12 {
	dipswitchesToData(dipswitches) {
		const data = {
			address: `${dipswitches.reduce((result, next) => result += next ? '00' : '01', '')}01010101`,
			sound: '11000000',
			state: 0,
		};
		data.id = data.address;
		return data;
	}
};
