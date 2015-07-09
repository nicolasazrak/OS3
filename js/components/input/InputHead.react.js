var React = require('react');

var InputHead = React.createClass({


	render: function(){

		var addUltColumn = this.props.useUlts ? <th></th> : null;

		return (
			<tr className="tr-input-head">
				<th>Programa</th>
				<th>Llegada</th>
				<th>CPU</th>
				<th>I/O</th>
				<th>CPU</th>
				<th>I/O</th>
				<th></th>
				{addUltColumn}
			</tr>
		);
	}


});



module.exports = InputHead;
