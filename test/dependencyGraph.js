var expect = require('chai').expect;
var requirejs = require('requirejs');

describe('dependencyGraph', function () {

    before(function() {
        requirejs.config({
            baseUrl: __dirname + '/..',
            nodeRequire: require,
            map: {
                '*': {
                    'main/cytoscapeInstance': 'test/mocks/cytoscapeInstanceMock'
                }
            }
        });
    });

    describe('getGraphFor', function () {

        it('empty parameter should result into an empty object', function () {
            var fv = requirejs('main/dependencyGraph');
            var result = fv.getGraphFor([]);
            expect(result.nodes).is.eql([]);
            expect(result.edges).is.eql([]);
        });

        it('with dependencies it should create correct nodes and edges', function () {
            var fv = requirejs('main/dependencyGraph');
            var result = fv.getGraphFor([{
                src:'index.html',
                dep:[
                    'dependent.html'
                ]
            }]);
            expect(result.nodes.length).to.equal(2);
            expect(result.nodes).to.contain('index.html','dependent.html');
            expect(result.edges.length).to.equal(1);
            expect(result.edges).to.contain({
                from:'index.html',
                to:'dependent.html'
            });
        });
    });
});
