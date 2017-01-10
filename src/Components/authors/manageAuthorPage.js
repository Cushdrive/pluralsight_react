"use strict";

var React = require('react');
var AuthorForm = require('./authorForm');
var Router = require('react-router');
var Toastr = require('toastr');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');


//This is the controller view for the manage author page
var ManageAuthorPage = React.createClass( {
	//This mixin comes with react by default.
	mixins: [
		Router.Navigation
	],

	statics: {
		willTransitionFrom: function(transition, component) {
			if ((component.state.dirty) && (!confirm('Leave without saving?'))) {
				transition.abort();
			}
		}
	},


	getInitialState: function () {
		return {
				author: { id: '', firstName: '', lastName: '' },
				errors: {},
				dirty: false
			};
	},

	componentWillMount: function () {
		var authorId = this.props.params.id; //gets the value from the path /author/:id
		if (authorId) {
			//Use the API to get the author object and pass it to setState so that
			//it can be rendered at the same time as the component.
			this.setState( {author: AuthorStore.getAuthorById(authorId)} );
		}
	},

	//The event is every single key-press
	setAuthorState: function (event) {
		var field = event.target.name;
		var value = event.target.value;

		if ((value.length > 0) && (this.state.author[field].value !== value)){
			this.state.dirty = true;
			this.setState( {dirty: this.state.dirty} );
		}
		else {
			this.state.dirty = false;
			this.setState( {dirty: this.state.dirty} );	
		}

		this.state.author[field] = value;
		return this.setState( {author: this.state.author} );
	},

	authorFormIsValid: function () {
		var formIsValid = true;

		//Clear previous errors
		this.state.errors = {};

		if (this.state.author.firstName.length < 3) {
			this.state.errors.firstName = 'The first name must be at least 3 characters';
			formIsValid = false;
		}

		if (this.state.author.lastName.length < 3) {
			this.state.errors.lastName = 'The last name must be at least 3 characters';
			formIsValid = false;
		}

		//Altering the state alone won't do anything. Must call setState for things
		//to take effect. In this case, no rendering will be triggered because their are
		//no visual updates related to this state change.
		this.setState( {errors: this.state.errors} );
		return formIsValid;
	},

	saveAuthor: function (event) {
		//Prevent the form from actually submitting. We will
		//handling it here instead.
		event.preventDefault();

		if (!this.authorFormIsValid()) {
			return;
		}

		if (this.state.author.id) {
			//Update the author
			AuthorActions.updateAuthor(this.state.author);	
		}
		else {
			//Create the author
			AuthorActions.createAuthor(this.state.author);	
		}
		
		//Clear the dirty state
		this.setState( {dirty: false} );
		//Use Toastr to notify the user that the operation was successful.
		Toastr.success('Author added successfully.');
		//Use the mixin to acces the transtionTo function and route
		//to the authors list.
		this.transitionTo('authors');
	},

	render: function () {
		return (
				//Capture changes to the form. Pass the function that will handle the changes
				//down to the form component. onChange here is nothing more than a prop. The onChange
				//attribute of field elements should assign the prop to the onChange attribute for the element.
				<AuthorForm 
					author={this.state.author} 
					onSave={this.saveAuthor}
					onChange={this.setAuthorState}
					errors={this.state.errors} />
			);
	}
} );

module.exports = ManageAuthorPage;