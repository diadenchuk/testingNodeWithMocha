var assert = require('assert');
var should = require('chai').should();

describe('Basic Mocha', function(){
    it('should deal with objects', function(){
        var obj = {name: 'Jon', gender: 'male'};
        var obj1 = {name: 'Jon', gender: 'male'};

        obj.should.have.property('name').equal('Jon');
        obj.should.deep.equal(obj1);
    });

    it('should work with nulls', function(){
        var obj = null;
        should.not.exist(obj);
    });
});