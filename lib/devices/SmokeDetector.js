'use strict';

const util = require('homey-rfdriver').util;

module.exports = RFDevice => class AlectoDevice extends RFDevice {
    onRFInit() {
		super.onRFInit();

		// Variables for timeout on the sensor
		this.sendToggleTimeout = {};
		this.toggleCapabilityValue = {};
    }

    static payloadToData(payload) { // Convert received data to usable variables
		const data = {
			address: util.bitArrayToString(payload),
			alarm_smoke: true,
		};
		data.id = data.address;
		return data;
	}

    static dataToPayload(data) {
		return util.bitStringToBitArray(data.address);
    }
    
    parseIncomingData(data) {
		if (this.hasCapability('alarm_smoke')) {
			if (!this.getCapabilityValue('alarm_smoke')) {
				data.alarm_smoke = true;
			}

			clearTimeout(this.resetDebouncer);
			this.resetDebouncer = setTimeout(
				() => this.emit('data', Object.assign({}, data, { alarm_smoke: false })),
				2000
			);
		}
		return data;
	}
}
