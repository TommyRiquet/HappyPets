var request = require('supertest');
const  app = require("../index");

describe('Testing for the /pets routes', function() {

    it('Should responds 200 to /pets', function (done) {
        request(app)
            .get('/pets')
            .expect(200, done);
    })  
  
  
  });

  describe('Testing pets info', function() {

    it('Should get the first pet', async() =>{
        const res = await request(app)
            .get('/pets/info/1')
            expect(res.body[0].id).toBe(1);
        
    }) 

    it('Should get an empty array cause no pet', async() =>{
        const res = await request(app)
            .get('/pets/info/-1')
            expect(res.body).toEqual([]);
        
    }) 

    it('Should get an empty array cause no pet ', async() =>{
        const res = await request(app)
            .get('/pets/info/a')
            expect(res.body).toEqual([]);
        
    }) 
});

describe('Testing verify if it has anonnoncement', function() {

    it('Should if pets 1  has an annonce linked', async() =>{
        const res = await request(app)
            .get('/pets/hasAnnonce?id=1')
            expect(res.body).toBe(true);
        
    })
    
    it('Should get false because no pet', async() =>{
        const res = await request(app)
            .get('/pets/hasAnnonce?id=-1')
            expect(res.body).toBe(false);
        
    })

    it('Should get false because no pet', async() =>{
        const res = await request(app)
            .get('/pets/hasAnnonce?id=a')
            expect(res.body).toBe(false);
        
    }) 
});
