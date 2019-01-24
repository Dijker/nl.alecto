'use strict';

const util = require('homey-rfdriver').util;
const Doorbell = require('./Doorbell');

module.exports = RFDevice => class DipswitchDoorbell extends Doorbell(RFDevice) {
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
		console.log('length', dipswitches.length);

		if (dipswitches.length === 1) {
			if (dipswitches[0].length === 4) {
				dipswitches[0].push(false, false); //add two virtual dipswitches to keep the signal equal to a 6 bit address
			}
		}
		const data = {
			address: `${dipswitches[0].reduce((result, next) => result += next ? '00' : '01', '')}0101`,
			sound: '11000000',
			state: 0,
		};
		data.id = data.address;
		console.log('data from dipswitch', data);
    return data;
  }

  static payloadToData(payload) { // Convert received data to usable variables
		const data = {
			address: util.bitArrayToString(payload.slice(0, 16)),
			sound: util.bitArrayToString(payload.slice(16, 24)),
			state: 1,
		};
		data.id = data.address;
		console.log('data from payload', data);
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
