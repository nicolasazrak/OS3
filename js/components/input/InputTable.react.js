var React 			= require('react');

var InputHead 		= require('./InputHead.react');
var InputRow 		= require('./InputRow.react');
var InputButtons 	= require('./InputButtons.react');


var InputTable = React.createClass({


	render: function(){
		return (
			<div className="row">
				<form>
					<fieldset>
						<legend>Alrogitmo</legend>
						<table>
							<thead>
								<InputHead />
							</thead>
							<tbody>
								<InputRow />
								<InputRow />
								<InputRow />
							</tbody>
						</table>
						<br />
						<InputButtons />
					</fieldset>
				</form>
			</div>
		);
	}


});



module.exports = InputTable;


