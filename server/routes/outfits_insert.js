// server/routes/outfits_insert.js


var debugMode = true;

module.exports = function(app) {

//  POST "/outfits/insert" accept as req.body.data: 
//  an array of documents (objects) or a single object.

    app.post("/outfits/insert/dna", function(req, res){

    //  req.body.docs is array of documents (objects) or single object (document).
        debugMode && console.log("post/outfits/insert/dna: req.body:", req.body.data );

        var data = JSON.parse( req.body.data );
        debugMode && console.log("post/outfits/insert/dna: data:", data );

        new Promise( function(resolve, reject){
            Outfits.insert(data, {safe: true}, function(err, obj){
                debugMode && console.log("post/outfits/insert/dna results:", obj);
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

            debugMode && console.log("/outfits/insert/dna: success.");

        }).catch( function(err){

            res.status(500).json({error: err});
            debugMode && console.log("/outfits/insert/dna: failure.", err);

        });

    });


    app.post("/outfits/insert/json", function(req, res){

    //  req.body.docs is array of documents (objects) or single object (document).
        debugMode && console.log("post/outfits/insert/json: req.body:", req.body.data );

        var data = JSON.parse( req.body.data );
        debugMode && console.log("post/outfits/insert/json: data:", data );

        new Promise( function(resolve, reject){
            Outfits.insert(data, {safe: true}, function(err, obj){
                debugMode && console.log("post/outfits/insert/json results:", obj);
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

            debugMode && console.log("/outfits/insert/json: success.");

        }).catch( function(err){

            res.status(500).json({error: err});
            debugMode && console.log("/outfits/insert/json: failure.", err);

        });

    });

};
