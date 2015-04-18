var express = require('express');

var app = new express();

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/provider', function(req, res) {
	res.sendFile(__dirname + '/views/provider.html');
});

app.use('/public', express.static('public'));

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Server listening at http://%s:%s', host, port);
});
