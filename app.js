
/**
 * Module dependencies
 */

var express = require('express');

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
app.get('/admin/experiment', admin.getExperiment);
app.get('/admin/works', admin.getWorks);
app.get('/admin/work-create', admin.getCreateWork);

// post
app.post('/admin/create-experiment', admin.createExperiment);
app.post('/admin/create-work', admin.createWork);

// put
app.put('/admin/update-experiment/:id', admin.updateExperiment);

// delete
app.del('/admin/delete-experiment/:id', admin.delExperiment);


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
