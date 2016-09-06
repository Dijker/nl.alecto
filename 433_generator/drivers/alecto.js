'use strict';

const DefaultDriver = require('../../drivers/lib/driver');

module.exports = class Alecto extends DefaultDriver {
	constructor(config) {
		super(config);
		this.on('frame', this.updateState.bind(this));
		this.on('new_state', this.updateRealtime.bind(this));
		this.on('new_pairing_device', device => this.updateState(device.data));
	}

	generateData() {
		const data = {
			address: Math.random().toString(2).substr(2, this.config.signalLength),
			state: 0,
			generated: true,
		};
		data.id = data.address;
		return data;
	}

	payloadToData(payload) { // Convert received data to usable variables
		if (payload.length === this.config.signalLength) {
			return { id: this.bitArrayToString(payload), state: 1 };
		}
		return null;
	}

	dataToPayload(data) {
		if (data.address.length === this.config.signalLength) {
			return this.bitStringToBitArray(data.address);
		}
		return null;
	}

	updateState(frame) {
		this.setState(frame.id, Object.assign({}, this.getState(frame.id), frame));
	}

	updateRealtime(device, state, oldState) {
		if (Boolean(Number(state.state)) !== Boolean(Number(oldState.state))) {
			this.realtime(device, 'onoff', Boolean(Number(state.state)));
		}
	}

	getExports() {
		const exports = super.getExports();
		exports.capabilities = exports.capabilities || {};
		exports.capabilities.onoff = {
			get: (device, callback) => callback(null, Boolean(Number(this.getState(device).state))),
			set: (device, state, callback) => this.send(device, { state: state ? 1 : 0 }, () => callback(null, state)),
		};
		return exports;
	}
};
