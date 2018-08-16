// server/routes/textures_insert.js


var debugMode = true;

module.exports = function(app) {

//  POST "/textures/insert" accept as req.body.data: 
//  an array of documents (objects) or a single object.

    app.post("/textures/insert", function(req, res){

    //  req.body.docs is array of documents (objects) or single object (document).
        debugMode && console.log("post/textures/insert: req.body:", req.body.data );

        var data = JSON.parse( req.body.data );
        debugMode && console.log("post/textures/insert: data:", data );

        new Promise( function(resolve, reject){
            Textures.insert(data, {safe: true}, function(err, obj){
                debugMode && console.log("post/textures/insert results:", obj);
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

            debugMode && console.log("/textures/insert: success.");

        }).catch( function(err){

            res.status(500).json({error: err});
            debugMode && console.log("/textures/insert: failure.", err);

        });

    });

};

