'use strict';

const AlectoDevice = require('./../AlectoDevice');

module.exports = RFDevice => class Doorbell extends AlectoDevice(RFDevice) {
    onRFInit() {
		super.onRFInit();

		// Variables for timeout on the sensor
		this.sendToggleTimeout = {};
		this.toggleCapabilityValue = {};
    }

    static generateDevice(data) {
		if (data.toggle) return null;
		return super.generateDevice(data);
	}

    /**
	 * Function to set the sensor capability based on the state boolean
	 * 
	 * @param {*} data: Data from RFdriver 
	 */
	parseIncomingData(data) {
		data = super.parseIncomingData(data);

		this.getCapabilities().forEach(capabilityId => {
			if (!data.hasOwnProperty(capabilityId)) {
				data[capabilityId] = Boolean(Number(data.state));
			}
		});
		return data;
	}

	/**
	 * Function to set the sensor capability to state before building a payload
	 * 
	 * @param {*} data: Data to RFdriver 
	 */
	parseOutgoingData(data) {
		this.getCapabilities().forEach(capabilityId => {
			if (data.hasOwnProperty(capabilityId)) {
				data.state = data[capabilityId] ? 1 : 0;
			}
		});
		return data;
	}
    
    /**
	 * Additional function to modifiy a set capability.
	 * When called, the set timeout for sensors can be used to overwrite the capability after the timeout.
	 * Then return the normal setCapability with the modified data.
	 * 
	 * @param {*} capability 
	 * @param {*} value 
	 */
	setCapabilityValue(capability, value) {
		if (
			typeof value === 'boolean' &&
			this.options.sendToggleAfterTimeout &&
			(
				typeof this.options.sendToggleAfterTimeout === 'number' ||
				typeof this.options.sendToggleAfterTimeout === 'string' ||
				Array.isArray(this.options.sendToggleAfterTimeout) ||
				this.options.sendToggleAfterTimeout.hasOwnProperty(capability)
			) &&
			this.hasCapability(capability)
		) {
			const toggleValue = this.toggleCapabilityValue[capability];
			clearTimeout(this.sendToggleTimeout[capability]);
			delete this.toggleCapabilityValue[capability];
			if (toggleValue === undefined || toggleValue === null || toggleValue !== value) {
				let timeout;
				if (typeof this.options.sendToggleAfterTimeout === 'object' && !Array.isArray(this.options.sendToggleAfterTimeout)) {
					timeout = this.options.sendToggleAfterTimeout[capability];
				} else {
					timeout = this.options.sendToggleAfterTimeout;
				}
				if (Array.isArray(timeout)) {
					timeout = timeout[value ? 1 : 0];
				}
				if (typeof timeout === 'string') {
					timeout = this.getSetting(timeout);
					if (typeof timeout === 'string') {
						timeout = Number(timeout);
					}
					if (timeout && timeout < 1000) {
						timeout = timeout * 60 * 1000;
					}
				}
				if (timeout && typeof timeout === 'number') {
					this.sendToggleTimeout[capability] = setTimeout(async () => {
						const newValue = !value;
						this.toggleCapabilityValue[capability] = newValue;
						await this.emit('data', { [capability]: newValue, state: newValue ? 1 : 0 });
						delete this.toggleCapabilityValue[capability];
					}, timeout);
				}
			}
		}
        return super.setCapabilityValue(capability, value);
    }
};
