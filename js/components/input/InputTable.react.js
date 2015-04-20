var React 			= require('react');

var InputHead 		= require('./InputHead.react');
var InputRow 		= require('./InputRow.react');
var InputButtons 	= require('./InputButtons.react');

var TasksStore 		= require('../../stores/TasksStore');


var InputTable = React.createClass({

	getInitialState: function(){
		return { klts: TasksStore.getKLTs() };
	},

	componentDidMount: function(){
		var self = this;
		this.unsubscribe = TasksStore.listen( () => {
			self.setState( { klts: TasksStore.getKLTs() } );
		});
	},

	componentDidUnmount: function(){
		this.unsubscribe();
	},

	getInputKLTs: function () {

		var allTasks =  this.state.klts.map( klt => {
			return  klt.ULTs.map( ult => {
				return <InputRow key={ult.id + "-" + klt.id} ult={ult} klt={klt} /> ;
			})
		} );
		return [].concat.apply(allTasks);

	},

	render: function(){
		return (
			<div className="row">
				<form>
					<fieldset>
						<legend>Algoritmo</legend>
						<table>
							<thead>
								<InputHead />
							</thead>
							<tbody>
								{this.getInputKLTs()}
							</tbody>
						</table>
						<br />
						<InputButtons />
					</fieldset>
				</form>
			</div>
		);
	}


});



module.exports = InputTable;
