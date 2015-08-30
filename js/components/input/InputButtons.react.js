var React 				= require('react');
var Actions				= require('../../actions/Actions');
var TasksStore 			= require('../../stores/TasksStore');
var AlgorithmsStore		= require('../../stores/AlgorithmsStore');
var AlgorithmChooser	= require('./AlgorithmChooser');

var InputButtons = React.createClass({

	getInitialState: function(){
		return {
			selectedAlgorithm: AlgorithmsStore.getAlgorithms()[0]
		};
	},

	onNewKLT: function () {
		Actions.addKLT();
	},

	onGenerate: function (event) {
		Actions.confirmKLTs(this.state.selectedAlgorithm.algorithm, {
			quantum: {
				cpu: parseInt(React.findDOMNode(this.refs.cpuQuantumValue).value) || 3
			}
		});
	},

	handleUsesUltClick: function(event){
		TasksStore.toggleUseUlts();
	},

	onSelectedAlgorithm: function(algorithm){
		this.setState({ selectedAlgorithm: algorithm });
	},

	render: function(){

		var kltOrProcessDescription = this.props.useUlts ? ' KLT' : ' proceso';
		/* Por ahora no estan implementados los ults */

		return (

			<div className="ui center aligned grid">


				<div className="four wide column">
					<a onClick={this.onNewKLT} className="ui primary button">Agregar {kltOrProcessDescription}</a>
				</div>

				<div className="three wide left aligned column ui checkbox" id="div-checkbox">
					<input id="useUlts" type="checkbox" checked={this.props.useUlts} onChange={this.handleUsesUltClick} />
					<label htmlFor="useUlts">
						Usar ULTS
					</label>
				</div>

				<div className="six wide column">
					<label className="input-label">Algoritmo: </label>
					<AlgorithmChooser onSelect={this.onSelectedAlgorithm} selected={this.state.selectedAlgorithm} />
				</div>

				<div className="three wide column">
					<div className="ui form">
						<div className="inline fields">
							<label className="input-label">Quantum: </label>
							<input type="number" defaultValue={3} ref="cpuQuantumValue" placeholder="Quantum" />
						</div>
					</div>
				</div>

				<div className="three wide column">
					<a onClick={this.onGenerate} className="ui primary button">Simular</a>
				</div>

			</div>

		);
	}


});

module.exports = InputButtons;
