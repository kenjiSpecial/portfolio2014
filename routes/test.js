var fs = require('fs');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

// ============
//     get
// ============


exports.adminAlbums = function (req, res) {
    var collection = db.get('albumTest02');

    collection.find({}, {}, function (e, docs) {
        res.render('test/album/main', {
            'docs': docs,
            'page': 'album'
        });
    });
};


// ============
//     post
// ============


//exports.

exports.testUpload = function (dir) {
    return function (req, res) {
        var collection = db.get('albumTest02');
        fs.readFile(req.files.image.path, function (err, data) {

            var imageName = req.files.image.name;
            /// If there's an error
            if (!imageName) {
                console.log("There was an error")
                res.redirect("/admin");
                res.end();
            } else {

                var newPath = dir + "/public/images/test/" + imageName;
                console.log(newPath)

                collection.insert({
                    name: imageName,
                    url: newPath,
                    date: new Date()
                }, function (err, doc) {
                    if (err) {
                        console.log('error');
                    } else {
                        console.log('success');
                    }
                });

                /// write file to uploads/fullsize folder
                fs.writeFile(newPath, data, function (err) {
                    res.end();
                });
            }
        });
    }
}