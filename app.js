
/**
 * Module dependencies
 */

var express = require('express');

var database = require('./config/database');

var routes = require('./routes');
var api = require('./routes/api');
var admin = require('./routes/admin');

var http = require('http');
var path = require('path');
var compass = require('node-compass');

var app = module.exports = express();

app.configure(function() {

    app.use(compass({
        sass : 'scss',
        css  : 'styles'
    }));

    app.use( express.static( path.join(__dirname, 'public') ) );
    app.use( express.bodyParser() );
});

/**
 * Configuration
 */



app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// Add headers


// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// =========
//   admin
// =========

// get
app.get('/admin', admin.index);
app.get('/admin/home', admin.getHome);
app.get('/admin/about', admin.getAbout);
app.get('/admin/experiment', admin.getExperiment);
app.get('/admin/works', admin.getWorks);
app.get('/admin/work/:workId', admin.getWork);
app.get('/admin/work-create', admin.getCreateWork);

// post
app.post('/admin/create-experiment', admin.createExperiment);
app.post('/admin/create-work', admin.createWork);
app.post('/admin/create-home', admin.createHome);
app.post('/admin/create-about', admin.createAbout);

// put
app.put('/admin/update-experiment/:id', admin.updateExperiment);
app.put('/admin/update-work/:id', admin.updateWork);
app.put('/admin/update-home/:id', admin.updateHome);
app.put('/admin/update-about/:id', admin.updateAbout);

// delete
app.del('/admin/delete-experiment/:id', admin.delExperiment);
app.del('/admin/delete-work/:id', admin.delWork);
app.del('/admin/delete-home/:id', admin.delHome);
app.del('/admin/delete-about/:id', admin.delAbout);


// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
