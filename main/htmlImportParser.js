'use strict';
define(['htmlparser2'],function (htmlparser) {
    return {
        parse: function (html,callback) {
            if(typeof callback !== 'function'){
                callback = function(){};
            }

            var founded = [];
            var parser = new htmlparser.Parser({
                onopentag: function(name, attribs){
                    if(name === "link" && attribs.rel==='import'){
                        founded.push(attribs.href);
                    }
                }
            }, {decodeEntities: true});
            parser.write(html);
            parser.end();
            callback(founded);
        }
    };
});