var React 			= require('react');

var InputHead 		= require('./InputHead.react');
var InputRow 		= require('./InputRow.react');
var InputButtons 	= require('./InputButtons.react');

var TasksStore 		= require('../../stores/TasksStore');


var InputTable = React.createClass({

	getInitialState: function(){
		return { tasks: TasksStore.getTasks() };
	},

	componentDidMount: function(){
		var self = this;
		this.unsubscribe = TasksStore.listen( () => {
			self.setState( { tasks: TasksStore.getTasks() } );
		});
	},

	componentDidUnmount: function(){
		this.unsubscribe();
	},

	getInputTasks: function () {
		return this.state.tasks.map( task => { return  <InputRow key={task.id} data={task} /> ; } );
	},

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
								{this.getInputTasks()}
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


