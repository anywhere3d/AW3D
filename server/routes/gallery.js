// server/routes/gallery.js


var debugMode = true;
var path = require("path");
var cheerio = require('cheerio');
var galleryCardHtml = require( path.resolve(__dirname, "../modules/galleryCardHtml.js") );


module.exports = function(app) {

    app.get("/gallery", function(req, res){

        var view = "gallery-index";

        var locals = {
            layout: "gallery",
            TITLE : "Gallery",
            DESCRIPTION: "",
        };

        var options = {};
        var selectors = {};
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

        options.skip = 0;
        options.limit = capacity;
        options.sort = {_id: -1};
        options.fields = fields;
        debugMode && console.log("options:", options);
        debugMode && console.log("selectors:", selectors);

        var count;

        new Promise( function(resolve, reject){

            var cursor = Gallery.find( selectors, options );
            cursor.count( false, function(err, result){
                if (err) throw err;
                count = result;
                resolve( cursor );
                debugMode && console.log("gallery/count:", count);
            });

        }).then( function( cursor ){

            return new Promise( function(resolve, reject){
                cursor.toArray( function(err, results) {
                    if (err) throw err;
                    debugMode && console.log("gallery/find/success.");
                    resolve ( results );
                });
            });

        }).then( function( results ){
            debugMode && console.log("results:", results.length);


        //  Parse result to view.
            locals.data = results;

            res.render(view, locals, function(err, html){

                if (err) {
                //  the method invokes next(err) internally.
                    console.log("render error:", err);
                //  the method does not perform an automated response.
                    res.send(err); // you must explictly send the response manualy.

                } else {

                    var primaryClass = "btn-primary";
                    var pageBtnSelector = ".page-btn";

                    var documentSelector = "#document";
                    var snapshotsHolderSelector = "#snapshots-holder";

                    var $ = cheerio.load(html, {
                        normalizeWhitespace:false,
                    });

                    var $document = $(documentSelector);
                    var $snapshotsHolder = $(snapshotsHolderSelector);

                    $snapshotsHolder.append( "\r\n" );
                    locals.data.forEach( function( doc, i ){
                        $snapshotsHolder.append( galleryCardHtml(doc) + "\r\n" );
                    });

                    $("span#length").text(locals.data.length);
                    $("span#page").text(1);
                    $("span#from").text(options.skip + 1);
                    $("span#to").text(options.skip + locals.data.length);
                    $("span#count").text(count);

                    $( pageBtnSelector ).each( function( i, button ){
                        if ( i == 0 ) $(button).addClass( primaryClass );
                        $(button).data("index", i);
                        $(button).text( i + 1 );
                    });

                    debugMode && console.log( "$html:", $.html() );

                //  the method does not perform an automated response.
                    res.send( $.html() ); // you must explictly send the response manualy.
                    debugMode && console.log("get/gallery/success.");
                }

            });

        }).catch( function(err){
            debugMode && console.log("get/gallery/failure:", err);
        });

    });

};
