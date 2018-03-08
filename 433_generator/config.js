'use strict';

module.exports = {
	deviceClasses: {
		alecto_1: {
			signal: {
				id: 'alecto1',
				sof: [340],
				words: [
					[1130, 340],
					[400, 1070],
				],
				interval: 5860,
				sensitivity: 0.3,
				repetitions: 20,
				minimalLength: 17,
				maximalLength: 17,
			},
			signalLength: 17,
		},
		alecto_2: {
			signal: {
				id: 'alecto2',
				eof: [225],
				words: [
					[225, 700],
					[700, 240],
				],
				interval: 7215,
				sensitivity: 0.3,
				repetitions: 20,
				minimalLength: 24,
				maximalLength: 24,
			},
			signalLength: 24,
		},
		alecto_3: {
			signal: {
				id: 'alecto3',
				eof: [170],
				words: [
					[170, 500],
					[500, 175],
				],
				interval: 5200,
				sensitivity: 0.3,
				repetitions: 20,
				minimalLength: 24,
				maximalLength: 24,
			},
			signalLength: 24,
		},
		alecto_4: {
			signal: {
				id: 'alecto4',
				agc: [1071],
				words: [
					[1112, 346],
					[388, 1067],
				],
				interval: 5860,
				sensitivity: 0.3,
				repetitions: 20,
				minimalLength: 17,
				maximalLength: 17,
			},
			signalLength: 17,
		},
		alecto_smoke_sensor: {
			signal: {
				id: 'alecto_smoke_sensor',
				sof: [3789, 3776],
				eof: [902, 4067, 991],
				words: [
					[1895, 974],
					[857, 2011],
				],
				interval: 3961,
				sensitivity: 0.5,
				repetitions: 10,
				minimalLength: 16,
				maximalLength: 16,
			},
		},
		smoke_sensor: {
			extends: ['generic_sensor', 'alecto_smoke_sensor'],
			driver: './drivers/smokedetector/SA-33.js',
			capabilities: ['alarm_smoke'],
			pair: {
				viewOptions: {
					generic_imitate: {
						svg: './assets/sa-33/pair.svg',
						title: 'deviceClasses.smoke_sensor.views.generic_imitate.title',
						body: 'deviceClasses.smoke_sensor.views.generic_imitate.body',
					},
					generic_test_remote: {
						svg: './assets/sa-33/alarm.svg',
						title: 'deviceClasses.smoke_sensor.views.generic_test_remote.title',
						body: 'deviceClasses.smoke_sensor.views.generic_test_remote.body',
						initWithDeviceData: false,
					},
				},
			},
		},
		doorbell: {
			driver: './drivers/doorbell.js',
			class: 'doorbell',
			capabilities: ['alarm_generic'],
			icon: './assets/doorbell/icon.svg',
			pair: {
				viewOptions: {
					generic_choice: {
						title: 'deviceClasses.doorbell.views.generic_choice.title',
						body: 'deviceClasses.doorbell.views.generic_choice.body',
						buttons: [
							{
								name: 'deviceClasses.doorbell.views.generic_choice.buttons.generic_imitate',
								view: 'generic_imitate',
								svg: './assets/doorbell/icon.svg',
							},
							{
								name: 'deviceClasses.generic_switch.views.generic_choice.buttons.generic_program',
								view: 'generic_program',
								svg: './assets/doorbell/pair.svg',
							},
						],
					},
					generic_program: {
						body: 'deviceClasses.doorbell.views.generic_program.body',
						svg: './assets/doorbell/pair.svg',
					},
					generic_imitate: {
						title: 'deviceClasses.doorbell.views.generic_imitate.title',
						body: 'deviceClasses.doorbell.views.generic_imitate.body',
						svg: './assets/doorbell/icon.svg',
					},
					generic_test_button: {
						title: 'deviceClasses.doorbell.views.generic_test_button.title',
						body: 'deviceClasses.doorbell.views.generic_test_button.body',
						svg: '../assets/433_generator/images/bell.svg',
					},
					generic_test_button_2: {
						title: 'deviceClasses.doorbell.views.generic_test_button.title',
						body: 'deviceClasses.doorbell.views.generic_test_button_2.body',
						svg: '../assets/433_generator/images/bell.svg',
					},
				},
			},
			triggers: [
				{
					id: 'received',
					title: 'deviceClasses.doorbell.triggers.received.title',
				},
			],
			actions: [
				{
					id: 'send',
					title: 'deviceClasses.doorbell.triggers.send.title',
				},
			],
		},
		pairing_doorbell: {
			extends: ['generic_toggle', 'doorbell'],
		},
		non_pairing_doorbell: {
			extends: ['generic_toggle', 'doorbell'],
			pair: {
				viewOrder: [
					'generic_imitate',
					'generic_test_button_2',
					'generic_done',
				],
			},
		},
		dipswitch_doorbell: {
			extends: ['generic_dipswitch_switch', 'doorbell'],
			pair: {
				viewOrder: [
					'generic_choice',
					'generic_imitate',
					'generic_test_button_2',
					'generic_info',
					'generic_dipswitch',
					'generic_test_button',
					'generic_done',
				],
				viewOptions: {
					generic_choice: {
						title: 'deviceClasses.dipswitch_doorbell.views.generic_choice.title',
						body: 'deviceClasses.dipswitch_doorbell.views.generic_choice.body',
						buttons: [
							{
								name: 'deviceClasses.doorbell.views.generic_choice.buttons.generic_imitate',
								view: 'generic_imitate',
								svg: './assets/doorbell/icon.svg',
							},
							{
								name: 'deviceClasses.doorbell.views.generic_choice.buttons.generic_dipswitch',
								view: 'generic_info',
								svg: './assets/doorbell/pair.svg',
							},
						],
					},
					generic_info: {
						title: 'deviceClasses.dipswitch_doorbell.views.generic_info.title',
						body: 'deviceClasses.dipswitch_doorbell.views.generic_info.body',
					},
					generic_dipswitch: {
						dipswitchList: [1, 2, 3, 4, 5, 6],
					},
					generic_test_button_2: {
						next: 'generic_done',
						initWithDeviceData: true,
						sendToggleOnInit: false,
					},
				},
			},
		},
	},
	devices: {
		'adb-12': {
			extends: ['alecto_2', 'dipswitch_doorbell'],
			name: 'devices.adb-12.name',
			driver: './drivers/doorbells/ADB-12.js',
			icon: './assets/adb-12/receiver.svg',
			images: {
				small: './assets/adb-12/images/small.jpg',
				large: './assets/adb-12/images/large.jpg',
			},
			pair: {
				viewOptions: {
					generic_choice: {
						title: 'deviceClasses.doorbell.views.jumpers_choice.title',
						body: 'deviceClasses.doorbell.views.jumpers_choice.body',
						buttons: [
							{
								name: 'deviceClasses.doorbell.views.jumpers_choice.buttons.generic_imitate',
								view: 'generic_imitate',
								svg: './assets/adb-12/sender.svg',
							},
							{
								name: 'deviceClasses.doorbell.views.jumpers_choice.buttons.generic_dipswitch',
								view: 'generic_info',
								svg: './assets/adb-12/pair.svg',
							},
						],
					},
					generic_info: {
						title: 'deviceClasses.doorbell.views.jumpers_info.title',
						body: 'deviceClasses.doorbell.views.jumpers_info.body',
						svg: './assets/adb-12/pair.svg',
					},
					generic_dipswitch: {
						title: 'deviceClasses.doorbell.views.jumpers.title',
						body: 'deviceClasses.doorbell.views.jumpers.body',
						dipswitchList: [1, 2, 3, 4, 5, 6],
					},
					generic_imitate: {
						svg: './assets/adb-12/sender.svg',
					},
				},
			},
			settings: [
				{
					type: 'group',
					label: 'deviceClasses.doorbell.settings.groups.general',
					children: [
						{
							id: 'sound',
							type: 'dropdown',
							value: '11000000',
							label: 'deviceClasses.doorbell.settings.sound',
							values: [
								{
									id: '11000000',
									label: 'deviceClasses.doorbell.settings.sounds.2',
								},
								{
									id: '00001100',
									label: 'deviceClasses.doorbell.settings.sounds.3',
								},
							],
						},
					],
				},
			],
		},
		'adb-15': {
			extends: ['alecto_4', 'non_pairing_doorbell'],
			name: 'devices.adb-15.name',
			icon: './assets/adb-15/receiver.svg',
			driver: './drivers/doorbells/ADB-15.js',
			images: {
				small: './assets/adb-15/images/small.jpg',
				large: './assets/adb-15/images/large.jpg',
			},
			debounceTimeout: 1000,
			pair: {
				viewOptions: {
					generic_imitate: {
						svg: './assets/adb-15/sender.svg',
					},
				},
			},
		},
		'adb-17': {
			extends: ['alecto_1', 'pairing_doorbell'],
			name: 'devices.adb-17.name',
			icon: './assets/adb-17/receiver.svg',
			driver: './drivers/doorbells/ADB-17.js',
			alternativeSignal: 'alecto4',
			images: {
				small: './assets/adb-17/images/small.jpg',
				large: './assets/adb-17/images/large.jpg',
			},
			debounceTimeout: 3000,
			pair: {
				viewOptions: {
					generic_choice: {
						buttons: [
							{
								name: 'deviceClasses.doorbell.views.generic_choice.buttons.generic_imitate',
								view: 'generic_imitate',
								svg: './assets/adb-17/sender.svg',
							},
							{
								name: 'deviceClasses.generic_switch.views.generic_choice.buttons.generic_program',
								view: 'generic_program',
								svg: './assets/adb-17/pair.svg',
							},
						],
					},
					generic_program: {
						body: 'deviceClasses.doorbell.views.generic_program.body',
						svg: './assets/adb-17/pair.svg',
					},
					generic_imitate: {
						svg: './assets/adb-17/sender.svg',
					},
				},
			},
		},
		'adb-18': {
			extends: ['alecto_2', 'dipswitch_doorbell'],
			driver: './drivers/doorbells/ADB-18.js',
			name: 'devices.adb-18.name',
			icon: './assets/adb-18/receiver.svg',
			images: {
				small: './assets/adb-18/images/small.jpg',
				large: './assets/adb-18/images/large.jpg',
			},
			pair: {
				viewOptions: {
					generic_choice: {
						buttons: [
							{
								name: 'deviceClasses.doorbell.views.generic_choice.buttons.generic_imitate',
								view: 'generic_imitate',
								svg: './assets/adb-18/sender.svg',
							},
							{
								name: 'deviceClasses.doorbell.views.generic_choice.buttons.generic_dipswitch',
								view: 'generic_info',
								svg: './assets/adb-18/pair.svg',
							},
						],
					},
					generic_info: {
						svg: './assets/adb-18/pair.svg',
					},
					generic_dipswitch: {
						dipswitchList: [1, 2, 3, 4],
					},
					generic_imitate: {
						svg: './assets/adb-12/sender.svg',
					},
				},
			},
			settings: [
				{
					type: 'group',
					label: 'deviceClasses.doorbell.settings.groups.general',
					children: [
						{
							id: 'sound',
							type: 'dropdown',
							value: '11000000',
							label: 'deviceClasses.doorbell.settings.sound',
							values: [
								{
									id: '00000011',
									label: 'deviceClasses.doorbell.settings.sounds.0',
								},
								{
									id: '00001100',
									label: 'deviceClasses.doorbell.settings.sounds.1',
								},
								{
									id: '00110000',
									label: 'deviceClasses.doorbell.settings.sounds.2',
								},
								{
									id: '11000000',
									label: 'deviceClasses.doorbell.settings.sounds.3',
								},
							],
						},
					],
				},
			],
		},
		'sa-33': {
			extends: ['smoke_sensor'],
			name: 'devices.sa-33.name',
			images: {
				small: './assets/sa-33/images/small.jpg',
				large: './assets/sa-33/images/large.jpg',
			},
			driver: './drivers/smokedetector/SA-33.js',
			icon: './assets/sa-33/icon.svg',
		},
	},
};
