var request = require('supertest');
const  app = require("../index");

describe('Testing for the /admin routes', function() {

    it('Should responds 200 to /admin', function (done) {
        request(app)
            .get('/admin')
            .expect(200, done);
    })  
  
  });

  describe('Testing for the limit queryString of /admin', function() {

    it('Should get default amount of data (default=20)', async() =>{
        const res = await request(app)
            .get('/admin')
    
        expect(res.body.length).toBe(20);
    }) 
    
    it('Should get 10 data', async() =>{
        const res = await request(app)
            .get('/admin?limit=10')
    
        expect(res.body.length).toBe(10);
    }) 

    it('Should return an empty array when negative one', async() =>{
        const res = await request(app)
            .get('/admin?limit=-1')
    
        expect(res.body.length).toBe(0);
    }) 

    it('Should return an empty array when alphabetic', async() =>{
        const res = await request(app)
            .get('/admin?limit=a')
    
        expect(res.body.length).toBe(0);
    }) 
  
  });

  describe('Testing for the type Annonce queryString of /admin', function() {

    it('Should only get alert type Annonce', async() =>{
        const res = await request(app)
            .get('/admin/findtype?type=alertAnnonce')
        
        for(i in res.body){
                expect(res.body[i].Type).toBe("alertAnnonce");
        }
    }) 

    it('Should only get alert type Avis', async() =>{
        const res = await request(app)
            .get('/admin/findtype?type=alertAvis')
        
        for(i in res.body){
                expect(res.body[i].Type).toBe("alertAvis");
        }
    }) 

    it('Should only get alert type User', async() =>{
        const res = await request(app)
            .get('/admin/findtype?type=alertUser')
        
        for(i in res.body){
                expect(res.body[i].Type).toBe("alertUser");
        }
    }) 
  });





