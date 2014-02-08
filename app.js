
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var admin = require('./routes/admin');
var http = require('http');
var path = require('path');
var compass = require('node-compass');

var app = express();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

// all environments
app.configure(function() {

    app.use(compass({
        sass : 'scss',
        css  : 'styles'
    }));
    app.use( express.static( path.join(__dirname, 'public') ) );
});

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// set the roouter

// ========
//   home
// ========

app.get('/', routes.index);

// =========
//   admin
// =========

// ---------
//    get
// ---------

app.get('/admin', admin.adminHome);
app.get('/admin/experiment', admin.adminExperiment(db));

// ---------
//    post
// ---------

app.post('/admin/experiment-create', admin.adminExperimentCreate(db));

// ---------
//    put
// ---------

app.put('/admin/experiment-update/:id', admin.updateExperiment(db));

// ---------
//  delete
// ---------

app.del('/admin/experiment-delete/:exp_id', admin.adminExperimentDelete(db) );
//app.del('/tasks/:task_id', tasks.del);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
