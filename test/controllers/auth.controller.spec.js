var assert = require('assert');
var authController = require('../../controllers/auth.controller');
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');
chai.use(chaiAsPromised);
chai.should();

describe('AuthController', function(){
    beforeEach(function(){
        console.log('running before each');
        authController.setRoles(['user']);
    });
    beforeEach(function errorFunc(){
        //throw({error:"error"});
    });
    describe('isAuthorized', function(){

        var user = {};
        
        beforeEach(function(){
            user = {
                roles: ['user'],
                isAuthorized: function (neededRole){
                    return this.roles.indexOf(neededRole) >= 0;
                }
            }

            sinon.spy(user, 'isAuthorized'); // this is needed to be able to call 'calledOnce' on isAuthorized func
            authController.setUser(user);
        });

        //it.only('Should return false if not authorized', function(){
        it('Should return false if not authorized', function(){
            //assert.equal(false, authController.isAuthorized('admin'));
            var isAuth = authController.isAuthorized('admin');
            user.isAuthorized.calledOnce.should.be.true;
            expect(isAuth).to.be.false;
        });

        it('Should return false if not authorized', function(){
            var isAuth = authController.isAuthorized('admin');
            isAuth.should.be.false;
        });

        it('Should return false if not authorized');
    });
    //describe.only('isAuthorizedAsync', function(){
    //describe('isAuthorizedAsync', function(){
    describe.skip('isAuthorizedAsync', function(){
        
        it('Should return false if not authorized1', function(done){
            if(false){
                this.skip();
            }
            
            this.timeout(3000); // don't use arrow functions because of lexical bindings for 'this'
            authController.isAuthorizedAsync('admin', 
            (isAuth) => {
                assert.equal(false, isAuth);
                done();
            });
        });
    });

    describe('isAuthorizedPromise', function(){
        
        it('Should return false if not authorized1', function(){
            this.timeout(3000); // don't use arrow functions because of lexical bindings for 'this'
            return authController.isAuthorizedPromise('admin').should.eventually.be.false;
        });
    });

    describe('getIndex', function(){
        var user = {};
        
        beforeEach(function(){
            user = {
                roles: ['user'],
                isAuthorized: function (neededRole){
                    return this.roles.indexOf(neededRole) >= 0;
                }
            }
        });
        it('should render index if authorized', function(){
            var isAuth = sinon.stub(user, 'isAuthorized').throws();
            //var isAuth = sinon.stub(user, 'isAuthorized').throws();
            let req = {user:user};
            let res = {
                render: sinon.spy()
            };

            authController.getIndex(req, res);
            isAuth.calledOnce.should.be.true;
            res.render.calledOnce.should.be.true;
            //res.render.firstCall.args[0].should.equal('index');
            res.render.firstCall.args[0].should.equal('error');
        });

        it('should render index if authorized with mocks', function(){
            var isAuth = sinon.stub(user, 'isAuthorized').returns(true);
            //var isAuth = sinon.stub(user, 'isAuthorized').throws();
            let req = {user:user};
            let res = {
                render: function(){}
            };
            let mock = sinon.mock(res);
            mock.expects('render').once().withExactArgs('index');

            authController.getIndex(req, res);
            isAuth.calledOnce.should.be.true;
            mock.verify();
        });
    });
});