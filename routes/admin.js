/**
 * initializing
 */

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/appSample01');


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

    //res.render('admin/index');
}

exports.getCreateWork = function(req, res){
    console.log('getCreateWork')
};

/**
 * POST
 */


exports.createExperiment = function(req, res){
    console.log(req.body);
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
    console.log(req.body);


    var collection = db.get('works');
    collection.insert({
        title  : req.body.title,
        url    : req.body.url,
        year   : req.body.year,
        type   : req.body.type,
        medium : req.body.medium,
        technologies : req.body.technologies,
        client : req.body.client,
        agency : req.body.agency,
        description : req.body.description
    }, function(err, doc){
        if(err){
            console.log('error');
        }else{
            res.send( req.body );
        }
    });
};

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
    console.log(id);

    collection.remove({_id: id}, {safe: true}, function(err, result){
        if(err){
            res.send({'error' : 'An error has occurred - ' + err});
        }else{
            //res.redirect('/admin')
            res.send(req.body);
        }

    });
}