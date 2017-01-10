"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {

	//Action Creator
	createAuthor: function(author) {
		//A callback or promise would typically be used right here, if this weren't mocked.
		var newAuthor = AuthorApi.saveAuthor(author);
		//Actual Action Itself. This will notify stores that want to be notified.
		Dispatcher.dispatch( {
			actionType: ActionTypes.CREATE_AUTHOR,
			author: newAuthor
		} );
	},

	//Action Creator
	updateAuthor: function(author) {
		//A callback or promise would typically be used right here, if this weren't mocked.
		var updatedAuthor = AuthorApi.saveAuthor(author);
		//Actual Action Itself. This will notify stores that want to be notified.
		Dispatcher.dispatch( {
			actionType: ActionTypes.UPDATE_AUTHOR,
			author: updatedAuthor
		} );
	},

	deleteAuthor: function(id) {
		AuthorApi.deleteAuthor(id);

		Dispatcher.dispatch( {
			actionType: ActionTypes.DELETE_AUTHOR,
			id: id
		} );
	}
};

module.exports = AuthorActions;