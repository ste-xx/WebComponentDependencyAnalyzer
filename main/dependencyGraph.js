/**
 * Created by sonste on 14.10.2015.
 */

define(['cytoscape'], function (cytoscape) {

    return {
        getGraphFor: function (data) {
            var cy = cytoscape({});
            console.log(data);
            var eles = cy.add([
                { group: "nodes", data: { id: "n0" } },
                { group: "nodes", data: { id: "n1" } },
                { group: "edges", data: { id: "e0", source: "n0", target: "n1" } }
            ]);


          return  cy.json();
        }
    };
});
