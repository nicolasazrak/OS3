'use strict';

var Output = require('./Commons/Output');

class Fake {

	schedule(queue){

		var output = Output.createInitialQueue(queue);

		for(var i = 0; i < 10; i++){
			Output.addUsageToOutput({
				output: output,
				ult_id: 1,
				klt_id: Math.random() > 0.5 ? 1 : 2,
				from: i,
				quantum: 1,
				device: Math.random() > 0.5 ? 'cpu' : 'io'
			});
		}

		output = Output.completeEmptys(output);
		return output;

	}
	
}




module.exports = Fake;
