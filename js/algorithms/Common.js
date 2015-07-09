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
		tasks.forEach(function(klt){
			klt.ULTs.forEach(function(ult){
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
	* Le agrega el uso de un dispositivo a la cola a un ult
	* @param array el array del estilo creado por createInitialQueue
	* @param klt_id el klt a matchear
	* @param ult_id el ult a matchear
	* @param time tiempo en el que thread usa el dispositivo
	* @param string el dispositivo a usar, ej: cpu, io, ...
	*/
	addToOutput: function(outputArray, klt_id, ult_id, time, device){
		outputArray.forEach(function(ult){
			if(ult.ult_id === ult_id && ult.klt_id === klt_id){
				ult.result[time] = device;
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
					ult.result[i] = '';
				}
			}
		});
		return outputArray;
	},




	/**
	* Devuelve cual es el proximo recurso que necesita un proceso
	*
	*/
	getNextDeviceForProces: function(tasks, klt_id, ult_id){

	},

	giveQuantumTo: function(task, klt_id, ult_id){

	},



	/**
	*
	* @param qeue
	* @param tasks
	* @param time
	*/
	addTasksToQueue: function(queue, tasks, time){
		tasks.forEach(function (task) {
			if(task.start === time){
				queue.push(task);
			}
		});
	}
};
