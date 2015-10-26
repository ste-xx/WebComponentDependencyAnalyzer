var expect = require('chai').expect;
var requirejs = require('requirejs');

describe('dependencyGraph', function () {

    before(function() {
        requirejs.config({
            baseUrl: __dirname + '/..',
            nodeRequire: require
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

        it('should create only unique nodes', function () {
            var fv = requirejs('main/dependencyGraph');
            var result = fv.getGraphFor([{
                src:'index.html',
                dep:['dependent.html']
            },{ src:'index.html',
                dep:['other.html']
            }]);
            expect(result.nodes.length).to.equal(3);
            expect(result.nodes).to.contain('index.html','dependent.html','other.html');
            expect(result.edges.length).to.equal(2);
            expect(result.edges).to.contain({
                from:'index.html',
                to:'dependent.html'
            });
            expect(result.edges).to.contain({
                from:'index.html',
                to:'other.html'
            });
        });

        it('should create only unique nodes (circular dependency)', function () {
            var fv = requirejs('main/dependencyGraph');
            var result = fv.getGraphFor([{
                src:'index.html',
                dep:['dependent.html']
            },{ src:'dependent.html',
                dep:['index.html']
            }]);
            expect(result.nodes.length).to.equal(2);
            expect(result.nodes).to.contain('index.html','dependent.html');
            expect(result.edges.length).to.equal(2);
            expect(result.edges).to.contain({
                from:'index.html',
                to:'dependent.html'
            });
            expect(result.edges).to.contain({
                from:'dependent.html',
                to:'index.html'
            });
        });

        it('should create only unique edges', function () {
            var fv = requirejs('main/dependencyGraph');
            var result = fv.getGraphFor([{
                src:'index.html',
                dep:['dependent.html']
            },{ src:'index.html',
                dep:['dependent.html']
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
