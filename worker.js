var path = require("path");
var morgan = require("morgan");
var SCWorker = require("socketcluster/scworker");
var scCodecMinBin = require("sc-codec-min-bin");
var healthChecker = require("sc-framework-health-check");

class Worker extends SCWorker {

    run() {

        console.log("   >> Worker PID:", process.pid);
        var environment = this.options.environment;

    //  EXPRESS ROUTES.
        var app = require(__dirname + "/server/routes.js")();

    //  SC SERVER.
        var scServer = this.scServer;

    //  HTTP SERVER.
        var httpServer = this.httpServer;

    //  SC CODEC.
    //  scServer.setCodecEngine(scCodecMinBin);

    //  Add GET /health-check express route.
        healthChecker.attach(this, app);

    //  Attach express app to httpServer.
        httpServer.on("request", app);

        var count = 0;

    //  In here we handle our incoming realtime connections and listen for events.

        scServer.on("connection", function (socket) {

        //  require(__dirname + "/server/sockets.js")(socket);

        //  Some sample logic to show how to handle 
        //  client events (replace this with your own logic).
            socket.on("sampleClientEvent", function (data) {
                console.log("Handled sampleClientEvent:", data);
                scServer.exchange.publish("sample", ++count);
            });
            
            socket.on("disconnect", function () {
            // Add your disconnect code here. //
            });

        });

    }

}

new Worker();
