var request = require('supertest');
const  app = require("../index");

describe('Testing for the /users routes', function() {

    it('Should responds 500 to /users/info because no acces', function (done) {
        request(app)
            .get('/users/info?id=1')
            .expect(500, done);
    })  
  
  });
