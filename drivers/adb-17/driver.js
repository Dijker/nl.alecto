'use strict';
/* eslint-disable */
const config = {
	signal: 'alecto1',
	signalLength: 17,
	images: {
		small: '../../433_generator/assets/adb-17/images/small.jpg',
		large: '../../433_generator/assets/adb-17/images/large.jpg'
	},
	pair: {
		viewOrder: ['generic_choice',
			'generic_imitate',
			'generic_test_button_2',
			'generic_program',
			'generic_test_button',
			'generic_done'
		],
		views: [{
				template: '../lib/pair/choice.html',
				options: {
					title: 'deviceClasses.doorbell.views.generic_choice.title',
					body: 'deviceClasses.doorbell.views.generic_choice.body',
					buttons: [{
							name: 'deviceClasses.doorbell.views.generic_choice.buttons.generic_imitate',
							view: 'generic_imitate',
							svg: '../../433_generator/assets/adb-17/sender.svg'
						},
						{
							name: 'deviceClasses.generic_switch.views.generic_choice.buttons.generic_program',
							view: 'generic_program',
							svg: '../../433_generator/assets/adb-17/pair.svg'
						}
					],
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
			},
			{
				template: '../lib/pair/imitate.html',
				options: {
					title: 'deviceClasses.doorbell.views.generic_imitate.title',
					body: 'deviceClasses.doorbell.views.generic_imitate.body',
					svg: '../../433_generator/assets/adb-17/sender.svg',
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
				template: '../lib/pair/program.html',
				options: {
					previous: 'generic_choice',
					prepend: [],
					append: [],
					body: 'deviceClasses.doorbell.views.generic_program.body',
					svg: '../../433_generator/assets/adb-17/pair.svg',
					title: 'views.generic_program.title',
					svgWidth: '80vw',
					svgHeight: '70vh',
					initWithDeviceData: false,
					next: true
				},
				prepend: ['../../assets/433_generator/css/styles.css',
					'../../assets/433_generator/css/svg.css',
					'../../assets/433_generator/js/svghighlighter.js',
					'../../assets/433_generator/css/styles.css',
					'../../assets/433_generator/css/svg.css',
					'../../assets/433_generator/js/svghighlighter.js'
				],
				append: [],
				id: 'generic_program'
			},
			{
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
	id: 'adb-17',
	capabilities: ['alarm_generic'],
	driver: '../../433_generator/drivers/doorbells/ADB-17.js',
	class: 'doorbell',
	icon: '../../433_generator/assets/adb-17/receiver.svg',
	triggers: [{
		id: 'adb-17:received',
		title: 'deviceClasses.doorbell.triggers.received.title',
		args: [{
			name: 'device',
			type: 'device',
			filter: 'driver_id=adb-17'
		}]
	}],
	actions: [{
		id: 'adb-17:send',
		title: 'deviceClasses.doorbell.triggers.send.title',
		args: [{
			name: 'device',
			type: 'device',
			filter: 'driver_id=adb-17'
		}]
	}],
	name: 'devices.adb-17.name',
	alternativeSignal: 'alecto4',
	debounceTimeout: 3000
};
const Driver = require(config.driver);
const driver = new Driver(config);
module.exports = Object.assign(
  {},
	driver.getExports(), 
	{ init: (devices, callback) => driver.init(module.exports, devices, callback) }
);
