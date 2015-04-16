import express = require('express');
import api = require('./routes/api/user');
import movesRouter = require('./routes/views/moves');

import http = require('http');
import path = require('path');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');
var exphbs = require('express-handlebars');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({ defaultLayout: '_layout', extname: '.hbs' }));
app.set('view engine', '.hbs');


//app.use(express.favicon());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(methodOverride());

// You can set morgan to log differently depending on your environment
if (app.get('env') == 'production') {
    app.use(morgan('common', { skip: (req, res) => res.statusCode < 400, stream: __dirname + '/../morgan.log' }));
} else {
    app.use(morgan('dev'));
}

// development only
if ('development' == app.get('env')) {
    app.use(errorhandler());
}

app.use('/api/users', <any>api);
app.use('/moves', <any>movesRouter);

http.createServer(app).listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});
