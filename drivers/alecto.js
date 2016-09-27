var Debouncer = require('./debouncer.js');
var debouncer;
var deviceList = [];
var tempdata = {};
var initFlag = 1;
var signalRegisterDoneFlags = [0,0,0,0,0];
var tempdata = {};
var released;

var Signal = Homey.wireless('433').Signal; 
var Alecto_1;
var Alecto_2_0;
var Alecto_2_1;
var Alecto_3;
var Alecto_4;

var numberToBitArray = function(number, bit_count) {
	var result = [];
	for (var i = 0; i < bit_count; i++)
		result[i] = (number >> i) & 1;
	return result;
};

var bitArrayToNumber = function(bits) {
	return parseInt(bits.join(""),2);
};

var bitStringToBitArray = function(str) {
	var result = [];
	for (var i = 0; i < str.length; i++)
		result.push(str.charAt(i) == '1' ? 1 : 0);
	return result;
};

var bitArrayToString = function(bits) {
	return bits.join("");
};

function createDriver(driver) {
	var self = {
		init: function( devices, callback ) {
			debouncer = new Debouncer(1000);

			//Define signal
			if(initFlag){
				initFlag = 0;
				initAlecto_1(self);
				initAlecto_2_1(self);
				initAlecto_2_0(self);
				initAlecto_3(self);
				initAlecto_4(self);

				var initCheck = setInterval(function(){
					console.log('check')
					if(signalRegisterDoneFlags.indexOf(0) >= 0) return;
					console.log('done')
					clearTimeout(initCheck);
					callback();
				}, 200);
			}


			//Refresh deviceList
			devices.forEach(function(device){
				addDevice(device);
			});

			// flowInit(self); Disabled flow cards for deprecated drivers
 
			callback();
		},
		
		deleted: function( device_data ) {
			var index = deviceList.indexOf(getDeviceByID(device_data.id))
			delete deviceList[index];
			console.log('Alecto: Device deleted')
		},
		
		pair: function( socket ) {
			socket.on('imitate1', function learn( data, callback ){		
				function partialApply(fn) {
					return function self (payload) {
						fn(payload, socket, self);
					}
				}

				Alecto_1.on( 'payload', partialApply(imitateAlecto_1) );
				Alecto_2_0.on( 'payload', partialApply(imitateAlecto_2_0) );
				Alecto_2_1.on( 'payload', partialApply(imitateAlecto_2_1) );
				Alecto_3.on( 'payload', partialApply(imitateAlecto_3) );
				Alecto_4.on( 'payload', partialApply(imitateAlecto_4) );
			});

			socket.on('done', function( data, callback ){
				var id = "" + tempdata.address + Math.round(Math.random() * 0xFFFF); //id is for self.realtime
				//store data in our driver
				addDevice({
					id      : id,
					address : tempdata.address,
					signal  : tempdata.signal,
					driver  : driver,
				});

				console.log('adding:', id, tempdata.address, driver)

				//Share data to front end
				callback(null, {
					name: __(driver),
					data: {
						id      : id,
						address : tempdata.address,
						signal  : tempdata.signal,
						driver  : driver,
					}
				});
			});
		},
	};
	return self;
}

function imitateAlecto_1(payload, socket, partialApply){
	Alecto_1.removeListener( 'payload', partialApply );
	Alecto_2_0.removeListener( 'payload', partialApply );
	Alecto_2_1.removeListener( 'payload', partialApply );
	Alecto_3.removeListener( 'payload', partialApply );
	Alecto_4.removeListener( 'payload', partialApply );
	tempdata = {
		address: bitArrayToString(payload),
		signal : "Alecto_1"
	}
	socket.emit('remote_found');
}

function imitateAlecto_2_0(payload, socket, partialApply ){
	Alecto_1.removeListener( 'payload', partialApply );
	Alecto_2_0.removeListener( 'payload', partialApply );
	Alecto_2_1.removeListener( 'payload', partialApply );
	Alecto_3.removeListener( 'payload', partialApply );
	Alecto_4.removeListener( 'payload', partialApply );
	tempdata = {
		address: bitArrayToString(payload),
		signal : "Alecto_2_0"
	}
	socket.emit('remote_found');
}

