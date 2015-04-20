var React = require('react');

var Actions = require('../../actions/Actions');

var InputRow = React.createClass({

	onChangeTitle: function(event){
		var task = this.props.ult;
		task.description = event.target.value;
		Actions.updateULT(this.props.klt, task);
	},

	onChangeArrive: function(event){
		var task = this.props.ult;
		task.start = event.target.value;
		Actions.updateULT(this.props.klt, task);
	},

	onChangeCpuQuantum1: function(event){
		var task = this.props.ult;
		task.bursts[0].quantum = event.target.value;
		Actions.updateULT(this.props.klt, task);
	},

	onChangeIOQuantum1: function(event){
		var task = this.props.ult;
		task.bursts[1].quantum = event.target.value;
		Actions.updateULT(this.props.klt, task);
	},

	onChangeCpuQuantum2: function(event){
		var task = this.props.ult;
		task.bursts[2].quantum = event.target.value;
		Actions.updateULT(this.props.klt, task);
	},

	onChangeIOQuantum2: function(event){
		var task = this.props.ult;
		task.bursts[3].quantum = event.target.value;
		Actions.updateULT(this.props.klt, task);
	},

	onDeleteULT: function(event){
		var ult = this.props.ult;
		var klt = this.props.klt;
		Actions.deleteULT(klt, ult);
	},

	onAddULT: function(event){
		Actions.addULT(this.props.klt);
	},

	render: function(){
		return (
			<tr>
				<td><input type="text" placeholder="Programa" value={this.props.ult.description} onChange={this.onChangeTitle} /></td>
				<td><input type="number" placeholder="Llegada" value={this.props.ult.start}  onChange={this.onChangeArrive} /></td>
				<td><input type="number" placeholder="CPU" value={this.props.ult.bursts[0].quantum} onChange={this.onChangeCpuQuantum1} /></td>
				<td><input type="number" placeholder="I/O" value={this.props.ult.bursts[1].quantum} onChange={this.onChangeIOQuantum1} /></td>
				<td><input type="number" placeholder="CPU" value={this.props.ult.bursts[2].quantum} onChange={this.onChangeCpuQuantum2} /></td>
				<td><input type="number" placeholder="I/O" value={this.props.ult.bursts[3].quantum} onChange={this.onChangeIOQuantum2} /></td>
				<td width="100"><a className="button postfix alert" onClick={this.onDeleteULT}>Eliminar ULT</a></td>
				<td width="150"><a className="button postfix success" onClick={this.onAddULT}>Agregar ULT</a></td>
			</tr>
		);
	}


});



module.exports = InputRow;
