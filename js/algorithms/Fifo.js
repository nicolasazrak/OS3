'use strict';

var Common = require('./Common');

var newQueue = [], readyQueue = [], waitQueue = [], exitQueue = [], results = {}, time = 0;

/*

RETURNS:

	[
		{
			klt_id: 1,
			ult_id: 2,
			description: 'Programa 1',
			result: [null, 'ul1', 'ult1', 'ult1', 'io', 'io', null, 'ult1', null, null]
		},
		{
			klt_id: 2,
			ult_id: 2,
			description: 'Programa 2',
			result: ['ult1', 'io',  'io',  'io', null, 'ult1', 'io', null, 'io', 'ult1']
		}
	]

*/

module.exports = {

	schedule: function(queue){
		var output = Common.createInitialQueue(queue);

		return output;
	}

};
