'use strict';
/* eslint-disable */
const config = {
	signal: 'alecto2',
	signalLength: 24,
	images: {
		small: '../../433_generator/assets/adb-12/images/small.jpg',
		large: '../../433_generator/assets/adb-12/images/large.jpg'
	},
	pair: {
		viewOrder: ['generic_choice',
			'generic_imitate',
			'generic_test_button_2',
			'generic_info',
			'generic_dipswitch',
			'generic_test_button',
			'generic_done'
		],
		views: [{
			template: '../lib/pair/choice.html',
			options: {
				title: 'deviceClasses.doorbell.views.jumpers_choice.title',
				body: 'deviceClasses.doorbell.views.jumpers_choice.body',
				buttons: [{
					name: 'deviceClasses.doorbell.views.jumpers_choice.buttons.generic_imitate',
					view: 'generic_imitate',
					svg: '../../433_generator/assets/adb-12/sender.svg'
				}, {
					name: 'deviceClasses.doorbell.views.jumpers_choice.buttons.generic_dipswitch',
					view: 'generic_info',
					svg: '../../433_generator/assets/adb-12/pair.svg'
				}],
				prepend: [],
				append: [],
				svgWidth: '80vw',
				svgHeight: '65vh'
			},
			prepend: ['../../assets/433_generator/css/styles.css',
				'../../assets/433_generator/css/svg.css',
				'../../assets/433_generator/js/svghighlighter.js'
			],
			append: [],
			id: 'generic_choice'
		}, {
			template: '../lib/pair/imitate.html',
			options: {
				title: 'deviceClasses.doorbell.views.generic_imitate.title',
				body: 'deviceClasses.doorbell.views.generic_imitate.body',
				svg: '../../433_generator/assets/adb-12/sender.svg',
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
		}, {
			template: '../lib/pair/test_button.html',
			options: {
				title: 'deviceClasses.doorbell.views.generic_test_button.title',
				body: 'deviceClasses.doorbell.views.generic_test_button_2.body',
				svg: '../../assets/433_generator/images/bell.svg',
				prepend: [],
				append: [],
				next: 'generic_done',
				initWithDeviceData: true,
				sendToggleOnInit: false,
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
		}, {
			template: '../lib/pair/info.html',
			options: {
				title: 'deviceClasses.doorbell.views.jumpers_info.title',
				body: 'deviceClasses.doorbell.views.jumpers_info.body',
				previous: 'generic_choice',
				prepend: [],
				append: [],
				svg: '../../433_generator/assets/adb-12/pair.svg',
				svgWidth: '80vw',
				svgHeight: '70vh',
				next: true
			},
			prepend: ['../../assets/433_generator/css/styles.css',
				'../../assets/433_generator/css/svg.css',
				'../../assets/433_generator/js/svghighlighter.js'
			],
			append: [],
			id: 'generic_info'
		}, {
			template: '../lib/pair/dipswitch.html',
			options: {
				dipswitchList: [1, 2, 3, 4, 5, 6],
				prepend: [],
				append: [],
				title: 'deviceClasses.doorbell.views.jumpers.title',
				body: 'deviceClasses.doorbell.views.jumpers.body',
				svgWidth: '80vw',
				svgHeight: '24vh',
				previous: true,
				next: true
			},
			prepend: ['../../assets/433_generator/css/styles.css',
				'../../assets/433_generator/css/dipswitch.css'
			],
			append: [],
			id: 'generic_dipswitch'
		}, {
			template: '../lib/pair/test_button.html',
			options: {
				title: 'deviceClasses.doorbell.views.generic_test_button.title',
				body: 'deviceClasses.doorbell.views.generic_test_button.body',
				svg: '../../assets/433_generator/images/bell.svg',
				prepend: [],
				append: [],
				svgWidth: '80vw',
				svgHeight: '70vh',
				initWithDeviceData: true,
				previous: true,
				next: true,
				sendToggleOnInit: false,
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
			id: 'generic_test_button'
		}, {
			template: '../lib/pair/done.html',
			options: {
				title: 'views.generic_done.title',
				prepend: '',
				append: ''
			},
			prepend: [],
			append: [],
			id: 'generic_done'
		}]
	},
	id: 'adb-12',
	capabilities: ['alarm_generic'],
	class: 'doorbell',
	driver: '../../433_generator/drivers/doorbells/ADB-12.js',
	icon: '../../433_generator/assets/adb-12/receiver.svg',
	triggers: [{
		id: 'adb-12:received',
		title: 'deviceClasses.doorbell.triggers.received.title',
		args: [{
			name: 'device',
			type: 'device',
			filter: 'driver_id=adb-12'
		}]
	}],
	actions: [{
		id: 'adb-12:send',
		title: 'deviceClasses.doorbell.triggers.send.title',
		args: [{
			name: 'device',
			type: 'device',
			filter: 'driver_id=adb-12'
		}]
	}],
	name: 'devices.adb-12.name',
	settings: [{
		type: 'group',
		label: 'deviceClasses.doorbell.settings.groups.general',
		children: [{
			id: 'sound',
			type: 'dropdown',
			value: '11000000',
			label: 'deviceClasses.doorbell.settings.sound',
			values: [{
				id: '11000000',
				label: 'deviceClasses.doorbell.settings.sounds.2'
			}, {
				id: '00001100',
				label: 'deviceClasses.doorbell.settings.sounds.3'
			}]
		}]
	}]
};
const Driver = require(config.driver);
const driver = new Driver(config);
module.exports = Object.assign(
  {},
	driver.getExports(), 
	{ init: (devices, callback) => driver.init(module.exports, devices, callback) }
);
