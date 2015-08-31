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
	addUsageToOutput: function(usage){
		usage.output.push({
			id: 		usage.id,
			start: 		usage.from,
			quantum: 	usage.quantum,
			device: 	usage.device
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
