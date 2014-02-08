// ============
//     get
// ============

exports.adminHome = function( req, res){
    res.render('admin/experiment', { title: 'Express' });
};



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

// ============
//     post
// ============

exports.adminExperimentCreate = function(db){

    return function(req, res){
        var experimentTitle = req.body.title;
        var experimentURL   = req.body.url;
        var experimentType  = req.body.type;
        var experimentDate  = req.body.date;

        console.log(experimentTitle);
        console.log(experimentURL);
        console.log(experimentType);
        console.log(experimentDate);

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

// ============
//    delete
// ============

exports.adminExperimentDelete = function(db){


    return function(req, res){
        //console.log(req);
        var objectID = req.params.exp_id;

        var collection = db.get('experiment');
        collection.remove({ '_id' : objectID }, {safe: true}, function(err, result){
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
        console.log(post);

        //delete post._id;

        console.log('Updating wine: ' + id);
        console.log(post);

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