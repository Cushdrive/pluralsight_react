"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var _ = require('lodash');

//Private variables usually start with underscore. The api should be the only way
//to interact with data in this store.
var _authors = [];

//Takes an empty object, extend the object to utilize EventEmitter.prototype, and 
//extend it further in this class.
var AuthorStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	getAllAuthors: function() {
		return _authors;
	},

	getAuthorById: function(id) {
		//Using lodash array function here.
		return _.find(_authors, {id: id});
	}
});

//Gets called anytime ANY action is dispatched, so switching is necessary. Action, in this case,
//is the CREATE_AUTHOR payload.
Dispatcher.register(function(action) {
	switch(action.actionType) {
		case ActionTypes.INITIALIZE:
			//This method is different than the one below because _authors is empty at this point.
			_authors = action.initialData.authors;
			AuthorStore.emitChange();
			break;
		case ActionTypes.CREATE_AUTHOR:
			_authors.push(action.author); //action.author is "glued" through the payload.
			//It is very important that this call be made every time the store is changed.!!!!!
			AuthorStore.emitChange();
			break;
		case ActionTypes.UPDATE_AUTHOR:
			//Find the existing author and update it in the array
			var existingAuthor = _.find(_authors, {id: action.author.id});
			var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
			//Overwrite the existing element.
			_authors.splice(existingAuthorIndex, 1, action.author);

			//It is very important that this call be made every time the store is changed.!!!!!
			AuthorStore.emitChange();
			break;
		case ActionTypes.DELETE_AUTHOR:
			_.remove(_authors, function(author) {
				return action.id === author.id;
			});
			AuthorStore.emitChange();
			break;
		default:
			//No op. This will happen a lot.
	}
});

//Information hiding is implemented in this implementation. The register function is
//private, while the AuthorStore is made public.
module.exports = AuthorStore;