var React = require('react');
var ResultRow = require('./ResultRow.react');
var ResultHead = require('./ResultHead.react');


var ResultTable = React.createClass({

	render: function(){
		return (
			<div className="row">
				<table className="table-results">
					<thead>
						<ResultHead />
					</thead>
					<tbody>
						<ResultRow />
					</tbody>
				</table>
			</div>
		);
	}

});



module.exports = ResultTable;


