var React 			= require('react');
var Actions			= require('../../actions/Actions');

var InputButtons = React.createClass({

	onNewTask: function () {
		Actions.addTask();
	},

	onGenerate: function () {
		Actions.confirmTasks();
	},

	render: function(){
		return (

			<div className="row">

				<div className="large-4 columns">
					<a onClick={this.onNewTask} className="button postfix">Agregar Programa</a>
				</div>
				
				<div className="large-4 columns">
						<select name="algoritmo" id="">
							<option value="fifo">Fifo</option>
							<option value="round_robin">Round robin</option>
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
