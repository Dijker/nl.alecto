'use strict';
/* eslint-disable */
const config = {
	class: 'sensor',
	pair: {
		viewOrder: ['generic_imitate', 'generic_test_remote', 'generic_done'],
		views: [{
				template: '../lib/pair/imitate.html',
				options: {
					svg: '../../433_generator/assets/sa-33/pair.svg',
					title: 'deviceClasses.smoke_sensor.views.generic_imitate.title',
					body: 'deviceClasses.smoke_sensor.views.generic_imitate.body',
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
				template: '../lib/pair/test_remote.html',
				options: {
					svg: '../../433_generator/assets/sa-33/alarm.svg',
					title: 'deviceClasses.smoke_sensor.views.generic_test_remote.title',
					body: 'deviceClasses.smoke_sensor.views.generic_test_remote.body',
					initWithDeviceData: false,
					prepend: [],
					append: [],
					svgWidth: '80vw',
					svgHeight: '70vh',
					previous: true,
					next: true
				},
				prepend: ['../../assets/433_generator/css/styles.css',
					'../../assets/433_generator/css/svg.css',
					'../../assets/433_generator/js/svghighlighter.js'
				],
				append: [],
				id: 'generic_test_remote'
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
	images: {
		small: '../../433_generator/assets/sa-33/images/small.jpg',
		large: '../../433_generator/assets/sa-33/images/large.jpg'
	},
	id: 'sa-33',
	signal: 'alecto_smoke_sensor',
	driver: '../../433_generator/drivers/smokedetector/SA-33.js',
	capabilities: ['alarm_smoke'],
	name: 'devices.sa-33.name',
	icon: '../../433_generator/assets/sa-33/icon.svg'
};
const Driver = require(config.driver);
const driver = new Driver(config);
module.exports = Object.assign(
  {},
	driver.getExports(), 
	{ init: (devices, callback) => driver.init(module.exports, devices, callback) }
);
