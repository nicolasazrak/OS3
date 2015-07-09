var React = require('react');

var Actions = require('../../actions/Actions');
var InputField = require('./InputField.react');


var InputRow = React.createClass({


	/* TODO use react/addons */
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


	getAddULTButtonStyle: function(){
		return {
			display: this.props.showAddULT ? '' : 'none'
		};
	},


	render: function(){
		return (
			<tr>

				<InputField type="text" className="input-value-large"   placeholder="Programa" value={this.props.ult.description}         onChange={this.onChangeTitle}      />
				<InputField type="number" placeholder="Llegada"  value={this.props.ult.start}               onChange={this.onChangeArrive}    />
				<InputField type="number" placeholder="CPU"  value={this.props.ult.bursts[0].quantum}       onChange={this.onChangeCpuQuantum1}    />
				<InputField type="number" placeholder="I/O"  value={this.props.ult.bursts[1].quantum}       onChange={this.onChangeIOQuantum1}    />
				<InputField type="number" placeholder="CPU"  value={this.props.ult.bursts[2].quantum}       onChange={this.onChangeCpuQuantum2}    />
				<InputField type="number" placeholder="I/O"  value={this.props.ult.bursts[3].quantum}       onChange={this.onChangeIOQuantum2}    />
				<td>
					<a className="ui red button" onClick={this.onDeleteULT}>Eliminar ULT</a>
				</td>
				<td>
					<a className="ui olive button" style={this.getAddULTButtonStyle()} onClick={this.onAddULT}>Agregar ULT</a>
				</td>

			</tr>
		);
	}


});



module.exports = InputRow;
