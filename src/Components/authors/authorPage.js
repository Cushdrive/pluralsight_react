"use strict";

var React = require('react');
var AuthorStore = require('../../stores/authorStore');
var AuthorActions = require('../../actions/authorActions');
var AuthorList = require('./authorList');
var Link = require('react-router').Link;

var AuthorPage = React.createClass( {
	getInitialState: function() {
		return ( {
			authors: AuthorStore.getAllAuthors()
		} );
	},
	//Register the change function with the store
	componentWillMount: function() {
		AuthorStore.addChangeListener(this._onChange);
	},

	//Unregister the change listener from the store.
	componentWillUnmount: function() {
		AuthorStore.removeChangeListener(this._onChange);
	},

	//Controller View needs a function for getting changes.
	_onChange: function() {
		this.setState( {authors: AuthorStore.getAllAuthors()} );
	},

	render: function() {

		return (
				<div>
					<h1>Authors</h1>
					<p>
						<Link to="addAuthor" className="btn btn-default">Manage Author</Link>
					</p>
					<AuthorList authors={this.state.authors} />
				</div>
			);
	}
} );

module.exports = AuthorPage;