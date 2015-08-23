var React 			= require('react');
var Actions			= require('../../actions/Actions');
var TasksStore 		= require('../../stores/TasksStore');
var ResultsStore	= require('../../stores/ResultsStore');

var InputButtons = React.createClass({

	getInitialState: function(){
		var algorithms = ResultsStore.getAlgorithms();
		return {
			selectedAlgorithm: algorithms[1],
			algorithms: algorithms
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
		return function(event){
			this.setState({ selectedAlgorithm: algorithm });
		}.bind(this);
	},

	render: function(){

		var kltOrProcessDescription = this.props.useUlts ? ' KLT' : ' proceso';

		/* Por ahora no estan implementados los ults */
		var checkBoxStyle = {display: 'none'};

		return (

			<div className="ui center aligned grid">


				<div className="four wide column">
					<a onClick={this.onNewKLT} className="ui primary button">Agregar {kltOrProcessDescription}</a>
				</div>

				<div className="one wide left aligned column ui checkbox" style={checkBoxStyle} id="div-checkbox">
					<input id="useUlts" type="checkbox" checked={this.props.useUlts} onChange={this.handleUsesUltClick} />
					<label htmlFor="useUlts">
						Usar ULTS
					</label>
				</div>

				<div className="five wide column">
					<label className="input-label">Algoritmo: </label>
					<div className="ui compact menu">
						<div className="ui simple dropdown item">
							{this.state.selectedAlgorithm.description}
							<i className="dropdown icon"></i>
							<div className="menu">
								{this.state.algorithms.map(function(algorithm, index){
									return <div className="item" key={index} onClick={this.onSelectedAlgorithm(algorithm)}>{algorithm.description}</div>
								}, this)}
							</div>
						</div>
					</div>
				</div>

				<div className="four wide column">
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
