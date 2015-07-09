'use strict';

var Common = require('./Common');

function schedule(qeue){

	var output = Common.createInitialQeue(qeue);

	/* KLT 1 */
	Common.addToOutput(output, 1, 1, 0, 'io');
	Common.addToOutput(output, 1, 1, 1, 'io');
	Common.addToOutput(output, 1, 1, 5, 'cpu');
	Common.addToOutput(output, 1, 1, 6, 'cpu');
	Common.addToOutput(output, 1, 1, 10, 'io');

	Common.addToOutput(output, 1, 2, 0, 'io');
	Common.addToOutput(output, 1, 2, 1, 'cpu');
	Common.addToOutput(output, 1, 2, 2, 'io');
	Common.addToOutput(output, 1, 2, 3, 'cpu');

	/* KLT 2 */
	Common.addToOutput(output, 2, 1, 0, 'io');
	Common.addToOutput(output, 2, 2, 2, 'cpu');
	Common.addToOutput(output, 2, 3, 4, 'io');

	output = Common.completeEmptys(output);
	return output;

}


module.exports = {
	schedule: schedule
};
