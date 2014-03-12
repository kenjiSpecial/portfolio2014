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