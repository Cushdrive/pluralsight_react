"use strict";

var keyMirror = require('react/lib/keyMirror');

//Constant file that is similar to an enumeration
module.exports = keyMirror( {
	//If not using key mirror, this is what we would have to do to create a new action type
	//CREATE_AUTHOR: CREATE_AUTHOR
	INITIALIZE: null,
	CREATE_AUTHOR: null,
	UPDATE_AUTHOR: null,
	DELETE_AUTHOR: null
});