function imitateAlecto_2_1(payload, socket, partialApply ){
	Alecto_1.removeListener( 'payload', partialApply );
	Alecto_2_0.removeListener( 'payload', partialApply );
	Alecto_2_1.removeListener( 'payload', partialApply );
	Alecto_3.removeListener( 'payload', partialApply );
	Alecto_4.removeListener( 'payload', partialApply );
	tempdata = {
		address: bitArrayToString(payload),
		signal : "Alecto_2_1"
	}
	socket.emit('remote_found');
}

function imitateAlecto_3(payload, socket, partialApply ){
	Alecto_1.removeListener( 'payload', partialApply );
	Alecto_2_0.removeListener( 'payload', partialApply );
	Alecto_2_1.removeListener( 'payload', partialApply );
	Alecto_3.removeListener( 'payload', partialApply );
	Alecto_4.removeListener( 'payload', partialApply );
	tempdata = {
		address: bitArrayToString(payload),
		signal : "Alecto_3"
	}
	socket.emit('remote_found');
}

function imitateAlecto_4(payload, socket, partialApply ){
	Alecto_1.removeListener( 'payload', partialApply );
	Alecto_2_0.removeListener( 'payload', partialApply );
	Alecto_2_1.removeListener( 'payload', partialApply );
	Alecto_3.removeListener( 'payload', partialApply );
	Alecto_4.removeListener( 'payload', partialApply );
	tempdata = {
		address: bitArrayToString(payload),
		signal : "Alecto_4"
	}
	socket.emit('remote_found');
}

function getDeviceByID(idIn) {
	var matches = deviceList.filter(function(d){
		return d.id == idIn; 
	});
	return matches ? matches[0] : null;
}

function getDevicesByAddress(addressIn) {
	var matches = deviceList.filter(function(d){
		return d.address == addressIn; 
	});
	return matches ? matches : null;
}

function addDevice(deviceIn) {
	deviceList.push(deviceIn);
}

module.exports = {
	createDriver: createDriver
};

function initAlecto_1(self){ //ADB-18
	Alecto_1 = new Signal('alecto_1');

	Alecto_1.register(function( err, success ){
	    if(err != null) console.log('Alecto_1: Error:', err, 'success:', success);
	    else signalRegisterDoneFlags[0] = 1;
	});
	
	//Start receiving
	Alecto_1.on('payload', function(payload, first){
		payload = bitArrayToString(payload);
		clearTimeout(released);
		released = setTimeout(function(){
			var devices = getDevicesByAddress(payload);
	        devices.forEach(function(device){
				self.realtime(device, 'onoff', false);
			});
		},500);
		if(debouncer.check(payload)) return;
        var devices = getDevicesByAddress(payload);
        devices.forEach(function(device){
			self.realtime(device, 'onoff', true);
		});
	});
}

function initAlecto_2_0(self){ //ADB-17 + ADB-15
	Alecto_2_0 = new Signal('alecto_2_0');

	Alecto_2_0.register(function( err, success ){
	    if(err != null)	console.log('Alecto_2_0: Error:', err, 'success:', success);
	    else signalRegisterDoneFlags[1] = 1;
	});
	
	//Start receiving
	Alecto_2_0.on('payload', function(payload, first){
		payload = bitArrayToString(payload);
		clearTimeout(released);
		released = setTimeout(function(){
			var devices = getDevicesByAddress(payload);
	        devices.forEach(function(device){
				self.realtime(device, 'onoff', false);
			});
		},500);
		if(debouncer.check(payload)) return;
        var devices = getDevicesByAddress(payload);
        devices.forEach(function(device){
        	console.log('update', device.driver);
			self.realtime(device, 'onoff', true);
		});
	});
}

