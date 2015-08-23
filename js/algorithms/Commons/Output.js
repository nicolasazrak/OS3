'use strict';

/* TODO use inmutable.js */

module.exports = {

	/**
	* Dados los tasks iniciales genera un array del estilo de output
	* @param array tasks iniciales
	* @return array
	*/
	createInitialQueue: function(tasks){
		var initialOutput = [];
		tasks.forEach( klt => {
			klt.ULTs.forEach( ult => {
				initialOutput.push({
					klt_id: klt.id,
					ult_id: ult.id,
					description: ult.description,
					result: []
				});
			});
		});
		return initialOutput;
	},


	/**
	* Le agrega el uso de un dispositivo a la cola a un ult recibe params con los valores
	* @param array el array del estilo creado por createInitialQueue
	* @param klt_id el klt a matchear
	* @param ult_id el ult a matchear
	* @param from tiempo desde el que thread usa el dispositivo
	* @param duration la cantidad de tiempo que el thread usa el dispositivo
	* @param string el dispositivo a usar, ej: cpu, io, ...
	*/
	addUsageToOutput: function(usage){
		usage.output.forEach(function(ult){
			if(ult.ult_id === usage.ult_id && ult.klt_id === usage.klt_id){
				for(var i = 0; i < usage.quantum; i++){
					ult.result[usage.from + i] = usage.device;
				}
			}
		});
	},

	/**
	* Completa los tiempos vacios
	*/
	completeEmptys: function(outputArray){
		var length = outputArray.reduce(function(a, ult){
			return Math.max(a, ult.result.length);
		}, 0);
		outputArray.forEach(function(ult){
			for(var i = 0; i < length; i++){
				if(ult.result[i] === undefined){
					ult.result[i] = null;
				}
			}
		});
		return outputArray;
	}

};
