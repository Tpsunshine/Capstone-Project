var app = require('./app');
var port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
