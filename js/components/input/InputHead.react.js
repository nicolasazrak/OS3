var React = require('react');

var InputHead = React.createClass({


	render: function(){
		return (
			<tr>
				<th>Programa</th>
				<th>Llegada</th>
				<th>CPU</th>
				<th>I/O</th>
				<th>CPU</th>
				<th>I/O</th>
				<th></th>
			</tr>
		);
	}


});



module.exports = InputHead;


