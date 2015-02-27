var React = require('react');

var ResultsStore 	= require('../../stores/ResultsStore');

var ResultHead = React.createClass({
	getColums: function () {
		var colums = [];
		for(var i = 1; i <= this.props.max_quantum_count; i++) colums.push(<th>{i}</th>);
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


