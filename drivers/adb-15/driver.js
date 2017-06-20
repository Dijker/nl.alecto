'use strict';
/* eslint-disable */
const config = {
	signal: 'alecto4',
	signalLength: 17,
	images: {
		small: '../../433_generator/assets/adb-15/images/small.jpg',
		large: '../../433_generator/assets/adb-15/images/large.jpg'
	},
	pair: {
		viewOrder: ['generic_imitate', 'generic_test_button_2', 'generic_done'],
		views: [{
				template: '../lib/pair/imitate.html',
				options: {
					title: 'deviceClasses.doorbell.views.generic_imitate.title',
					body: 'deviceClasses.doorbell.views.generic_imitate.body',
					svg: '../../433_generator/assets/adb-15/sender.svg',
					prepend: [],
					append: [],
					svgWidth: '80vw',
					svgHeight: '70vh',
					initWithDeviceData: false,
					previous: true,
					next: false
				},
				prepend: ['../../assets/433_generator/css/styles.css',
					'../../assets/433_generator/css/svg.css',
					'../../assets/433_generator/js/svghighlighter.js'
				],
				append: [],
				id: 'generic_imitate'
			},
			{
				template: '../lib/pair/test_button.html',
				options: {
					next: 'generic_done',
					initWithDeviceData: true,
					sendToggleOnInit: false,
					prepend: [],
					append: [],
					title: 'deviceClasses.doorbell.views.generic_test_button.title',
					body: 'deviceClasses.doorbell.views.generic_test_button_2.body',
					svg: '../../assets/433_generator/images/bell.svg',
					svgWidth: '80vw',
					svgHeight: '70vh',
					previous: true,
					buttonLabel: 'test'
				},
				prepend: ['../../assets/433_generator/css/styles.css',
					'../../assets/433_generator/css/svg.css',
					'../../assets/433_generator/js/svghighlighter.js',
					'../../assets/433_generator/css/styles.css',
					'../../assets/433_generator/css/svg.css',
					'../../assets/433_generator/js/svghighlighter.js',
					'../../assets/433_generator/css/styles.css',
					'../../assets/433_generator/css/svg.css',
					'../../assets/433_generator/js/svghighlighter.js'
				],
				append: [],
				id: 'generic_test_button_2'
			},
			{
				template: '../lib/pair/done.html',
				options: {
					title: 'views.generic_done.title',
					prepend: '',
					append: ''
				},
				prepend: [],
				append: [],
				id: 'generic_done'
			}
		]
	},
	id: 'adb-15',
	capabilities: ['alarm_generic'],
	driver: '../../433_generator/drivers/doorbells/ADB-15.js',
	class: 'doorbell',
	icon: '../../433_generator/assets/adb-15/receiver.svg',
	triggers: [{
		id: 'adb-15:received',
		title: 'deviceClasses.doorbell.triggers.received.title',
		args: [{
			name: 'device',
			type: 'device',
			filter: 'driver_id=adb-15'
		}]
	}],
	actions: [{
		id: 'adb-15:send',
		title: 'deviceClasses.doorbell.triggers.send.title',
		args: [{
			name: 'device',
			type: 'device',
			filter: 'driver_id=adb-15'
		}]
	}],
	name: 'devices.adb-15.name',
	debounceTimeout: 1000
};
const Driver = require(config.driver);
const driver = new Driver(config);
module.exports = Object.assign(
  {},
	driver.getExports(), 
	{ init: (devices, callback) => driver.init(module.exports, devices, callback) }
);
