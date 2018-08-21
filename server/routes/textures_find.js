// server/routes/textures_find.js


var debugMode = true;

module.exports = function(app) {


//  textures_find.js

    app.post("/textures/imgur/id/:id", function(req, res){

        debugMode && console.log("post/textures/imgur/id/: req.body:", req.body );
        debugMode && console.log("post/textures/imgur/id/: req.params:", req.params);

        var id = req.params.id;
        var selectors = { "id": id };
        var fields = { 
        //  "id":1, 
            "title":1, 
            "description":1,
            "tags":1,
            "snapshots":1,
            "master_snapshot":1,
        };

        Textures.findOne(selectors, fields, function(err, doc){
            if (err){
                debugMode && console.log("post/textures/imgur/id/: failure:", err);
                res.status(400).json({error: err});
            } else {
                debugMode && console.log("post/textures/imgur/id/: success:", doc);
                res.status(200).json( {success: doc} );
            }
        });

    });

    app.post("/textures/find/selectors/options", function(req, res){

        debugMode && console.log("post/textures/find/selectors/options req.body:", req.body );
        debugMode && console.log("post/textures/find/selectors/options req.params:", req.params);

    //  IMPORTANT: numbered values arrive as strings. Must be converted to numbers.

        var options = JSON.parse( req.body.options );       debugMode && console.log("options:", options);
        var selectors = JSON.parse( req.body.selectors );   debugMode && console.log("selectors:", selectors);

        new Promise( function(resolve, reject){

            Textures.find( selectors, options ).toArray(function(err, result) {
                if (err) throw err;
                resolve( result );
            });

        }).then( function( result ){

            res.status(200).json( {success: result} );
            debugMode && console.log("results:", result.length);
            debugMode && console.log("post/textures/find/selectors/options: success.");

        }).catch( function(err){

            res.status(400).json({error: err});
            debugMode && console.log("post/textures/find/selectors/options: failure:", err);

        });

    });

    app.post("/textures/count/selectors/options", function(req, res){

        debugMode && console.log("post/textures/count/selectors/options: req.body:", req.body );
        debugMode && console.log("post/textures/count/selectors/options: req.params:", req.params);

        var options = JSON.parse( req.body.options );       debugMode && console.log("options:", options);
        var selectors = JSON.parse( req.body.selectors );   debugMode && console.log("selectors:", selectors);

        var cursor = Textures.find( selectors, options );
    
        cursor.count( function(err, result){
            if (err) res.status(400).json( {error: err} );
            else res.status(200).json( {count: result} );
            debugMode && console.log("post/textures/count/selectors/options:", result);
        });

    });

    app.get("/textures/page/:page", function(req, res){

        debugMode && console.log("get/textures/page/: req.body:", req.body );
        debugMode && console.log("get/textures/page/: req.params:", req.params);

        var capacity = 20;
        var fields = { 
        //  new entries:
            "id":1, 
            "title":1, 
            "type":1, 
            "width":1, 
            "height":1, 
            "link":1, 
            "name":1, 
            "description":1, 
            "views":1,
            "category":1,
            "icon":1,
            "preview":1,
            "url":1,
            "ext":1,
        };

        var page = req.params.page;

        var options = {};
        options.fields = fields;
        options.limit = capacity;
        options.skip = capacity * page;
        options.sort = {_id: -1};
        debugMode && console.log("options:", options);

        var selectors = {};
        debugMode && console.log("selectors:", selectors);

        new Promise( function(resolve, reject){

            Textures.find( selectors, options ).toArray(function(err, result) {
                if (err) throw err;
                resolve( result );
            });

        }).then( function( result ){

            res.status(200).json( {success: result} );
            debugMode && console.log("get/textures/page/: success.");

        }).catch( function(err){

            res.status(400).json({error: err});
            debugMode && console.log("get/textures/page/: failure.", err);

        });

    });

};
