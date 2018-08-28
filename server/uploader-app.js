// uploader-app.js

    var debugMode = true;
    var fs = require('fs');
    var path = require("path");
    var morgan = require("morgan");
    var sha256 = require("sha256");
    var express = require("express");
    var formidable = require('formidable');
    var bodyParser = require("body-parser");
    var serveStatic = require("serve-static");
    var expressHandlebars = require("express-handlebars");
    
    var app = express();
    var port = 8001;

    app.locals.pretty = true;
    app.set("trust proxy", "loopback");

//  BODY PARSER. 
    app.use(bodyParser.json({limit:"100mb"}));
    app.use(bodyParser.json({
        limit:"100mb",          //  default:"100kb".
        parameterLimit:1000000, //  default:1000.
        extended:true
    }));

    app.get("/uploader", function(req, res){

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<style>.middle > * {position:absolute;');
        res.write('height:fit-content;width:fit-content;');
        res.write('top:0;bottom:0;left:0;right:0;');
        res.write('margin:auto;text-align:center;');
        res.write('font-family:Arial;}</style>');
        res.write('<section class="middle">');
        res.write('<form action="/uploader/fileupload"');
        res.write(' method="post" enctype="multipart/form-data">');
        res.write('<h2>File Uploader</h2>');
        res.write('<input type="file" id="fileinput"');
        res.write(' style="display:none;" name="filetoupload">');
        res.write('<input type="button" value="Browse files..."');
        res.write(' onclick="document.getElementById(\'fileinput\').click();">');
        res.write('<input type="submit">');
        res.write('</form></section>');

        return res.end();

    });

    app.post("/uploader/fileupload", function(req, res){

        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {

            var old_path = files.filetoupload.path;
            debugMode && console.log( "\told path:", old_path );

            var new_path = path.join(__dirname, "../public/uploads/" + files.filetoupload.name);
            debugMode && console.log( "\tnew path:", new_path );

            fs.rename(old_path, new_path, function (err) {

                if (err) {

                    console.log(err);

                    var html = [

                        '<style>.middle > * {position:absolute;',
                        'height:fit-content;width:fit-content;',
                        'top:0;bottom:0;left:0;right:0;',
                        'margin:auto;text-align:center;',
                        'font-family:Arial;}</style>',
                        '<section class="middle"><div>',
                        '<p style="width:500px;">',
                        '<code>' + err + '</code>',
                        '</p><a href="/uploader" style="text-',
                        'decoration:none;">Back to uploader',
                        '</a></div></section>'

                    ].join("");

                    res.writeHead(500, {'Content-Type': 'text/html'});
                    return res.end(html);

                } else {

                    var html = [

                        '<style>.middle > * {position:absolute;',
                        'height:fit-content;width:fit-content;',
                        'top:0;bottom:0;left:0;right:0;',
                        'margin:auto;text-align:center;',
                        'font-family:Arial;}</style>',
                        '<section class="middle"><div>',
                        '<h1>success</h1>',
                        '<p>File uploaded and moved!</p>',
                        '<a href="/uploader" style="text-',
                        'decoration:none;">Back to uploader',
                        '</a></div></section>'

                    ].join("");

                    res.writeHead(200, {'Content-Type': 'text/html'});
                    return res.end(html);

                }

            });

        });

    });

    app.use(serveStatic(path.resolve(__dirname, "../public/uploads")));
    
    app.listen( port );
    console.log("    >> uploader-app is listening to port:", port);

    module.exports = function() { return app; };
