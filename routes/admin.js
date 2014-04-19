/**
 * initializing
 */
var database =require('../config/database');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk(database.url);


/**
 * GET
 */


exports.index = function(req, res){
    res.render('admin/index');
};

exports.getExperiment = function(req, res){
    var experimentCollection = db.get('experiment');
    experimentCollection.find({}, {}, function(e, docs){
        res.json(docs);
    });
};

exports.getWorks = function(req, res){
    var experimentCollection = db.get('works');
    experimentCollection.find({}, {}, function(e, docs){
        res.json(docs);
    });
};

exports.getWork = function(req, res){
    //console.log(req);
    var workId = req.params.workId;
    var workCollection = db.get('works');

    workCollection.find({_id: workId}, {}, function(e, docs){
        console.log(docs);
        res.json(docs);
    });
}

exports.getCreateWork = function(req, res){
    console.log('getCreateWork')
};

exports.getHome = function(req, res){
    var homeCollection = db.get('home');
    homeCollection.find({}, {}, function(e, docs){
        res.json(docs);
    });
};

exports.getAbout = function(req, res){
    var aboutCollection = db.get('about');
    aboutCollection.find({}, {}, function(e, docs){
        res.json(docs);
    });
};

/**
 * POST
 */

exports.createExperiment = function(req, res){
    var experimentTitle   = req.body.title;
    var experimentURL     = req.body.url;
    var experimentType    = req.body.type;
    var experimentDate    = req.body.date;
    var experimentCreated = req.body.created;

    var collection = db.get('experiment');

    collection.insert({
        title     : experimentTitle,
        url       : experimentURL,
        type      : experimentType,
        date      : experimentDate,
        created   : experimentCreated
    }, function(err, doc){
        if(err){
            console.log('error');
        } else {
            res.redirect('admin/index');
        }
    });

};

exports.createWork = function(req, res){
    var collection = db.get('works');
    collection.insert({
        title  : req.body.title,
        imageUrl:req.body.imageUrl,
        url    : req.body.url,
        year   : req.body.year,
        type   : req.body.type,
        medium : req.body.medium,
        technologies : req.body.technologies,
        client : req.body.client,
        agency : req.body.agency,
        description : req.body.description,
        created : req.body.created
    }, function(err, doc){
        if(err){
            console.log('error');
        }else{
            res.send( req.body );
        }
    });
};

exports.createHome = function(req, res){
    var collection = db.get('home');
    collection.insert({
        type        : req.body.type,
        description : req.body.description,
        created     : req.body.created
    }, function(err, doc){
        if(err){
            console.log('error');
        }else{
            res.send(req.body);
        }
    });
};

exports.createAbout = function(req, res){
    var collection = db.get('about');
    collection.insert({
        type        : req.body.type,
        description : req.body.description,
        created     : req.body.created
    }, function(err, doc){
        if(err){
            console.log('error');
        }else{
            res.send(req.body);
        }
    });
}


/**
 *  PUT
 */

exports.updateExperiment = function(req, res){
    var id = req.params.id;
    var post = req.body;

    var collection = db.get('experiment');

    collection.update({'_id' : id}, post, function(err, result){
        if(err){
            res.send({'error':'An error has occurred - ' + err});
        }else{
            res.send( req.body );
        }
    });
};

exports.updateWork = function(req, res){
    var id = req.params.id;
    var post = req.body;

    var collection = db.get('works');

    collection.update({'_id': id}, post, function(err, result){
        if(err){
            res.send({'error':'An error has occurred - ' + err});
        }else{
            res.send( req.body );
        }
    });
};

exports.updateHome = function(req, res){
    var id = req.params.id;
    var post = req.body;
    console.log(post);

    var collection = db.get('home');

    collection.update({'_id' : id}, post, function(err, result){
        if(err){
            res.send({'error':'An error has occurred - ' + err});
        }else{
            res.send(req.body);
        }
    });
};

exports.updateAbout = function(req, res){
    var id = req.params.id;
    var post = req.body;
    console.log(post);

    var collection = db.get('about');

    collection.update({'_id' : id}, post, function(err, result){
        if(err){
            res.send({'error':'An error has occurred - ' + err});
        }else{
            res.send(req.body);
        }
    });
};

/**
 *  DELETE
 */

exports.delExperiment = function(req, res){
    var id = req.params.id;
    var collection = db.get('experiment');

    collection.remove({_id: id}, {safe: true}, function(err, result){
        if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            res.send(req.body);
        }
    });
}

exports.delWork = function(req, res){
    var id = req.params.id;
    var collection = db.get('works');

    collection.remove({_id: id}, {safe: true}, function(err, result){
        if(err){
            res.send({'error' : 'An error has occurred - ' + err});
        }else{
            res.send(req.body);
        }
    });
}

exports.delHome = function(req, res){
    var id = req.params.id;
    var collection = db.get('home');

    collection.remove({_id: id}, {safe: true}, function(err, result){
        if(err){
            res.send({'error' : 'An error has occurred - ' + err});
        }else{
            res.send(req.body);
        }
    });
};


exports.delAbout = function(req, res){
    var id = req.params.id;
    var collection = db.get('about');

    collection.remove({_id: id}, {safe: true}, function(err, result){
        if(err){
            res.send({'error' : 'An error has occurred - ' + err});
        }else{
            res.send(req.body);
        }
    });
};
