var AlgorithmsStore = require('../stores/AlgorithmsStore');

var algorithms = AlgorithmsStore.getAlgorithms();

var tasksWithUlts = [

	{
		id: 1,
		algorithm: algorithms[0],
		ULTs: [
			{
				id: 2,
				description: 'KLT 1/ULT 1',
				start: 2,
				bursts: [
					{ device: 'cpu', quantum: 2 },
					{ device: 'io',  quantum: 5 },
					{ device: 'cpu', quantum: 5 },
					{ device: 'io',  quantum: 8 }
				]
			},
			{
				id: 3,
				description: 'KLT 1/ULT 2',
				start: 2,
				bursts: [
					{ device: 'cpu', quantum: 1 },
					{ device: 'io',  quantum: 1 },
					{ device: 'cpu', quantum: 2 },
					{ device: 'io',  quantum: 8 }
				]
			}
		]
	},

	{
		id: 4,
		algorithm: algorithms[0],
		ULTs: [
			{
				id: 5,
				description: 'KLT 2/ULT 1',
				start: 6,
				bursts: [
					{ device: 'cpu', quantum: 1 },
					{ device: 'io',  quantum: 9 },
					{ device: 'cpu', quantum: 6 },
					{ device: 'io',  quantum: 8 }
				]
			},
			{
				id: 6,
				description: 'KLT 2/ULT 2',
				start: 4,
				bursts: [
					{ device: 'cpu', quantum: 4 },
					{ device: 'io',  quantum: 5 },
					{ device: 'cpu', quantum: 2 },
					{ device: 'io',  quantum: 8 }
				]
			},
			{
				id: 7,
				description: 'KLT 2/ULT 3',
				start: 5,
				bursts: [
					{ device: 'cpu', quantum: 2 },
					{ device: 'io',  quantum: 3 },
					{ device: 'cpu', quantum: 2 },
					{ device: 'io',  quantum: 8 }
				]
			}
		]
	},
];


var tasksWithoutUlts = [
	{
		id: 1,
		algorithm: algorithms[0],
		ULTs: [
			{
				id: 2,
				description: 'KLT 1/ULT 1',
				start: 1,
				bursts: [
					{ device: 'cpu', quantum: 3 },
					{ device: 'io',  quantum: 5 },
					{ device: 'cpu', quantum: 5 },
					{ device: 'io',  quantum: 2 }
				]
			}
		]
	},

	{
		id: 3,
		algorithm: algorithms[0],
		ULTs: [
			{
				id: 4,
				description: 'KLT 2/ULT 1',
				start: 2,
				bursts: [
					{ device: 'cpu', quantum: 1 },
					{ device: 'io',  quantum: 5 },
					{ device: 'cpu', quantum: 6 },
					{ device: 'io',  quantum: 4 }
				]
			}
		]
	},
];

module.exports = {
	tasksWithUlts: tasksWithUlts,
	tasksWithoutUlts: tasksWithoutUlts
};
