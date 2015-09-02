var React 				= require('react');
var Actions 			= require('../../actions/Actions');
var InputField 			= require('./InputField.react');
var TasksStore 			= require('../../stores/TasksStore');
var AlgorithmChooser	= require('./AlgorithmChooser');

var InputRow = React.createClass({

	/* TODO use react/addons */
	onChangeTitle: function(event){
		var task = this.props.ult;
		task.description = event.target.value;
		Actions.updateULT(this.props.klt, task);
	},

	onChangeArrive: function(event){
		var task = this.props.ult;
		task.start = parseInt(event.target.value);
		Actions.updateULT(this.props.klt, task);
	},

	onChangeCpuQuantum1: function(event){
		var task = this.props.ult;
		task.bursts[0].quantum = parseInt(event.target.value);
		Actions.updateULT(this.props.klt, task);
	},

	onChangeIOQuantum1: function(event){
		var task = this.props.ult;
		task.bursts[1].quantum = parseInt(event.target.value);
		Actions.updateULT(this.props.klt, task);
	},

	onChangeCpuQuantum2: function(event){
		var task = this.props.ult;
		task.bursts[2].quantum = parseInt(event.target.value);
		Actions.updateULT(this.props.klt, task);
	},

	onChangeIOQuantum2: function(event){
		var task = this.props.ult;
		task.bursts[3].quantum = parseInt(event.target.value);
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

	onUpdatedULTAlgorithm: function(algorithm){
		Actions.updatedULTAlgorithm(this.props.klt, algorithm);
	},

	render: function(){

		var ultColumn;
		if(this.props.useUlts){
			ultColumn = (
				<td>
					<a className="ui olive button" style={{'display': this.props.showAddULT ? '' : 'none'}} onClick={this.onAddULT}>Agregar ULT</a>
					{this.props.showULTAlgorithm ? <AlgorithmChooser fluid={true} onSelect={this.onUpdatedULTAlgorithm} selected={this.props.klt.algorithm}  /> : null}
				</td>
			);
		}

		return (
			<tr className="tr-input-row">

				<InputField type="text" className="input-value-large"   placeholder="Programa" value={this.props.ult.description}         onChange={this.onChangeTitle}      />
				<InputField type="number" placeholder="Llegada"  value={this.props.ult.start}               onChange={this.onChangeArrive}    />
				<InputField type="number" placeholder="CPU"  value={this.props.ult.bursts[0].quantum}       onChange={this.onChangeCpuQuantum1}    />
				<InputField type="number" placeholder="I/O"  value={this.props.ult.bursts[1].quantum}       onChange={this.onChangeIOQuantum1}    />
				<InputField type="number" placeholder="CPU"  value={this.props.ult.bursts[2].quantum}       onChange={this.onChangeCpuQuantum2}    />
				<InputField type="number" placeholder="I/O"  value={this.props.ult.bursts[3].quantum}       onChange={this.onChangeIOQuantum2}    />
				<td>
					<a className="ui red button" onClick={this.onDeleteULT}>{'Eliminar ' + (this.props.useUlts ? 'ULT': '')}</a>
				</td>
				{ultColumn}

			</tr>
		);
	}


});



module.exports = InputRow;
