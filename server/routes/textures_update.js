// server/routes/textures_update.js


var debugMode = true;

module.exports = function(app) {

    app.post("/textures/update/selectors/updates/options", function(req, res){

        debugMode && console.log("post/textures/update/selectors/updates/options req.body:", req.body );
        debugMode && console.log("post/textures/update/selectors/updates/options req.params:", req.params);

        var selectors = JSON.parse( req.body.selectors );   debugMode && console.log("selectors:", selectors);
        var updates = JSON.parse( req.body.updates );       debugMode && console.log("updates:", updates);
        var options = JSON.parse( req.body.options );       debugMode && console.log("options:", options);

        Textures.update( selectors, updates, options, function(err, commandResult){
            if (err) {
                res.status(500).json( {error: err} );
                console.log( "updateError:", err );
            } else {
                var result = commandResult.result;
                res.status(200).json( {success: result} );
                console.log( "update result:", result );
            }
        });

    });

};






