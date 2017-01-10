//This rendered when "/" is mapped to the "app" route in routes.js

$ = jQuery = require('jquery');
var React = require('react');
var Header = require('./common/header');
//Will be used for using the routes defined in the routes.js file
var RouteHandler = require('react-router').RouteHandler;

var App = React.createClass( {
	render: function () {
		return (
				<div>
					<Header />
					<div className="container-fluid">
						<RouteHandler />
					</div>
				</div>
			);
	}
});

module.exports = App;