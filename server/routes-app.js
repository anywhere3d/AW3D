//  server/routes-app.js

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
    env( path.resolve(__dirname, "../.env") ); // IMPORTANT //

    //  MONGODB.
    var MongoClient = require("mongodb").MongoClient;
    var dbUser = process.env.DB_URER;
    var dbPass = process.env.DB_PASS;
    var dbHost = process.env.DB_HOST;
    var dbPort = process.env.DB_PORT;
    var dbName = process.env.DB_NAME;
    //  This mongodb path structure will change in version 3.x.x. Keep mongodb to version ^2.2.29.
    var dbURL = ["mongodb://", dbUser, ":", dbPass, "@", dbHost, ":", dbPort, "/", dbName].join("");

    var app = express();

//  BODY PARSER.
//  source: "https://stackoverflow.com/questions/19917401/error-request-entity-too-large".
    app.use(bodyParser.json({limit:"100mb"}));
    app.use(bodyParser.urlencoded({
        limit:"100mb",          //  default:"100kb".
    //  parameterLimit:1000000  //  default:1000.
        extended:true
    }));

    app.locals.pretty = true;
    app.set("trust proxy", "loopback");

//  ROUTES. Keeping the order is IMPORTANT.
//  First must be the routes and then the static folders.
    require(__dirname + "/routes/gallery.js")(app);
    require(__dirname + "/routes/gallery_insert.js")(app);
    require(__dirname + "/routes/gallery_find.js")(app);
    require(__dirname + "/routes/snapshots_insert.js")(app);   
    require(__dirname + "/routes/snapshots_find.js")(app);
    require(__dirname + "/routes/textures_find.js")(app);
    require(__dirname + "/routes/textures_insert.js")(app);
    require(__dirname + "/routes/textures_update.js")(app);
    require(__dirname + "/routes/outfits_find.js")(app);
    require(__dirname + "/routes/outfits_insert.js")(app);
    require(__dirname + "/routes/uploader.js")(app);

//  First must be the routes and last the static folders.
    app.use(serveStatic(path.resolve(__dirname, "../public")));

//  Log every HTTP request. 
//  See https://github.com/expressjs/morgan for other available formats.
    if (process.env.ENV === "dev") app.use(morgan("dev"));

//  VIEW ENGINE.
    app.set('views', path.resolve(__dirname, "../views/"));
    var handlebars = expressHandlebars.create({
        defaultLayout: "default",
    });
    app.engine(".html", expressHandlebars({extname: ".html"}));
    app.engine("handlebars", handlebars.engine);
    app.set("view engine", ".html");


module.exports = function() {

    MongoClient.connect(dbURL, function (error, database) {
        if (error) { console.log("MongoClient Connection Error:", error); throw error; }

        db = database;
    
        console.log("\tCollections:\n");
        Users = db.collection('users');            console.log("\t\t", Users.s.name );
        Objects = db.collection('objects');        console.log("\t\t", Objects.s.name );
        Geometries = db.collection('geometries');  console.log("\t\t", Geometries.s.name );
        Materials = db.collection('materials');    console.log("\t\t", Materials.s.name );
        Textures = db.collection('textures');      console.log("\t\t", Textures.s.name );
        Images = db.collection('images');          console.log("\t\t", Images.s.name );
        Bones = db.collection('bones');            console.log("\t\t", Bones.s.name );
        Files = db.collection('files');            console.log("\t\t", Files.s.name );
        Assets = db.collection('assets');          console.log("\t\t", Assets.s.name );
        Outfits = db.collection('outfits');        console.log("\t\t", Outfits.s.name );
        Avatars = db.collection('avatars');        console.log("\t\t", Avatars.s.name );
        Scenes = db.collection('scenes');          console.log("\t\t", Scenes.s.name );
        Poses = db.collection('poses');            console.log("\t\t", Poses.s.name );
        Animations = db.collection('animations');  console.log("\t\t", Animations.s.name );
        TestCollection = db.collection('test');    console.log("\t\t", TestCollection.s.name );
        Gallery = db.collection('gallery');        console.log("\t\t", Gallery.s.name );
        Snapshots = db.collection('snapshots');    console.log("\t\t", Snapshots.s.name );
        Skyboxes = db.collection('skyboxes');      console.log("\t\t", Skyboxes.s.name );
        Players = db.collection('players');        console.log("\t\t", Players.s.name );
    
        console.log("\n\tMongoClient connected to database", db.databaseName + ".\n");

    });

    return app;

};

