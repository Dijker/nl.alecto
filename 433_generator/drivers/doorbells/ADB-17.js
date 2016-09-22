'use strict';

const Doorbell = require('../doorbell');

module.exports = class ADB17 extends Doorbell {

	generateData() {
		const data = {
			address: `${Math.random().toString(2).substr(2, 13)}1${Math.round(Math.random())}11`,
			state: 0,
		};
		data.id = data.address;
		return data;
	}
};
