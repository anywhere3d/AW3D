// server/routes/snapshots_find.js


var debugMode = true;

module.exports = function(app) {


//  snapshots_find.js

    app.get("/snapshots/page/:page", function(req, res){

        debugMode && console.log("get /snapshots/page/: req.body:", req.body );
        debugMode && console.log("get /snapshots/page/: req.params:", req.params);

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

            Snapshots.find( selectors, options ).toArray(function(err, result) {
                if (err) throw err;
                resolve( result );
            });

        }).then( function( result ){

            res.status(200).json( {success: result} );
            debugMode && console.log("get /snapshots/page/: success.");

        }).catch( function(err){

            res.status(400).json({error: err});
            debugMode && console.log("get /snapshots/page/: failure.", err);

        });

    });

    app.post("/snapshots/find/selectors/options", function(req, res){

        debugMode && console.log("post /snapshots/find/selectors/options req.params:", req.params);
        debugMode && console.log("post /snapshots/find/selectors/options req.body.options:", req.body );

    //  IMPORTANT: numbered values arrive as strings. Must be converted to numbers.

        var options = JSON.parse( req.body.options );       debugMode && console.log("options:", options);
        var selectors = JSON.parse( req.body.selectors );   debugMode && console.log("selectors:", selectors);

        new Promise( function(resolve, reject){

            Snapshots.find( selectors, options ).toArray(function(err, result) {
                if (err) throw err;
                resolve( result );
            });

        }).then( function( result ){

            res.status(200).json( {success: result} );
            debugMode && console.log("results:", result.length);
            debugMode && console.log("post/snapshots/find/selectors/options: success.");

        }).catch( function(err){

            res.status(400).json({error: err});
            debugMode && console.log("post/snapshots/find/selectors/options: failure.", err);

        });

    });

    app.post("/snapshots/count/selectors/options", function(req, res){

        debugMode && console.log("post/snapshots/count/selectors/options: req.body:", req.body );
        debugMode && console.log("post/snapshots/count/selectors/options: req.params:", req.params);

        var options = JSON.parse( req.body.options );       debugMode && console.log("options:", options);
        var selectors = JSON.parse( req.body.selectors );   debugMode && console.log("selectors:", selectors);

        var cursor = Snapshots.find( selectors, options );
    
        cursor.count( function(err, result){
            if (err) res.status(400).json( {error: err} );
            else res.status(200).json( {count: result} );
            debugMode && console.log("post/snapshots/count/selectors/options:", result);
        });

    });

};





