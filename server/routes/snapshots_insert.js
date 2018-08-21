// server/routes/snapshots_insert.js


var debugMode = true;

module.exports = function(app) {

//  POST "/snapshots/insert" accept as req.body.data: 
//  an array of documents (objects) or a single object.

    app.post("/snapshots/insert", function(req, res){

    //  req.body.docs is array of documents (objects) or single object (document).
        debugMode && console.log("post/snapshots/insert: req.body:", req.body.data );

        var data = JSON.parse( req.body.data );
        debugMode && console.log("post/snapshots/insert: data:", data );

        new Promise( function(resolve, reject){
            Snapshots.insert(data, {safe: true}, function(err, obj){
                debugMode && console.log("/snapshots/insert result:", obj);
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

            debugMode && console.log("/snapshots/insert: success.");

        }).catch( function(err){

            res.status(400).json({error: err});
            debugMode && console.log("/snapshots/insert: failure.", err);

        });

    });

};