function initAlecto_2_1(self){ //ADB-17 + ADB-15
	Alecto_2_1 = new Signal('alecto_2_1');

	Alecto_2_1.register(function( err, success ){
	    if(err != null) console.log('Alecto_2_1: Error:', err, 'success:', success);
	    else signalRegisterDoneFlags[2] = 1;
	});
	
	//Start receiving
	Alecto_2_1.on('payload', function(payload, first){
		payload = bitArrayToString(payload);
		clearTimeout(released);
		released = setTimeout(function(){
			var devices = getDevicesByAddress(payload);
	        devices.forEach(function(device){
				self.realtime(device, 'onoff', false);
			});
		}, 500);
		if(debouncer.check(payload)) return;
        var devices = getDevicesByAddress(payload);
        devices.forEach(function(device){
        	console.log('update', device.driver);
			self.realtime(device, 'onoff', true);
		});
	});
}




function initAlecto_3(self){ // ADB-12
	Alecto_3 = new Signal('alecto_3');

	Alecto_3.register(function( err, success ){
	    if(err != null) console.log('Alecto_3: Error:', err, 'success:', success);
	    else signalRegisterDoneFlags[3] = 1;
	});
	
	//Start receiving
	Alecto_3.on('payload', function(payload, first){
		payload = bitArrayToString(payload);
		clearTimeout(released);
		released = setTimeout(function(){
			var devices = getDevicesByAddress(payload);
	        devices.forEach(function(device){
				self.realtime(device, 'onoff', false);
			});
		},500);
		if(debouncer.check(payload)) return;
       var devices = getDevicesByAddress(payload);
        devices.forEach(function(device){
        	console.log('update', device.driver);
			self.realtime(device, 'onoff', true);
		});
	});
}

function initAlecto_4(self){ //ADB-16
	Alecto_4 = new Signal('alecto_4');

	Alecto_4.register(function( err, success ){
	    if(err != null) console.log('Alecto_4: Error:', err, 'success:', success);
	    else signalRegisterDoneFlags[4] = 1;
	});
	
	//Start receiving
	Alecto_4.on('payload', function(payload, first){
		payload = bitArrayToString(payload);
		clearTimeout(released);
		released = setTimeout(function(){
			var devices = getDevicesByAddress(payload);
	        devices.forEach(function(device){
				self.realtime(device, 'onoff', false);
			});
		},500);
		if(debouncer.check(payload)) return;
        var devices = getDevicesByAddress(payload);
        devices.forEach(function(device){
        	console.log('update', device.driver);
			self.realtime(device, 'onoff', true);
		});
	});
}

function flowInit(self){
	//Actions
	Homey.manager('flow').on('action.triggerDoorbell', function( callback, args ){
		var device = getDeviceByID(args.device.id);
		var frame = new Buffer(bitStringToBitArray(device.address));
		console.log('sending', device.signal);
		switch(device.signal){
			case 'Alecto_1':
				Alecto_1.tx( frame, function( err, result ){
					if(err != null) callback(err, false);
					else{
						self.realtime(device, 'onoff', true);
						callback(null, true);
					}
			    });
			break;
			case 'Alecto_2_0':
				Alecto_2_0.tx( frame, function( err, result ){
					if(err != null) callback(err, false);
					else{
						self.realtime(device, 'onoff', true);
						callback(null, true);
					}
			    });
			break;
			case 'Alecto_2_1':
				Alecto_2_1.tx( frame, function( err, result ){
					if(err != null) callback(err, false);
					else{
						self.realtime(device, 'onoff', true);
						callback(null, true);
					}
			    });
			break;
			case 'Alecto_3':
				Alecto_3.tx( frame, function( err, result ){
					if(err != null) callback(err, false);
					else{
						self.realtime(device, 'onoff', true);
						callback(null, true);
					}
			    });
			break;
			case 'Alecto_4':
				Alecto_4.tx( frame, function( err, result ){
					if(err != null) callback(err, false);
					else{
						self.realtime(device, 'onoff', true);
						callback(null, true);
					}
			    });
			break;
			default:
				callback(false);
				return;
			break;
		}
		return(true);
	});
}

