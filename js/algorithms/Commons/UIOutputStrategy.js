'use strict';

/* TODO use inmutable.js */

module.exports = {

	/**
	* Dados los tasks iniciales genera un array del estilo de output
	* @param {Array} tasks iniciales
	* @return {Array}
	*/
	createInitialQueue: function(tasks){
		var initialOutput = [];
		var ids = [];
		tasks.forEach( klt => {
			klt.getSubTasks().forEach( ult => {

				if(ids.indexOf(ult.id) !== -1){
					console.error(tasks);
					throw new Error('Error creating output, repeated id: ' + ult.id);
				}

				ids.push(ult.id);

				initialOutput.push({
					id: ult.id,
					description: ult.description,
					result: []
				});

			});
		});
		return initialOutput;
	},


	/**
	* Le agrega el uso de un dispositivo a la cola a un thread recibe params con los valores
	* @param {Array} el array del estilo creado por createInitialQueue
	* @param {number} id del thread que ejecuta
	* @param {number} from tiempo desde que el thread usa el dispositivo
	* @param {number} quantum la cantidad de tiempo que el thread usa el dispositivo
	* @param {string} el dispositivo a usar, ej: cpu, io, ...
	*/
	addUsageToOutput: function(output, id, from, quantum, device){
		output.forEach(function(thread){
			if(thread.id === id){
				for(var i = 0; i < quantum; i++){
					thread.result[from + i] = device;
				}
			}
		});
	},

	/**
	* Completa los tiempos vacios
	* @param {Array}
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
