/**
 * Created by sonste on 14.10.2015.
 */

define(['main/cytoscapeInstance'], function (cytoscape) {


    function addNode(id) {
        cytoscape.add({
            group: 'nodes',
            data: {
                id: id
            }
        });
    }

    function addEdge(from,to){
        cytoscape.add({
            group: "edges",
            data: {
                id: from + to + "Edge",
                source: from,
                target: to,
                directed: true
            }
        })
    }


    return {
        getGraphFor: function (data) {
            data.forEach(function (element) {

                var srcId = element.src.split("\\");
                srcId = srcId[srcId.length - 1];

                addNode(srcId);

                element.dep.forEach(function (depElement) {
                    var depId = depElement.split("\\");
                    depId = depId[depId.length - 1];
                    addNode(depId);
                    addEdge(srcId,depId);
                });

            });
            return cytoscape.json();
        }
    };
});
