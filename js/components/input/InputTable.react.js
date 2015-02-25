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
		this.unsubscribe = TasksStore.listen(function(){
			self.setState( { tasks: TasksStore.getTasks() } );
		});
	},

	componentDidUnmount: function(){
		this.unsubscribe();
	},

	getInputTasks: function () {
		var inputTasks = [];

		this.state.tasks.map(function(task){
			inputTasks.push( <InputRow key={task.id} data={task} /> );
		});

		return inputTasks;
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


