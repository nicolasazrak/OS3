var React = require('react');

var InputField = React.createClass({

	getInitialState: function(){
		return { editing: false	};
	},

	handleEdit: function(){
		this.setState({ editing: true });
	},

	onBlur: function(e){
		/* Se podria hacer una validacion */
		this.setState({ editing: false });
	},

	inputDidMount: function(component){
		var domNode = React.findDOMNode(component);
		if(domNode !== null){
			/* Maldito bug de Firefox */
			if(navigator.product !== "Gecko"){
				domNode.focus();
			}
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
							onBlur={this.onBlur}
							onChange={this.props.onChange}
						/>
					</div>
				</td>);
		}else{
			return (<td title="Clic para editar" onClick={this.handleEdit}><span>{this.props.value}</span></td>);
		}
	}


});



module.exports = InputField;
