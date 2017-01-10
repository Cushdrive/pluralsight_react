//main.js acts as an entrypoint for the react application
"use strict";
//Put jQuery in the global namespace for Bootstrap's benefit
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');

//Call the action to setup the data for the first time.
InitializeActions.initApp();

//To use HTML5 push-state to keep navigation history instead of #, add the second param
//to the run function. This may have changed in newer versions of React.
//Router.run(routes, Router.HistoryLocation, function(Handler) {
Router.run(routes, function(Handler) {
	//The Handler is passed in by react router.
	React.render(<Handler />, document.getElementById('app'));
});