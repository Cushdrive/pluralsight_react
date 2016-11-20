"use strict";

var React = require('react'); //import react
var Router = require('react-router');
var Link = Router.Link;

//Create the component
var Home = React.createClass({
	//Need render for any react component
	render: function() {
		return (
				<div className="jumbotron">
					<h1>Pluralsight Administration</h1>
					<p>React, React Router, and Flux for ultra-responsive web apps.</p>
					<Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
				</div>	
			);
	}
});

module.exports = Home;

