var Reflux 		= require('reflux');
var Actions 	= require('../actions/Actions');

var TasksStore	= require('./TasksStore');

var KLT			= require('../algorithms/Commons/KLT');



var __results 	= null;

var ResultsStore = Reflux.createStore({

	init: function(){
		Actions.confirmKLTs.listen(this.generate);
	},

	generate: function(algorithm, options){
		var scheduler = new algorithm();
		var klts = TasksStore.getKLTs().map( klt => new KLT(klt) );
		options.verbose = true;
		__results = scheduler.schedule(klts, options);
		this.trigger();
	},

	getResults: function(){
		return __results;
	}

});


module.exports = ResultsStore;
