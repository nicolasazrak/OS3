var React 			= require('react');

var InputHead 		= require('./InputHead.react');
var InputRow 		= require('./InputRow.react');
var InputButtons 	= require('./InputButtons.react');

var TasksStore 		= require('../../stores/TasksStore');


var InputTable = React.createClass({

	getInitialState: function(){
		return {
			klts: TasksStore.getKLTs(),
			useUlts: TasksStore.useUlts()
		};
	},

	componentDidMount: function(){
		var self = this;
		this.unsubscribe = TasksStore.listen( () => {
			self.setState( self.getInitialState() );
		});
	},

	componentDidUnmount: function(){
		this.unsubscribe();
	},

	getKLTsRows: function () {

		var allTasks = this.state.klts.map( klt => {

			/* Cada ULT se mappea a una fila de la tabla */
			return  klt.ULTs.map( (ult, index, array) => {
				return <InputRow
							key={ult.id + "-" + klt.id}
							ult={ult}
							klt={klt}
							useUlts={this.state.useUlts}
							showAddULT={index === 0}
						/> ;
			})

		} );

		return [].concat.apply(allTasks);

	},

	render: function(){
		return (
			<div className="row">
				<form>
					<table className="ui celled table input-table">
						<thead>
							<InputHead useUlts={this.state.useUlts} />
						</thead>
						<tbody>
							{this.getKLTsRows()}
						</tbody>
					</table>
					<br />
					<InputButtons useUlts={this.state.useUlts} />
				</form>
			</div>
		);
	}


});



module.exports = InputTable;
