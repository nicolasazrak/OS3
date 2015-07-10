var React = require('react');

var ResultRow = React.createClass({

	getColums: function () {
		var colums = [];
		this.props.data.result.map(function(result, index){
			colums.push( <td key={index} className={result}></td> );
		});
		return colums;
	},

	render: function(){
		return (
			<tr>
				<td>{this.props.data.description}</td>
				{this.getColums()}
			</tr>
		);
	}


});



module.exports = ResultRow;
