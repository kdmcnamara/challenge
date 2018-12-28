// execute code in strict mode
'use strict';

// express is a node framework
var express = require('express');
const app = express();

// http needed to create the web server
const http = require('http');

// Serve static files to the root of the project
app.use('/', express.static('public'));

// Create server
var server = http.createServer(app);

// Load the files from the node_modules directory from the /slds prefix
app.use('/slds', express.static(__dirname + '/node_modules/@salesforce-ux/design-system/assets'));

// Listen on port 3000 for the application
app.listen(process.env.PORT || 3000, () =>  {
	console.log("Server is running on port 3000!");
});
