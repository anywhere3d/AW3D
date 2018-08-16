module.exports = function(app) {

    require(__dirname + "/routes/gallery_insert.js")(app);
    require(__dirname + "/routes/gallery_find.js")(app);
    require(__dirname + "/routes/snapshots_insert.js")(app);   
    require(__dirname + "/routes/snapshots_find.js")(app);
    require(__dirname + "/routes/textures_find.js")(app);
    require(__dirname + "/routes/textures_insert.js")(app);
    require(__dirname + "/routes/textures_update.js")(app);
    require(__dirname + "/routes/outfits_find.js")(app);
    require(__dirname + "/routes/outfits_insert.js")(app);

};
