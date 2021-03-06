var expect = require('chai').expect;
var requirejs = require('requirejs');


describe('fileVisitor', function () {

    before(function() {
        requirejs.config({
            nodeRequire: require,
            baseUrl: __dirname + '/..',
            app: '../main'
        });
    });

    describe('visit', function () {

        it('should return the correct dependencies even it is called twice', function (done) {
            var fv = requirejs('main/fileVisitor');
            var finCounter=0;
            var fin = function(){
                ++finCounter;
                return (finCounter==2) ? done() : {};
            };

            var expectedResult = [{
                src:__dirname+'\\html\\inner\\child2.html',
                dep:[
                    __dirname+'\\html\\parent.html',
                    __dirname+'\\html\\parent2.html'
                ]
            },{
                src:__dirname+'\\html\\parent.html',
                dep:[
                    __dirname+'\\html\\sibling.html',
                ]
            }
            ];
            var call = function(result){
                expect(result.length).to.equal(2);
                expect(result[0]).to.deep.equal(expectedResult[0]);
                expect(result[1]).to.deep.equal(expectedResult[1]);
                fin();
            };
            fv.visit(__dirname+'\\html\\inner\\child2.html',call);
            fv.visit(__dirname+'\\html\\inner\\child2.html',call);
        });

        it('should return an empty result if file does not exist', function (done) {
            var fv = requirejs('main/fileVisitor');

            var call = function(result){
                expect(result.length).to.equal(0);
                done();
            };
            fv.visit(__dirname+'\\html\\inner\\child2asdfasdfasdfafsdf.html',call);
        });
    });
});