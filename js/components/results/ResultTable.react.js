var React 			= require('react');

var ResultRow 		= require('./ResultRow.react');
var ResultHead 		= require('./ResultHead.react');
var ResultsStore 	= require('../../stores/ResultsStore');

var ResultTable = React.createClass({

	getResultsRows: function(){
		return this.state.results.map( result => {
			return <ResultRow key={result.id.toString() + result.id.toString()} data={result} />
		} );
	},

	getMaxQuantumCount: function(){
		if(this.state.results.length === 0){
			return 0;
		}
		return this.state.results[0].result.length;
	},

	getInitialState: function(){
		return {
			results: ResultsStore.getResults()
		};
	},

	componentDidMount: function(){
		var self = this;
		this.unsubscribe = ResultsStore.listen(function(){
			self.setState( { results: [] });
			setTimeout(() => {
				self.setState( { results: ResultsStore.getResults() } );
			});
		});
	},

	render: function(){
		return (
			<div className="result-table">
				<table className="ui celled table table-results">
					<thead>
						<ResultHead max_quantum_count={this.getMaxQuantumCount()} />
					</thead>
					<tbody>
						{this.getResultsRows()}
					</tbody>
				</table>
			</div>
		);
	}

});



module.exports = ResultTable;
