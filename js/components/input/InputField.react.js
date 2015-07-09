var React = require('react');

var InputField = React.createClass({

	getInitialState: function(){
		return { editing: false	};
	},

	handleEdit: function(){
		this.setState({ editing: true });
	},

	handleBlur: function(){
		/* Se podria hacer una validacion */
		if(this.props.value == ""){
			return;
		}
		this.setState({ editing: false });
	},

	componentDidUpdate: function(){
		var domNode = React.findDOMNode(this.refs.theInput);
		if(domNode !== null){
			domNode.focus();
			domNode.select();
		}
	},

	render: function(){

		var input = <input type={this.props.type}
				placeholder={this.props.placeholder}
				value={this.props.value}
				onBlur={this.handleBlur}
				className={this.props.className !== undefined ? this.props.className : 'input-value'}
				ref="theInput"
				onChange={this.props.onChange}
			/>;

		var text = <span>{this.props.value}</span>;

		var field = this.state.editing ? input : text;

		return (
			<td width="100px" className="ui input" onClick={this.handleEdit}>{field}</td>
		);
	}


});



module.exports = InputField;
