var React 			= require('react');
var Actions			= require('../../actions/Actions');

var InputButtons = React.createClass({

	onNewKLT: function () {
		Actions.addKLT();
	},

	onGenerate: function (event) {
		var algorithm = this.refs.algorithm.getDOMNode().value;
		Actions.confirmKLTs(algorithm);
	},

	render: function(){
		return (

			<div className="row">

				<div className="large-4 columns">
					<a onClick={this.onNewKLT} className="button postfix">Agregar KLT</a>
				</div>

				<div className="large-4 columns">
						<select ref="algorithm" id="">
							<option value="Fifo">Fifo</option>
							<option value="RoundRobin">Round robin</option>
						</select>
				</div>

				<div className="large-4 columns">
					<a onClick={this.onGenerate} className="button postfix">Generar</a>
				</div>

			</div>

		);
	}


});



module.exports = InputButtons;
