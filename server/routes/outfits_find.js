// server/routes/outfits_find.js


var debugMode = true;

module.exports = function(app) {


    app.post("/outfits/find/selectors/options", function(req, res){

        debugMode && console.log("post/outfits/find/selectors/options req.body:", req.body );
        debugMode && console.log("post/outfits/find/selectors/options req.params:", req.params);

    //  IMPORTANT: numbered values arrive as strings. Must be converted to numbers.

        var options = JSON.parse( req.body.options );       debugMode && console.log("options:", options);
        var selectors = JSON.parse( req.body.selectors );   debugMode && console.log("selectors:", selectors);

        new Promise( function(resolve, reject){

            Outfits.find( selectors, options ).toArray(function(err, result) {
                if (err) throw err;
                resolve( result );
            });

        }).then( function( result ){

            res.status(200).json( {success: result} );
            debugMode && console.log("results:", result.length);
            debugMode && console.log("post/outfits/find/selectors/options: success.");

        }).catch( function(err){

            res.status(400).json({error: err});
            debugMode && console.log("post/outfits/find/selectors/options: failure:", err);

        });

    });

    app.post("/outfits/count/selectors/options", function(req, res){

        debugMode && console.log("post/outfits/count/selectors/options: req.body:", req.body );
        debugMode && console.log("post/outfits/count/selectors/options: req.params:", req.params);

        var options = JSON.parse( req.body.options );       debugMode && console.log("options:", options);
        var selectors = JSON.parse( req.body.selectors );   debugMode && console.log("selectors:", selectors);

        var cursor = Outfits.find( selectors, options );
    
        cursor.count( function(err, result){
            if (err) res.status(400).json( {error: err} );
            else res.status(200).json( {count: result} );
            debugMode && console.log("post/outfits/count/selectors/options:", result);
        });

    });

};
