var Reflux 		= require('reflux');
var Actions		= require('../actions/Actions');
var TestData 	= require('../utils/TestData');

var __klts = TestData.tasksWithoutUlts;

var idCounter = 1;
var __useUlts = false;

var TasksStore = Reflux.createStore({

	init: function(){
		//Listen to actions
		Actions.addKLT		.listen(this.addKLT);
		Actions.updateULT	.listen(this.updateULT);
		Actions.addULT		.listen(this.addULT);
		Actions.deleteULT	.listen(this.deleteULT);
	},

	addKLT: function(){
		var newKLT = {
			id: idCounter++,
			ULTs: []
		};
		this.addULT(newKLT);
		__klts.push(newKLT);
		this.trigger();
	},

	addULT: function(klt){
		var id = idCounter++;

		var newULT = {
			id: id,
			description: 'KLT '+klt.id+'/ ULT ' + id,
			start: 0,
			bursts: [
				{ device: 'cpu', quantum: Math.floor(Math.random() * 5 + 1) },
				{ device: 'io',  quantum: Math.floor(Math.random() * 5 + 1) },
				{ device: 'cpu', quantum: Math.floor(Math.random() * 5 + 1) },
				{ device: 'io',  quantum: Math.floor(Math.random() * 5 + 1) }
			]
		};

		klt.ULTs.push(newULT);
		this.trigger();
	},

	deleteULT: function(klt, ult){
		klt.ULTs.splice(klt.ULTs.indexOf(ult), 1);
		if(klt.ULTs.length === 0){
			this.deleteKLT(klt);
		}
		this.trigger();
	},

	deleteKLT: function(klt){
		__klts.splice(__klts.indexOf(klt), 1);
	},

	setTasks: function(klts){
		__klts = klts;
		this.trigger();
	},

	updateULT: function(klt, newULT){
		var pos = klt.ULTs.indexOf(newULT);
		klt.ULTs[pos] = newULT;
		this.trigger();
	},

	getKLTs: function(){
		return __klts;
	},

	useUlts: function(){
		return __useUlts;
	},

	toggleUseUlts: function(){
		__useUlts = !__useUlts;
		this.trigger();
	}


});



module.exports = TasksStore;
