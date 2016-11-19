"use strict";

var React = require('react'); //import react

//Create the component
var Home = React.createClass({
	//Need render for any react component
	render: function() {
		return (
				<div className="jumbotron">
					<h1>Pluralsight Administration</h1>
					<p>React, React Router, and Flux for ultra-responsive web apps.</p>
				</div>	
			);
	}
});

module.exports = Home;

