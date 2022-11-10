var request = require('supertest');
const  app = require("../index");

describe('Testing for the /propositions routes', function() {

    it('Should responds 200 to /propositions', function (done) {
        request(app)
            .get('/propositions?offset=0')
            .expect(200, done);
    })
  
  
  });
