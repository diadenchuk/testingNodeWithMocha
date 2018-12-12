var assert = require('assert');
var authController = require('../../controllers/auth.controller');
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
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
        //it.only('Should return false if not authorized', function(){
        it('Should return false if not authorized', function(){
            //assert.equal(false, authController.isAuthorized('admin'));
            var isAuth = authController.isAuthorized('admin');
            expect(isAuth).to.be.false;
        });

        it('Should return false if not authorized', function(){
            authController.setRoles(['user', 'admin']);
            var isAuth = authController.isAuthorized('admin');
            isAuth.should.be.true;
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
});