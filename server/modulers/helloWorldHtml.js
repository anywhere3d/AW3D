//  helloWorldHtml.js

module.exports = function( title, h2Title, text, href, hrefText ){

    var title = title || "";
    var h2Title = h2Title || "";
    var text =  text || "";
    var href = href || "#";
    var hrefText = hrefText || "";

    return [
        '<html><head><title>' + title + '</title>',
        '<style> * {font-family: Arial, sans-serif;',
        'font-weight:normal;text-align:center;',
        'background:#ffffff;overflow:hidden;}',
        ' .middle > * {position:absolute;height:',
        'fit-content;max-width:500px;top:0;',
        'bottom:0;left:0; right:0;margin:auto;}',
        ' a {text-decoration:none;}',
        ' p {width:95%;}</style>',
        '</head><body><section class="middle">',
        '<div><h2>' + h2Title + '</h2>',
        '<p>' + text + '</p>',
        '<a href="' + href + '>' + hrefText + '</a>',
        '</div></section></body></html>'
    ].join("");

};
