var request = require('supertest');
const  app = require("../index");



describe('Testing for the /annonces routes', function() {

    it('Should responds 200 to /annonces', function (done) {
        request(app)
            .get('/annonces')
            .expect(200, done);
    })  
  
  });




  describe('Testing for the limit queryString of /annonces', function() {

    it('Should get default amount of data (default=20)', async() =>{
        const res = await request(app)
            .get('/annonces')
    
        expect(res.body.length).toBe(20);
    }) 
    
    it('Should get 10 data', async() =>{
        const res = await request(app)
            .get('/annonces?limit=10')
    
        expect(res.body.length).toBe(10);
    }) 

    it('Should return an empty array when negative one', async() =>{
        const res = await request(app)
            .get('/annonces?limit=-1')
    
        expect(res.body.length).toBe(0);
    }) 

    it('Should return an empty array when alphabetic', async() =>{
        const res = await request(app)
            .get('/annonces?limit=a')
    
        expect(res.body.length).toBe(0);
    }) 
  
  });




  describe('Testing for the typePet queryString of /annonces', function() {

    it('Should only get Dogs', async() =>{
        const res = await request(app)
            .get('/annonces?typePet=Chien')
        
        for(i in res.body){
            for (pets in res.body[i].Pets){
                expect(res.body[i].Pets[pets].Type).toBe("Chien");
            }
        }
    }) 

    it('Should only get Cats', async() =>{
        const res = await request(app)
            .get('/annonces?typePet=Chats')
        
        for(i in res.body){
            for (pets in res.body[i].Pets){
                expect(res.body[i].Pets[0].Type).toBe("Chats");
            }
        }
    }) 

    it('Should only get Rodents', async() =>{
        const res = await request(app)
            .get('/annonces?typePet=Rongeur')
        
        for(i in res.body){
            for (pets in res.body[i].Pets){
                expect(res.body[i].Pets[0].Type).toBe("Rongeur");
            }
        }
    }) 

    it('Should only get Birds', async() =>{
        const res = await request(app)
            .get('/annonces?typePet=Oiseau')
        
        for(i in res.body){
            for (pets in res.body[i].Pets){
                expect(res.body[i].Pets[0].Type).toBe("Oiseau");
            }
        }
    }) 

    it('Should only get Fishes', async() =>{
        const res = await request(app)
            .get('/annonces?typePet=Poisson')
        
        for(i in res.body){
            for (pets in res.body[i].Pets){
                expect(res.body[i].Pets[0].Type).toBe("Poisson");
            }
        }
    }) 

    it('Should only get NAC', async() =>{
        const res = await request(app)
            .get('/annonces?typePet=NAC')
        
        for(i in res.body){
            for (pets in res.body[i].Pets){
                expect(res.body[i].Pets[0].Type).toBe("NAC");
            }
        }
    }) 

    it('Should not find anything', async() =>{
        const res = await request(app)
            .get('/annonces?typePet=NotExisting')
        
        expect(res.body.length).toBe(0);

    }) 

    it('Should find everything', async() =>{
        const res = await request(app)
            .get('/annonces')
        
        for(i in res.body){
            for (pets in res.body[i].Pets){
                expect(res.body[i].Pets[0].Type).toMatch(/Chien|Chat|Rongeur|Oiseau|Poisson|NAC/);
            }
        }
    }) 
    
  
  });



  describe('Testing for the typeAnnonce queryString of /annonces', function() {

    it('Should only get Walks', async() =>{
        const res = await request(app)
            .get('/annonces?typeAnnonce=Promenade')
        
        for(i in res.body){
            expect(res.body[i].Type).toBe("Promenade");
        }
    }) 

    it('Should only get housing', async() =>{
        const res = await request(app)
            .get('/annonces?typeAnnonce=Logement')
        
        for(i in res.body){
            expect(res.body[i].Type).toBe("Logement");
        }
    }) 

    it('Should only get Home Care', async() =>{
        const res = await request(app)
            .get('/annonces?typeAnnonce=Garde%20à%20domicile')
        
        for(i in res.body){
            expect(res.body[i].Type).toBe("Garde à domicile");
        }
    }) 

    it('Should not find anything', async() =>{
        const res = await request(app)
            .get('/annonces?typeAnnonce=NotExisting')
        
        expect(res.body.length).toBe(0);

    }) 
    
  
  });


  describe('Testing for the DogFriendly queryString of /annonces', function() {

    it('Should only get DogFriendly', async() =>{
        const res = await request(app)
            .get('/annonces?DogFriendly=true')
        
        for(i in res.body){
            for (pets in res.body[i].Pets){
                expect(res.body[i].Pets[pets].DogFriendly).toBe(true);
            }
        }
    }) 
  
  });

  describe('Testing for the CatFriendly queryString of /annonces', function() {

    it('Should only get CatFriendly', async() =>{
        const res = await request(app)
            .get('/annonces?CatFriendly=true')
        
        for(i in res.body){
            for (pets in res.body[i].Pets){
                expect(res.body[i].Pets[pets].CatFriendly).toBe(true);
            }
        }
    }) 
  
  });

  describe('Testing for the KidFriendly queryString of /annonces', function() {

    it('Should only get KidFriendly', async() =>{
        const res = await request(app)
            .get('/annonces?KidFriendly=true')
        
        for(i in res.body){
            for (pets in res.body[i].Pets){
                expect(res.body[i].Pets[pets].KidFriendly).toBe(true);
            }
        }
    }) 
  
  });
