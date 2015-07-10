var React = require('react');

var ResultsStore 	= require('../../stores/ResultsStore');

var ResultHead = React.createClass({
	getColums: function () {
		var colums = [];
		for(var i = 0; i <= this.props.max_quantum_count - 1; i++) colums.push(<th key={i}>{i}</th>);
		return colums;
	},

	render: function(){
		return (
			<tr>
				<th>Programa</th>
				{this.getColums()}
			</tr>
		);
	}


});



module.exports = ResultHead;
