var React = require('react');

var ResultRow = React.createClass({

	getInitialState: function(){
		return { time: 0 };
	},

	componentDidMount: function(){
		this.setState({ time: 0 });
	},

	componentDidUpdate: function(){
		setTimeout(() => {
			if(this.state.time < this.props.data.result.length){
				this.setState({ time: this.state.time + 1 });
			}
		}.bind(this), 100);
	},

	getColums: function () {

		return this.props.data.result.map( (result, index) => {

			return <td key={index} className={this.state.time >= index ? result : ""}></td>

		}.bind(this));

	},

	render: function(){
		return (
			<tr>
				<td>{this.props.data.description}</td>
				{this.getColums()}
			</tr>
		);
	}


});



module.exports = ResultRow;
