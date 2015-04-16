import express = require('express');
import routes = require('./routes/index');
import user = require('./routes/user');
import http = require('http');
import path = require('path');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');
var exphbs = require('express-handlebars');

var app = express();
var router = new express.Router();

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

//import stylus = require('stylus');
//app.use(stylus.middleware(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(errorhandler());
}

// Set routes
router.get('/', routes.index);
app.use('/',(<any>router));

http.createServer(app).listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});
