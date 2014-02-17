
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var admin = require('./routes/admin');
var test  = require('./routes/test');
var http = require('http');
var path = require('path');
var compass = require('node-compass');
var markdown = require('markdown').markdown;


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
    app.use( express.bodyParser() );
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

app.use(function(req, res, next){
    req.db = db;
});

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
app.get('/admin/blog', admin.adminBlog(db));
app.get('/admin/blog/:id', admin.adminDetailBlog(db));
app.get('/admin/blogcreate', admin.adminCreateBlog(db));

// test
app.get('/test/albums', test.adminAlbums);
app.get('/test/albums1', function(req, res){
    res.end('Hello World');
});

app.get('/test/blogview', function(req, res){
    var collection = db.get('blog');
    collection.find({}, {}, function(e, docs){
        console.log(docs[0]['content']);
        var content = docs[0]['content'];
        var html = markdown.toHTML(content);
        res.end(html);
    });
});



// ---------
//    post
// ---------

app.post( '/admin/experiment-create', admin.adminExperimentCreate(db) );

app.post( '/admin/blog-new-create'  , admin.adminBlogNewCreate(db) );
app.post( '/admin/blog-upload-photo', admin.adminBlogUploadPhoto(__dirname, db) );
app.post( '/admin/blog-upload-photo-update/:id', admin.adminBlogUploadPhotoUpdate(__dirname, db));

// test
app.post('/test-upload', test.testUpload(__dirname));

// ---------
//    put
// ---------

app.put('/admin/experiment-update/:id', admin.updateExperiment(db));

// ---------
//  delete
// ---------

app.del('/admin/experiment-delete/:exp_id', admin.adminExperimentDelete(db) );



http.createServer(app).listen(app.get('port'), function(){
    console.log('');
    console.log('Express server listening on port ' + app.get('port'));
    console.log('');
    console.log('');
});

app.get('*', function(req, res){
    res.render('404')
});