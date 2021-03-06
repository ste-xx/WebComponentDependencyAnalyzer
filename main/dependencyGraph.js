/**
 * Created by sonste on 14.10.2015.
 */

define([], function () {

    return {
        getGraphFor: function (data) {
            var result = {};
            result.nodes=[];
            result.edges = [];

            data.forEach(function (element) {

                var srcId = element.src.split("\\");
                srcId = srcId[srcId.length - 1];
                if(!result.nodes.some(function(e){return e === srcId})){
                    result.nodes.push(srcId);
                }

                element.dep.forEach(function (depElement) {
                    var depId = depElement.split("\\");
                    depId = depId[depId.length - 1];
                    if(!result.nodes.some(function(e){return e === depId})){
                        result.nodes.push(depId);
                    }
                    if(!result.edges.some(function(e){return e.from === srcId && e.to===depId})){
                        result.edges.push({
                            from:srcId,
                            to:depId
                        });
                    }
                });

            });
            return result;
        }
    };
});
