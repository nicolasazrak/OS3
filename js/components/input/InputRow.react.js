var React = require('react');

var InputRow = React.createClass({

	render: function(){
		return (
			<tr>		
				<td><input type="text" placeholder="Programa" value={this.props.data.description} /></td>
				<td><input type="number" placeholder="Llegada" value={this.props.data.start}  /></td>
				<td><input type="number" placeholder="CPU" value={this.props.data.bursts[0].quantum} /></td>
				<td><input type="number" placeholder="I/O" value={this.props.data.bursts[1].quantum} /></td>
				<td><input type="number" placeholder="CPU" value={this.props.data.bursts[2].quantum} /></td>
				<td><input type="number" placeholder="I/O" value={this.props.data.bursts[3].quantum} /></td>
				<td><a href="#">Eliminar</a></td>
			</tr>
		);
	}


});



module.exports = InputRow;
