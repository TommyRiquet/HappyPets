var request = require('supertest');
const  app = require("../index");

describe('Testing for the /users routes', function() {

    it('Should responds 200 to /users/info', function (done) {
        request(app)
            .get('/users/info?id=1')
            .expect(200, done);
    })  
  
  });
