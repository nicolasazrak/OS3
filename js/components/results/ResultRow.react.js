var React = require('react');

var ResultRow = React.createClass({

	getColums: function () {
		var colums = [];
		this.props.data.result.map(function(result){
			colums.push( <td className={result}></td> );
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


