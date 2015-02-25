var React = require('react');

var ResultTable = require('./results/ResultTable.react');
var InputTable = require('./input/InputTable.react');


var App = React.createClass({

	render: function(){
		return (
			<div className="row">
				<div className="row">
					<h1>Simulador de planificador</h1>
				</div>

				<InputTable />
				
				<div className="row"><hr /></div>
				
				<div className="row"><h2>Resultados</h2></div>
				
				<ResultTable />
			</div>
		);
	}

});



module.exports = App;


