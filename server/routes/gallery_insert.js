// server/routes/gallery_insert.js


var debugMode = true;

module.exports = function(app) {

//  POST "/gallery/insert" accept as req.body.data: 
//  an array of documents (objects) or a single object.

    app.post("/gallery/insert", function(req, res){

    //  req.body.docs is array of documents (objects) or single object (document).
        debugMode && console.log("post /gallery/insert: req.body.data:", req.body.data );

        new Promise( function(resolve, reject){
            Gallery.insert(req.body.data, {safe: true}, function(err, obj){
                debugMode && console.log("/gallery/insert result:", obj);
                if (err) throw err;
                resolve( obj );
            });

        }).then( function( obj ){

            res.status(200).json({
                success: {
                    result       : obj.result,
                    insertedCount: obj.insertedCount,
                    insertedIds  : obj.insertedIds
                }
            });

            debugMode && console.log("/gallery/insert: success.");

        }).catch( function(err){

            res.status(400).json({error: err});
            debugMode && console.log("/gallery/insert: failure.", err);

        });

    });

};

/*
function galleryInsert(req, res){
    Gallery.insert(req.body.data, {safe: true}, function(err, obj){
        debugMode && console.log("/gallery/insert result:", obj);

        if (err){

            res.status(400).json({error: err});
            debugMode && console.log("/gallery/insert: failure.");

        } else {

            res.status(200).json( {success: obj.result} );
            debugMode && console.log("/gallery/insert: success.");
            
        }

    });
}
*/
