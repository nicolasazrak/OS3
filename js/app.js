var React = require('react');

var ResultTable = require('./components/results/ResultTable.react');
var InputTable = require('./components/input/InputTable.react');


React.render(<ResultTable />, document.getElementById("results"));
React.render(<InputTable />, document.getElementById("input"));





