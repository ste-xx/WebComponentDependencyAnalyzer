'use strict';

define(['./htmlImportParser', 'fs', 'path'], function (htmlImportParser, fs, path) {

        function getDependenciesFor(entryPoint, callback) {
            var entryDir = path.dirname(entryPoint);
            fs.readFile(entryPoint, function (err, data) {
                if (err) {
                    throw err;
                }
                htmlImportParser.parse(data.toString(), function (founded) {
                    var result = [];
                    var x = '';
                    founded.forEach(function (importPath) {
                        result.push(path.resolve(entryDir, importPath));
                    });
                    callback(result);
                });
            });
        }


        function recursiveFileWalker(entryPoint, arr, callback) {
            var deep = 1;
            var walker = (function (entryPoint, arr, callback) {
                getDependenciesFor(entryPoint, function (results) {
                    --deep;
                    if (results.length === 0) {
                        if (deep === 0) {
                            callback(arr);
                        }
                        return;
                    }
                    arr.push({
                        src:entryPoint,
                        dep:results
                    });
                    results.forEach(function (entry) {
                        ++deep;
                        walker(entry, arr, callback);
                    }.bind(this));
                }.bind(this));
            });
            walker(entryPoint, arr, callback);
        }


        return {
            visit: function (entryPoint, callback) {
                if (typeof callback !== 'function') {
                    callback = function () {
                    };
                }
                if(!fs.existsSync(entryPoint)){
                    console.warn(entryPoint+" does not exist");
                    callback([]);
                    return;
                }

                recursiveFileWalker(entryPoint, [], function (arr) {
                    callback(arr);
                });

            }
        }
    }
);