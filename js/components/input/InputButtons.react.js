var React 			= require('react');
var Actions			= require('../../actions/Actions');

var InputButtons = React.createClass({

	onNewKLT: function () {
		Actions.addKLT();
	},

	onGenerate: function (event) {
		//var algorithm = this.refs.algorithm.getDOMNode().value;
		Actions.confirmKLTs("Fake");
	},

	render: function(){
		return (

			<div className="ui center aligned grid">


				<div className="four wide column">
					<a onClick={this.onNewKLT} className="ui primary button">Agregar KLT</a>
				</div>

				<div className="four wide left aligned column ui checkbox" id="div-checkbox">
					<input type="checkbox" checked />
					<label>Usar KLTs</label>
				</div>

				<div className="four wide column">
					<label id="algoritmo-label">Algoritmo: </label>
					<div className="ui compact menu">
					  <div className="ui simple dropdown item">
					    Fake
					    <i className="dropdown icon"></i>
					    <div className="menu">
					      <div className="item">Fifo</div>
					      <div className="item">Round Robin</div>
					      <div className="item">SJF</div>
					    </div>
					  </div>
				   </div>

				</div>

				<div className="four wide column">
					<a onClick={this.onGenerate} className="ui primary button">Simular</a>
				</div>

			</div>

		);
	}


});



module.exports = InputButtons;
