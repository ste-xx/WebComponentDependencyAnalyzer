'use strict';

define(['visitor','./dependencyGraph'], function (visitor,dependencyGraph) {
    return {
      calculateDependenciesFor : function(pathToFile, resultCallback){
          if(typeof resultCallback !== 'function'){
              resultCallback = function () {
              };
          }

          visitor.visit(pathToFile, function(visitorResult){
              resultCallback(dependencyGraph.getGraphFor(visitorResult));
          });
      }
    };

});