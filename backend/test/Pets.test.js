var request = require('supertest');
const  app = require("../index");

describe('Testing for the /pets routes', function() {

    it('Should responds 200 to /pets', function (done) {
        request(app)
            .get('/pets')
            .expect(200, done);
    })  
  
  
  });
