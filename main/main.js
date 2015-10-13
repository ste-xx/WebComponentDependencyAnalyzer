'use strict';

define(['visitor'], function (visitor) {
    return {
      calculateDependenciesFor : function(pathToFile, resultCallback){
          visitor.visit(pathToFile, resultCallback);
      }
    };

});