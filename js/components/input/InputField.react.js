var React = require('react');

var InputField = React.createClass({

	getInitialState: function(){
		return { editing: false	};
	},

	handleEdit: function(){
		this.setState({ editing: true });
	},

	/* Originalmente era con onBlur pero por un bug de firefox no se puede hacer */
	onChange: function(e){
		/* Se podria hacer una validacion */
		this.setState({ editing: false });
		this.props.onChange(e);
	},

	inputDidMount: function(component){
		var domNode = React.findDOMNode(component);
		if(domNode !== null){
			domNode.select();
		}
	},

	render: function(){

		if(this.state.editing){
			return (<td>
				<div className="ui input">
					<input type={this.props.type}
							placeholder={this.props.placeholder}
							value={this.props.value}
							className={this.props.className !== undefined ? this.props.className : 'input-value'}
							ref={this.inputDidMount}
							onChange={this.onChange}
						/>
					</div>
				</td>);
		}else{
			return (<td onClick={this.handleEdit}><span>{this.props.value}</span></td>);
		}
	}


});



module.exports = InputField;
