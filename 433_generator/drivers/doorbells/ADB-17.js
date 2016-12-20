'use strict';

const Doorbell = require('../doorbell');
const Signal = require('../../../drivers/lib/signal');

module.exports = class ADB17 extends Doorbell {
	constructor(config) {
		super(config);

		this.alternativeSignal = new Signal(
			this.config.alternativeSignal,
			this.payloadToData.bind(this),
			this.config.debounceTimeout,
			this.logger
		);

		this.alternativeSignal.on('error', (err) => {
			this.logger.error(err);
			this.emit('signal_error');
		});
		this.alternativeSignal.on('data', (frame) => {
			this.logger.verbose('Driver->data', frame);
			this.received(frame);
			this.emit('frame', Object.assign({ signal: this.config.alternativeSignal }, frame));
		});
		this.alternativeSignal.on('payload_send', payload => {
			this.logger.verbose('Driver->payload_send', payload);
			const frame = this.payloadToData(payload);
			if (frame) {
				this.emit('frame', Object.assign({ signal: this.config.alternativeSignal }, frame));
				this.emit('frame_send', Object.assign({ signal: this.config.alternativeSignal }, frame));
			}
		});
	}

	registerSignal(callback) {
		this.logger.verbose('Driver:registerSignal(callback)', callback);
		const registerPromises = [];
		let hasSignal = false;
		let hasAlternativeSignal = false;
		for (const deviceEntry of this.devices) {
			if (!hasSignal && !deviceEntry[1].signal) {
				hasSignal = true;
			} else if (!hasAlternativeSignal && deviceEntry[1].signal === 'alecto4') {
				hasAlternativeSignal = true;
			}
		}
		if (this.isPairing || hasSignal) {
			registerPromises.push(this.signal.register());
		}
		if (this.isPairing || hasAlternativeSignal) {
			registerPromises.push(this.alternativeSignal.register());
		}
		return Promise.all(registerPromises).then(() => callback()).catch(callback);
	}

	unregisterSignal() {
		this.logger.verbose('Driver:unregisterSignal()+shouldUnregister', !this.isPairing && this.devices.size === 0);
		if (!this.isPairing) {
			if (this.devices.size === 0) {
				this.signal.unregister();
				this.alternativeSignal.unregister();
			} else {
				let hasSignal = false;
				let hasAlternativeSignal = false;
				for (const deviceEntry of this.devices) {
					if (!hasSignal && !deviceEntry[1].signal) {
						hasSignal = true;
					} else if (!hasAlternativeSignal && deviceEntry[1].signal === 'alecto4') {
						hasAlternativeSignal = true;
					}
				}
				console.log('unregister', this.devices, hasSignal, hasAlternativeSignal);
				if (!hasSignal) {
					this.signal.unregister();
				}
				if (!hasAlternativeSignal) {
					this.alternativeSignal.unregister();
				}
				if (!hasSignal || !hasAlternativeSignal) {
					return true;
				}
			}
		}
		return false;
	}

	send(device, data, callback, options) {
		callback = typeof callback === 'function' ? callback : (() => null);
		return Promise.all([
			super.send(
				device,
				data,
				callback,
				Object.assign({ signal: this.signal }, options)
			),
			super.send(
				device,
				data,
				callback,
				Object.assign({ signal: this.alternativeSignal }, options)
			),
		]).then((result) => console.log('send result', result) & callback(null, result)).catch(err => console.log('send err', err) & callback(err));
	}

	generateData() {
		const data = {
			address: `${Math.random().toString(2).substr(2, 13)}1${Math.round(Math.random())}11`,
			state: 0,
		};
		data.id = data.address;
		return data;
	}
};
