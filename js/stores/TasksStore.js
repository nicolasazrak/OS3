var Reflux 		= require('reflux');
var Actions		= require('../actions/Actions');


var __klts = [

	{ id: 1, ultCounter: 2, ULTs: [
		{ id: 1, description: 'KLT 1/ULT 1', start: 2, bursts: [ { device: 'cpu', quantum: 1 }, { device: 'io', quantum: 5 }, { device: 'cpu', quantum: 5}, { device: 'io', quantum: 8 } ]},
		{ id: 2, description: 'KLT 1/ULT 2', start: 2, bursts: [ { device: 'cpu', quantum: 1 }, { device: 'io', quantum: 1 }, { device: 'cpu', quantum: 2}, { device: 'io', quantum: 8 } ]}
	] },


	{ id: 2, ultCounter: 3, ULTs: [
		{ id: 1, description: 'KLT 2/ULT 1', start: 2, bursts: [ { device: 'cpu', quantum: 1 }, { device: 'io', quantum: 9 }, { device: 'cpu', quantum: 6}, { device: 'io', quantum: 8 } ]},
		{ id: 2, description: 'KLT 2/ULT 2', start: 1, bursts: [ { device: 'cpu', quantum: 4 }, { device: 'io', quantum: 5 }, { device: 'cpu', quantum: 2}, { device: 'io', quantum: 8 } ]},
		{ id: 3, description: 'KLT 2/ULT 3', start: 4, bursts: [ { device: 'cpu', quantum: 2 }, { device: 'io', quantum: 3 }, { device: 'cpu', quantum: 2}, { device: 'io', quantum: 8 } ]}
	] },


];



var TasksStore = Reflux.createStore({

	init: function(){
		//Listen to changes
		Actions.addKLT.listen(this.addKLT);
		Actions.updateKLT.listen(this.updateKLT);

		Actions.addULT.listen(this.addULT);
		Actions.deleteULT.listen(this.deleteULT);
	},

	addKLT: function(){
		var id = __klts.length + 1;
		var newKLT = { id: id, ultCounter: 0, ULTs: [] };
		__klts.push(newKLT);
		this.trigger();
	},

	addULT: function(klt){
		klt.ultCounter++;
		var newULT = { id: klt.ultCounter, description: 'KLT '+klt.id+'/ ULT ' + klt.ultCounter, start: 0, bursts: [ { device: 'cpu', quantum: 0 }, { device: 'io', quantum: 0 }, { device: 'cpu', quantum: 0}, { device: 'io', quantum: 0 } ]}
		klt.ULTs.push(newULT);
		console.log(klt);
		this.trigger();
	},

	deleteULT: function(klt, ult){

		this.trigger();
	},

	setTasks: function(klts){
		__klts = klts;
		this.trigger();
	},

	updateULT: function(klt, newULT){
		this.trigger();
	},

	getKLTs: function(){
		return __klts;
	}


});



module.exports = TasksStore;
