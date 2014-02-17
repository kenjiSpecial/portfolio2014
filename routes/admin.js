// ============
//     get
// ============

var fs = require('fs');
var url = require('url');

// ============
//     get
// ============

exports.adminHome = function( req, res){
    console.log(__dirname);
    //res.render('admin/experiment', { title: 'Express' });
    res.end(' Hello World');
};

// ---------------
//    experiment
// ---------------

exports.adminExperiment = function(db){

    return function(req, res){
        var collection = db.get('experiment');

        collection.find({}, {}, function(e, docs){
            //console.log(docs);
            res.render('admin/experiment', {
                'page': 'experiment',
                'experiments': docs});
        });
    }

};

// ---------
//    blog
// ---------

// list the blog
exports.adminBlog = function(db){
    return function(req, res){
        var collection = db.get('blog');

        collection.find({}, {}, function(e, docs){
            console.log('admin')
            console.log(docs);

            res.render('admin/blog/list', {
                'page' : 'blog',
                'blogs' : docs
            });

        });
    }
};


// detail and edit
exports.adminDetailBlog = function(db){
    return function(req, res){
        var collection = db.get('blog');
        var albumCollection = db.get('blogAlbum');

        var urlParts = url.parse( req.url, true );
        var query = urlParts.query;

        var objectID = req.params.id;
        collection.find({'_id' : objectID}, {}, function(e, docs){
            var title = docs[0].title;
            var thumbnail = docs[0].thumbnail;
            var content   = docs[0].content;

            if(query.image) thumbnail = query.image;

            albumCollection.find({}, {}, function(e, docs){
                res.render('admin/blog/detail', {
                    'page'      : 'blog',
                    'id'        : objectID,
                    'title'     : title,
                    'thumbnail' : thumbnail,
                    'content'   : content,
                    'albums'    : docs
                });
            });

        });
    }
};

//
exports.adminCreateBlog = function(db){
    return function(req, res){
        var urlParts = url.parse( req.url, true );
        var query = urlParts.query;

        var collection = db.get('blogAlbum');

        collection.find({}, {}, function(e, docs){

            if(query.image){
                res.render('admin/blog/create', {
                    'page'      : 'blog',
                    'thumbnail' : query.image,
                    'albums'    : docs
                });
            }else{
                res.render('admin/blog/create', {
                    'page'      : 'blog',
                    'thumbnail' : null,
                    'albums'    : docs
                });
            }
        });
    }
};

// -----------
//    album
// -----------

// ============
//     post
// ============

exports.adminExperimentCreate = function(db){

    return function(req, res){
        var experimentTitle = req.body.title;
        var experimentURL   = req.body.url;
        var experimentType  = req.body.type;
        var experimentDate  = req.body.date;

        var collection = db.get('experiment');
        collection.insert({
            title     : experimentTitle,
            url       : experimentURL,
            type      : experimentType,
            date      : experimentDate
        }, function(err, doc){
            if(err){
                console.log('error');
            } else {
                res.send(req.body);
            }
        });
    }
};

exports.adminBlogNewCreate = function(db){
    return function(req, res){
        var collection = db.get('blog');

        var blogTitle     = req.body.title;
        var blogThumbnail = req.body.thumbnail;
        var blogContent   = req.body.content;
        var blogDate      = req.body.date;


        collection.insert({
            title     : blogTitle,
            thumbnail : blogThumbnail,
            content   : blogContent,
            date      : blogDate
        }, function(err, doc){
            if(err){
                console.log('error');
            }else{
                console.log('success');

                res.send(req.body);
                res.end();
            }
        });
    }
};

exports.adminBlogUploadPhoto = function( dirName, db ){
    return function( req, res ){
        commonUploadPhoto(req, res, dirName, db, 'blogcreate');
    }
};

exports.adminBlogUploadPhotoUpdate = function( dirName, db ){
    return function(req, res){
        var objectID = req.params.id;
        var dir = 'blog/' + objectID;
        commonUploadPhoto( req, res, dirName, db, dir );
    }
}

function commonUploadPhoto( req, res, dirName, db, dirAddress ){
    if(req.files){
        if(!req.files.image.name) return;

        var collection = db.get('blogAlbum');

        fs.readFile(req.files.image.path, function(err, data){
            var imageName = req.files.image.name;

            if(!imageName){
                console.log("There was an error")
                //res.redirect("/admin");
                res.end();
            } else {
                var newPath = dirName + "/public/images/blog/" + imageName;

                collection.insert({
                    name: imageName,
                    date: new Date()
                }, function (err, doc) {
                    if (err) {
                        console.log('error');
                    } else {
                        console.log('success');
                    }
                });

                fs.writeFile(newPath, data, function (err) {
                    var direct = '/admin/' + dirAddress+ '?image=' + imageName;
                    res.redirect(direct);
                    res.end();
                });
            }
        });
    }
}


// ============
//    delete
// ============

exports.adminExperimentDelete = function(db){


    return function(req, res){
        //console.log(req);
        var objectID = req.params.exp_id;

        var collection = db.get('experiment');
        collection.remove({ '_mongod --dbpath ./dataid' : objectID }, {safe: true}, function(err, result){
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });

    }
};

// ============
//      put
// ============

exports.updateExperiment = function(db){

    return function(req, res){
        var id = req.params.id;
        var post = req.body;

        var collection = db.get('experiment');
        collection.update({'_id' : id}, post, function(err, result){
            if(err){
                res.send({'error':'An error has occurred - ' + err});
            }else{
                console.log('' + result + ' update');
                // res.send( req.body, req.params.id );
                res.send( req.body );
            }
        });

    }

}