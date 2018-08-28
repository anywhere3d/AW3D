//  gallery-app.js

    var path = require("path");
    var morgan = require("morgan");
    var sha256 = require("sha256");
    var express = require("express");
    var formidable = require('formidable');
    var bodyParser = require("body-parser");
    var serveStatic = require("serve-static");
    var expressHandlebars = require("express-handlebars");
    
//  PROSSESS ENV SETUP.
    var env = require("node-env-file"); 
    env( path.resolve(__dirname, "../.env") );

    var app = express();
    var port = 8002;

//  BODY PARSER.
    app.use(bodyParser.json({limit:"100mb"}));
    app.use(bodyParser.urlencoded({
        limit:"100mb",          //  default:"100kb".
    //  parameterLimit:1000000  //  default:1000.
        extended:true
    }));

    app.locals.pretty = true;
    app.set("trust proxy", "loopback");

//  ROUTES.
    require(__dirname + "/routes/gallery.js")(app);
    require(__dirname + "/routes/gallery_find.js")(app);
    require(__dirname + "/routes/snapshots_find.js")(app);
    require(__dirname + "/routes/textures_find.js")(app);

    app.use(serveStatic(path.resolve(__dirname, "../public")));

//  Log every HTTP request. 
    if (process.env.ENV === "dev") app.use(morgan("dev"));

//  VIEW ENGINE.
    app.set('views', path.resolve(__dirname, "../views/"));
    var handlebars = expressHandlebars.create({
        defaultLayout: "default",
    });
    app.engine(".html", expressHandlebars({extname: ".html"}));
    app.engine("handlebars", handlebars.engine);
    app.set("view engine", ".html");

    app.listen( port );
    console.log("    >>  gallery-app is listening to port:", port);

    module.exports = function() { return app; };

