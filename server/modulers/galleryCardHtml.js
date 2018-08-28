//  server/modules/galleryCardHtml.js

module.exports = function(data){

    return [
        '<div class="card thumbnail gallery-card">',
            '<img class="card-img-top" src="https://i.imgur.com/', data.id, 'm.jpg" alt="', data.title, '">',
            '<div class="card-body">',
                '<h4 class="card-title">', data.title, '</h4>',
            '</div>',
        '</div>'
    ].join("");

};
