'use strict';

const DefaultDriver = require('../../../drivers/lib/driver');

module.exports = class SA33 extends DefaultDriver {
	constructor(config) {
		super(config);
		this.toggleTimeout = {};
		this.on('frame', this.updateState.bind(this));
		this.on('new_state', this.updateRealtime.bind(this));
		this.on('new_pairing_device', device => this.updateState(device.data));
	}

	sendToggleAfterTimeout(deviceId, frame) {
		if (
			frame.alarm_smoke &&
			(this.isPairing || this.getDevice(deviceId, true))
		) {
			clearTimeout(this.toggleTimeout[deviceId]);
			this.toggleTimeout[deviceId] = setTimeout(
				() => this.getDevice(deviceId, true) && this.emit(
					'frame',
					Object.assign({}, this.getLastFrame(deviceId) || this.getDevice(deviceId, true), {
						alarm_smoke: false,
						toggle: true,
					})
				),
				20000
			);
		}
	}

	payloadToData(payload) { // Convert received data to usable variables
		const data = {
			address: this.bitArrayToString(payload),
			alarm_smoke: true,
		};
		data.id = data.address;
		return data;
	}

	dataToPayload(data) {
		return this.bitStringToBitArray(data.address);
	}

	updateState(frame) {
		this.sendToggleAfterTimeout(frame.id, frame);
		this.setState(frame.id, Object.assign({}, this.getState(frame.id), frame));
	}

	updateRealtime(device, state, oldState) {
		if (state.alarm_smoke !== oldState.alarm_smoke) {
			this.realtime(device, 'alarm_smoke', state.alarm_smoke);
		}
	}

	getExports() {
		const exports = super.getExports();
		exports.capabilities = exports.capabilities || {};
		exports.capabilities.alarm_smoke = {
			get: (device, callback) => {
				callback(null, this.getState(device).alarm_smoke);
			},
		};
		return exports;
	}
};
