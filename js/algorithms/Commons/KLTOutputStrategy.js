'use strict';


module.exports = {

	/**
	* Dados los tasks iniciales genera un array del estilo de output
	* @param {Array} tasks iniciales
	* @return {Array}
	*/
	createInitialQueue: function(tasks){
		return [];
	},


	/**
	* @param {Object}
	*/
	addUsageToOutput: function(output, id, from, quantum, device){
		output.push({
			id: 		id,
			start: 		from,
			quantum: 	quantum,
			device: 	device
		});
	},

	/**
	* Completa los tiempos vacios
	* @param {Array}
	*/
	completeEmptys: function(outputArray){
		return outputArray;
	}

};
