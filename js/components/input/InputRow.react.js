var React = require('react');

var Actions = require('../../actions/Actions');

var InputRow = React.createClass({

	onChangeTitle: function(event){
		var task = this.props.data;
		task.description = event.target.value;
		Actions.updateTask(task);
	},

	onChangeArrive: function(event){
		var task = this.props.data;
		task.start = event.target.value;
		Actions.updateTask(task);
	},

	onChangeCpuQuantum1: function(event){
		var task = this.props.data;
		task.bursts[0].quantum = event.target.value;
		Actions.updateTask(task);
	},
	
	onChangeIOQuantum1: function(event){
		var task = this.props.data;
		task.bursts[1].quantum = event.target.value;
		Actions.updateTask(task);
	},
	
	onChangeCpuQuantum2: function(event){
		var task = this.props.data;
		task.bursts[2].quantum = event.target.value;
		Actions.updateTask(task);
	},
	
	onChangeIOQuantum2: function(event){
		var task = this.props.data;
		task.bursts[3].quantum = event.target.value;
		Actions.updateTask(task);
	},

	onDeleteTask: function(event){
		var task = this.props.data;
		Actions.deleteTask(task);
	},

	render: function(){
		return (
			<tr>		
				<td><input type="text" placeholder="Programa" value={this.props.data.description} onChange={this.onChangeTitle} /></td>
				<td><input type="number" placeholder="Llegada" value={this.props.data.start}  onChange={this.onChangeArrive} /></td>
				<td><input type="number" placeholder="CPU" value={this.props.data.bursts[0].quantum} onChange={this.onChangeCpuQuantum1} /></td>
				<td><input type="number" placeholder="I/O" value={this.props.data.bursts[1].quantum} onChange={this.onChangeIOQuantum1} /></td>
				<td><input type="number" placeholder="CPU" value={this.props.data.bursts[2].quantum} onChange={this.onChangeCpuQuantum2} /></td>
				<td><input type="number" placeholder="I/O" value={this.props.data.bursts[3].quantum} onChange={this.onChangeIOQuantum2} /></td>
				<td><a onClick={this.onDeleteTask}>Eliminar</a></td>
			</tr>
		);
	}


});



module.exports = InputRow;
