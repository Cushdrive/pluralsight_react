"use strict";

var React = require('react');


var About = React.createClass( {
	//Check if the user should be able to transition to this page.
	statics: {
		willTransitionTo: function (transition, params, query, callback) {
			if (!confirm('Are you sure you want to read this page?')) {
				//Keep the transition from happening.
				transition.abort();
				callback();
			} 
			else {
				//Let the transition happen
				callback();
			}
		},

		willTransitionFrom: function (transition, callback) {
			if (!confirm('Are you sure you want to leave this page?')) {
				//Keep the transition from happening.
				transition.abort();
			}
		}
	},

	render: function() {
		return (
				<div>
					<h1>About</h1>
					<p>
						This application uses the following technologies:
						<ul>
							<li>React</li>
							<li>React Router</li>
							<li>Flux</li>
							<li>Node</li>
							<li>Gulp</li>
							<li>Browserify</li>
							<li>Bootstrap</li>
						</ul>
					</p>
				</div>
			);
	}
} );

module.exports = About;