var React = require('react');

var ResultRow = React.createClass({


	render: function(){
		return (
			<tr>
				<td>Programa 1</td>
				<td className="cpu"></td>
				<td className="cpu"></td>
				<td className="cpu"></td>
				<td className="io"></td>
				<td className="io"></td>
				<td></td>
				<td></td>
				<td></td>
				<td className="cpu"></td>
				<td></td>
			</tr>
		);
	}


});



module.exports = ResultRow;


