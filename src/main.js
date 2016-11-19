//main.js acts as an entrypoint for the react application

//Put jQuery in the global namespace for Bootstrap's benefit
$ = jQuery = require('jquery');
var React = require('react');
var Home = require('./components/homePage');

//Render the homePage component in the app html element
React.render(<Home />, document.getElementById('app'));