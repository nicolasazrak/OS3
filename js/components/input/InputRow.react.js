var React = require('react');

var InputRow = React.createClass({

	render: function(){
		return (
			<tr>		
				<td><input type="text" placeholder="Programa 1" /></td>
				<td><input type="number" placeholder="Llegada" /></td>
				<td><input type="number" placeholder="CPU" /></td>
				<td><input type="number" placeholder="I/O" /></td>
				<td><input type="number" placeholder="CPU" /></td>
				<td><input type="number" placeholder="I/O" /></td>
			</tr>
		);
	}


});



module.exports = InputRow;
