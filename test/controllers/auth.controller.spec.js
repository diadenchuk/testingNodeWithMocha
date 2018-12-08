var assert = require('assert');
var authController = require('../../controllers/auth.controller');

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
            assert.equal(false, authController.isAuthorized('admin'));
        });

        it('Should return false if not authorized', function(){
            authController.setRoles(['user', 'admin']);
            assert.equal(true, authController.isAuthorized('admin'));
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
});