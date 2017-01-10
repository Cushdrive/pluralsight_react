"use strict";

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;
var Redirect = Router.Redirect;

//There are nested routes under the root, which is /
//If a path is not defined, react assumes that the name is equal to the path
//Route names will be used to reference the route in other areas of the app.
var routes = (
	<Route name="app" path="/" handler={require('./components/app')} >
		<DefaultRoute handler={require('./components/homePage')} />
		<NotFoundRoute handler={require('./components/notFoundPage')} />
		<Route name="authors" handler={require('./components/authors/authorPage')} />
		<Route name="about" handler={require('./components/about/aboutPage')} />
		<Route name="addAuthor" path="author" handler={require('./components/authors/manageAuthorPage')} />
		<Route name="manageAuthor" path="author/:id" handler={ require('./components/authors/manageAuthorPage') } />
		<Redirect from="about-us" to="about" />
		<Redirect from="awthors" to="authors" />
		<Redirect from="about/*" to="about" />
	</Route>

);

module.exports = routes;