var React = require('react');

var InputButtons = React.createClass({


	render: function(){
		return (
			<div className="row">
				<div className="large-4 columns">
					<button className="button postfix">Agregar Programa</button>
				</div>
				
				<div className="large-4 columns">
						<select name="algoritmo" id="">
							<option value="fifo">Fifo</option>
							<option value="round_robin">Round robin</option>
						</select>
				</div>
					
				<div className="large-4 columns">
					<button className="button postfix">Generar</button>
				</div>

			</div>
		);
	}


});



module.exports = InputButtons;
