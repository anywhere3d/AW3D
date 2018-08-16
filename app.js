
var debugMode = true;

var path = require("path");
var http = require("http");
var env = require("node-env-file");                        // @0.1.8
var express = require("express");                          // @4.15.3
var bodyParser = require("body-parser");                   // @1.14.1
var socketClusterServer = require("socketcluster-server"); // @11.2.1
var healthChecker = require("sc-framework-health-check");  // @2.0.0
var scCodecMinBin = require("sc-codec-min-bin");           // @3.0.0
var bodyParser = require("body-parser");                   // @1.14.1
var MongoClient = require("mongodb").MongoClient;          // @2.2.29
var expressHandlebars = require("express-handlebars");     // @3.0.0
var serveStatic = require("serve-static");                 // @1.11.2
var sha256 = require("sha256");                            // @^0.2.0

//  PROSSESS ENV SETUP.
    env("./.env");

//  EXPRESS.
    var app = express();
    var port = process.env.PORT || 8080;

//  MONGODB.
    var dbUser = process.env.DB_URER;
    var dbPass = process.env.DB_PASS;
    var dbHost = process.env.DB_HOST;
    var dbPort = process.env.DB_PORT;
    var dbName = process.env.DB_NAME;
    var dbURL = ["mongodb://", dbUser, ":", dbPass, "@", dbHost, ":", dbPort, "/", dbName].join("");

//  BODY PARSER.
    app.use(bodyParser.json({limit:"100mb"}));
    app.use(bodyParser.urlencoded({
        limit:"100mb",
    //  parameterLimit:1000000
        extended:true
    }));

    app.locals.pretty = true;
    app.set('trust proxy', 'loopback');

//  ROUTES.
    require(__dirname + "/server/routes.js")(app);
    app.use(serveStatic( path.join(__dirname, "public") ));

//  HTTP SERVER.
    var httpServer = http.createServer();

//  Attach express app to httpServer.
    httpServer.on("request", app);

//  SC SERVER.
    var scServer = socketClusterServer.attach(httpServer);
    app.authKey = scServer.options.authKey;

//  SC CODEC.
    scServer.setCodecEngine(scCodecMinBin);

//  SC HANDLERS.
    scServer.on("connection", function (socket, status) {
        debugMode && console.log("status:", status);
    });


//  START HTTP SERVER.

    httpServer.listen(port, function(){

        console.log("\n\tExpress server listening on port", port + ".\n" );

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

    });


