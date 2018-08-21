// server/routes/gallery_find.js


var debugMode = true;

module.exports = function(app) {


//  gallery_find.js

    app.get("/gallery/page/:page", function(req, res){

        debugMode && console.log("get /gallery/page/: req.body:", req.body );
        debugMode && console.log("get /gallery/page/: req.params:", req.params);

        var capacity = 20;
        var fields = { 
            "id":1, 
            "title":1, 
            "type":1, 
            "width":1, 
            "height":1, 
            "link":1, 
            "name":1, 
            "description":1, 
            "views":1,
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

            Gallery.find( selectors, options ).toArray(function(err, result) {
                if (err) throw err;
                resolve( result );
            });

        }).then( function( result ){

            res.status(200).json( {success: result} );
            debugMode && console.log("get /gallery/page/: success.");

        }).catch( function(err){

            res.status(400).json({error: err});
            debugMode && console.log("get /gallery/page/: failure.", err);

        });

    });

    app.post("/gallery/find/selectors/options", function(req, res){

        debugMode && console.log("post /gallery/find/options/selectors req.body.options:", req.body );
        debugMode && console.log("post /gallery/find/options/selectors req.params:", req.params);

        var options = JSON.parse( req.body.options );       debugMode && console.log("options:", options);
        var selectors = JSON.parse( req.body.selectors );   debugMode && console.log("selectors:", selectors);

        new Promise( function(resolve, reject){

            Gallery.find( selectors, options ).toArray(function(err, result) {
                if (err) throw err;
                resolve( result );
            });

        }).then( function( result ){

            res.status(200).json( {success: result} );
            debugMode && console.log("post /gallery/find/options/selectors: success.");

        }).catch( function(err){

            res.status(400).json({error: err});
            debugMode && console.log("post /gallery/find/options/selectors: failure.", err);

        });

    });

    app.post("/gallery/count/selectors/options", function(req, res){

        debugMode && console.log("post/gallery/count/selectors/: req.body:", req.body );
        debugMode && console.log("post/gallery/count/selectors/: req.params:", req.params);

        var options = JSON.parse( req.body.options );       debugMode && console.log("options:", options);
        var selectors = JSON.parse( req.body.selectors );   debugMode && console.log("selectors:", selectors);

        var cursor = Gallery.find( selectors, options );
    
        cursor.count( function(err, result){
            if (err) res.status(400).json( {error: err} );
            else res.status(200).json( {count: result} );
            debugMode && console.log("post/gallery/count/selectors/options:", result);
        });

    });

};
