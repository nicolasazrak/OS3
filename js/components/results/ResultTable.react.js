var React 			= require('react');

var ResultRow 		= require('./ResultRow.react');
var ResultHead 		= require('./ResultHead.react');
var ResultsStore 	= require('../../stores/ResultsStore');

var ResultTable = React.createClass({

	getResults: function(){
		var results = [];
		this.state.results.map(function(result){
			results.push( <ResultRow key={result.id} data={result} /> );
		});
		return results;
	},

	getInitialState: function(){
		return { results: ResultsStore.getResults() };
	},

	componentDidMount: function(){
		var self = this;
		this.unsubscribe = ResultsStore.listen(function(){
			self.setState( { results: ResultsStore.getResults() } );
		});
	},

	render: function(){
		return (
			<div className="row">
				<table className="table-results">
					<thead>
						<ResultHead />
					</thead>
					<tbody>
						{this.getResults()}
					</tbody>
				</table>
			</div>
		);
	}

});



module.exports = ResultTable;


