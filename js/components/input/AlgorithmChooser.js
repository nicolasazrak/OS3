var React = require('react');
var AlgorithmsStore	= require('../../stores/AlgorithmsStore');

var AlgorithmChooser = React.createClass({

	onSelect: function(algorithm){
		return (event) => {
			this.props.onSelect(algorithm);
		};
	},

	render: function(){
		return (<div className={"ui compact menu " + (this.props.fluid ? "fluid" : null)}>
			<div className= {"ui simple dropdown item " + (this.props.fluid ? "fluid selection" : null)}>
				{this.props.selected.getDescription()}
				<i className="dropdown icon"></i>
				<div className="menu">
					{AlgorithmsStore.getAlgorithms().map(function(algorithm, index){
						return <div className="item" key={index} onClick={this.onSelect(algorithm)}>{algorithm.getDescription()}</div>
					}, this)}
				</div>
			</div>
		</div>);
	}

});

module.exports = AlgorithmChooser;
