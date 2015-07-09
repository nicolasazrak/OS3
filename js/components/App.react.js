var React = require('react');

var ResultTable = require('./results/ResultTable.react');
var InputTable = require('./input/InputTable.react');
var ResultsStore = require('../stores/ResultsStore');


var App = React.createClass({

	componentDidMount: function(){
		var self = this;
		this.unsubscribe = ResultsStore.listen( () => {
			self.forceUpdate();
		});
	},

	componentDidUnMount: function(){
		this.unsubscribe();
	},

	render: function(){

		var results;

		if(ResultsStore.getResults() !== null){
			results = (<div className="row"><ResultTable /></div>);
		}

		return (
			<div className="ui center aligned grid">

				<div className="ui hidden divider"></div>

				<div className="row">
					<h1 className="ui header">Simulador de planificador</h1>
				</div>

				<InputTable />

				{results}

			</div>

		);
	}

});



module.exports = App;
