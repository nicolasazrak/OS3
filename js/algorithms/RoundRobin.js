'use strict';
var Output = require('./Commons/Output');
var Fifo = require('./Fifo');

module.exports = class RoundRobbin extends Fifo {

	getQuantumFor(resource, KLT){
		console.log(resource);
		if(resource.device == 'cpu')
			return Math.min(resource.left, 2);

		return resource.left;
	}

};
