'use strict';
var Output = require('./Commons/Output');
var Fifo = require('./Fifo');

module.exports = class RoundRobbin extends Fifo {

	getQuantumFor(resource, KLT){
		return (resource.left > 3) ? 3 : resource.left;
	}

};
