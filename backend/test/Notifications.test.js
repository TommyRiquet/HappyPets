var request = require('supertest');
const  app = require("../index");

describe('Testing for the /notifications routes expect 200', function() {

    it('Should responds 200 to /notifications/annonces', function (done) {
        request(app)
            .get('/notifications/annonces?userid=1')
            .expect(200, done);
    })  
  
    it('Should responds 200 to /notifications/propositions', function (done) {
        request(app)
            .get('/notifications/propositions?userid=1')
            .expect(200, done);
    })  

    it('Should responds 200 to /notifications/checkasked', function (done) {
        request(app)
            .get('/notifications/checkasked')
            .expect(200, done);
    })  

    it('Should responds 200 to /notifications/checkhelp', function (done) {
        request(app)
            .get('/notifications/checkhelp')
            .expect(200, done);
    }) 
  
  });


  describe('Testing for the /notifications routes expect annonces', function() {

    it('Should have AnnonceId to exist in /notifications/annonces', async () => {
        const res = await request(app)
            .get('/notifications/annonces?userid=1')

        console.log(res.body[0][0])
        await expect(Object.keys(res.body[0])[0]).toBe("AnnonceId");


    })  
  
  
  });


  
  describe('Testing for the /notifications routes expect propositions', function() {

    it('Should have propositionId to exist in /notifications/propositions', async () =>{
        const res = await request(app)
            .get('/notifications/propositions?userid=1')

        await expect(Object.keys(res.body[0])[0]).toBe("PropositionId");


    })  
  
  
  });


