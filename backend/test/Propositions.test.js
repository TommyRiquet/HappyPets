var request = require('supertest');
const  app = require("../index");

describe('Testing for the /propositions routes', function() {

    it('Should responds 200 to /propositions', function (done) {
        request(app)
            .get('/propositions?offset=0')
            .expect(200, done);
    })
  
  
  });

describe('Testing the querystring of /proposition', function(){
    it('should get 6 data', async() =>{
        const res = await request(app)
            .get('/propositions?limit=6')
        expect(res.body.length).toBe(6);
    })
    it('should return empty when array is not numeric', async() =>{
        const res = await request(app)
            .get('/propositions?limit=x')
        expect(res.body.length).toBe(0);
    })
    it('should return empty when array is not negativ', async() =>{
        const res = await request(app)
            .get('/propositions?limit=-2')
        expect(res.body.length).toBe(0);
    })
})

describe('Testing for the typeAnimalProposition queryString of /propositions', function() {

    it('Should only get Dogs', async() =>{
        const res = await request(app)
            .get('/propositions?typeAnimalProposition=Chien')
        
        for(i in res.body){
            for (pets in res.body[i].Pets){
                expect(res.body[i].Pets[pets].Type).toBe("Chien");
            }
        }
    }) 

    it('Should only get Cats', async() =>{
        const res = await request(app)
            .get('/propositions?typeAnimalProposition=Chats')
        
        for(i in res.body){
            for (pets in res.body[i].Pets){
                expect(res.body[i].Pets[0].Type).toBe("Chats");
            }
        }
    }) 

    it('Should only get Rodents', async() =>{
        const res = await request(app)
            .get('/propositions?typeAnimalProposition=Rongeur')
        
        for(i in res.body){
            for (pets in res.body[i].Pets){
                expect(res.body[i].Pets[0].Type).toBe("Rongeur");
            }
        }
    }) 

    it('Should only get Birds', async() =>{
        const res = await request(app)
            .get('/propositions?typeAnimalProposition=Oiseau')
        
        for(i in res.body){
            for (pets in res.body[i].Pets){
                expect(res.body[i].Pets[0].Type).toBe("Oiseau");
            }
        }
    }) 

    it('Should only get Fishes', async() =>{
        const res = await request(app)
            .get('/propositions?typeAnimalProposition=Poisson')
        
        for(i in res.body){
            for (pets in res.body[i].Pets){
                expect(res.body[i].Pets[0].Type).toBe("Poisson");
            }
        }
    }) 

    it('Should only get NAC', async() =>{
        const res = await request(app)
            .get('/propositions?typeAnimalProposition=NAC')
        
        for(i in res.body){
            for (pets in res.body[i].Pets){
                expect(res.body[i].Pets[0].Type).toBe("NAC");
            }
        }
    }) 

    it('Should find everything', async() =>{
        const res = await request(app)
            .get('/propositions')
        
        for(i in res.body){
            for (pets in res.body[i].Pets){
                expect(res.body[i].Pets[0].Type).toMatch(/Chien|Chat|Rongeur|Oiseau|Poisson|NAC/);
            }
        }
    }) 
    
  });

  describe('Testing for the typeProposition queryString of /propositions', function() {

    it('Should only get Walks', async() =>{
        const res = await request(app)
            .get('/propositions?typeProposition=Promenade')

        for(i in res.body){
            expect(res.body[i].Type).toBe("Promenade");
        }
            

    }) 

    it('Should only get housing', async() =>{
        const res = await request(app)
            .get('/propositions?typeProposition=Logement')

        for(i in res.body){
            expect(res.body[i].Type).toBe("Logement");
            }
    }) 

    it('Should only get Home Care', async() =>{
        const res = await request(app)
            .get('/propositions?typeProposition=Soins%20à%20domicile')

        for(i in res.body){
            expect(res.body[i].Type).toBe("Soins à domicile");
        }

    }) 

    it('Should only get Home Care(keep)', async() =>{
        const res = await request(app)
            .get('/propositions?typeProposition=Garde%20à%20domicile')

        for(i in res.body){
            expect(res.body[i].Type).toBe("Garde à domicile");
        }

    }) 
  
  });