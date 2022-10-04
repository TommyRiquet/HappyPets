import { render, screen } from '@testing-library/react';
import AnimalCard from './AnimalCard';


describe('Component Render for the Component <AnimalCard />', () => {
    it('Should render without crash', async () => {
    
      const FakeAnnonce = {
        "DateBegin": "2022-10-02T12:00:00.000Z",
        "DateEnd": "2022-10-02T12:00:00.000Z",
        "Pets": [
            {
                "Name": "Lola",
                "Type": "Chien",
                "Race": "Jack Russel",
                "Age": "15",
                "User": {
                    "Firstname": "Kevin"
                },
                "PetsAnnonces": {
                    "createdAt": "2022-10-02T12:00:00.000Z",
                    "updatedAt": "2022-10-02T12:00:00.000Z",
                    "AnnonceId": 1,
                    "PetId": 1
                }
            }
        ]
    }

        render(
          <AnimalCard annonce={FakeAnnonce} image={"test"}/>
        )
    })
})



describe("Props Test for a single pet for the component <AnimalCard/>", () => {

  it('Should display everything correctly', async () => {
    
    const FakeAnnonce = {
      "DateBegin": "2022-10-02T12:00:00.000Z",
      "DateEnd": "2022-10-02T12:00:00.000Z",
      "Pets": [
          {
              "Name": "Lola",
              "Type": "Chien",
              "Race": "Jack Russel",
              "Age": "15",
              "Weight": "Petit,2kg",
              "User": {
                  "Firstname": "Kevin"
              },
              "PetsAnnonces": {
                  "createdAt": "2022-10-02T12:00:00.000Z",
                  "updatedAt": "2022-10-02T12:00:00.000Z",
                  "AnnonceId": 1,
                  "PetId": 1
              }
          }
      ]
  }

    
    render(
        <AnimalCard annonce={FakeAnnonce} image={"test"}/>
      )
      const propsPetName = screen.getByTestId("annonce-name0")
      const propsPetWeight = screen.getByTestId("annonce-pets-weight0")
      const propsPetAge = screen.getByTestId("annonce-age0")
      const propsAnnonceDate = screen.getByTestId("annonce-date")
      const propsAnnonceUser = screen.getByTestId("annonce-user-firstname")

      expect(propsPetName.textContent).toBe(FakeAnnonce.Pets[0].Name);
      expect(propsPetWeight.textContent).toBe(FakeAnnonce.Pets[0].Weight);
      expect(propsPetAge.textContent).toBe(", "+FakeAnnonce.Pets[0].Age);
      expect(propsAnnonceDate.textContent).toBe(FakeAnnonce.DateBegin.slice(5,10).replace("-","/")+ ">"+FakeAnnonce.DateEnd.slice(5,10).replace("-","/"));
      expect(propsAnnonceUser.textContent).toBe(FakeAnnonce.Pets[0].User.Firstname);
  })



  it('Should replace the name with "Inconnu"', async () => {
    
    const FakeAnnonce = {
      "DateBegin": "2022-10-02T12:00:00.000Z",
      "DateEnd": "2022-10-02T12:00:00.000Z",
      "Pets": [
          {
              "Name": "",
              "Type": "Chien",
              "Race": "Jack Russel",
              "Age": "15",
              "Weight": "3",
              "User": {
                  "Firstname": "Kevin"
              },
              "PetsAnnonces": {
                  "createdAt": "2022-10-02T12:00:00.000Z",
                  "updatedAt": "2022-10-02T12:00:00.000Z",
                  "AnnonceId": 1,
                  "PetId": 1
              }
          }
      ]
  }  

    render(
        <AnimalCard annonce={FakeAnnonce} image={"test"}/>
      )
      const propsName = screen.getByTestId("annonce-name0")
      expect(propsName.textContent).toBe("Inconnu");
  })


  
  it('Should Not display the weight', async () => {
    
    const FakeAnnonce = {
      "DateBegin": "2022-10-02T12:00:00.000Z",
      "DateEnd": "2022-10-02T12:00:00.000Z",
      "Pets": [
          {
              "Name": "Lola",
              "Type": "Chien",
              "Race": "Jack Russel",
              "Age": "15",
              "Weight": "",
              "User": {
                  "Firstname": "Kevin"
              },
              "PetsAnnonces": {
                  "createdAt": "2022-10-02T12:00:00.000Z",
                  "updatedAt": "2022-10-02T12:00:00.000Z",
                  "AnnonceId": 1,
                  "PetId": 1
              }
          }
      ]
  }  

    render(
        <AnimalCard annonce={FakeAnnonce} image={"test"}/>
      )
      const propsPetWeight = screen.getByTestId("annonce-pets-weight0")
      expect(propsPetWeight.textContent).toBe("Petit,2kg");
  })



  it('Should not display the Age if its negative 1', async () => {
    const FakeAnnonce = {
      "DateBegin": "2022-10-02T12:00:00.000Z",
      "DateEnd": "2022-10-02T12:00:00.000Z",
      "Pets": [
          {
              "Name": "Lola",
              "Type": "Chien",
              "Race": "Jack Russel",
              "Age": "-1",
              "Weight": "3",
              "User": {
                  "Firstname": "Kevin"
              },
              "PetsAnnonces": {
                  "createdAt": "2022-10-02T12:00:00.000Z",
                  "updatedAt": "2022-10-02T12:00:00.000Z",
                  "AnnonceId": 1,
                  "PetId": 1
              }
          }
      ]
  }     

    render(
        <AnimalCard annonce={FakeAnnonce} image={"test"}/>
      )
      const propsAge = screen.getByTestId("annonce-age0")
      expect(propsAge.textContent).toBe("");
  })


  it('Should replace the user name with "Inconnu"', async () => {

    const FakeAnnonce = {
      "DateBegin": "2022-10-02T12:00:00.000Z",
      "DateEnd": "2022-10-02T12:00:00.000Z",
      "Pets": [
          {
              "Name": "Lola",
              "Type": "Chien",
              "Race": "Jack Russel",
              "Age": "15",
              "Weight": "3",
              "User": {
                  "Firstname": ""
              },
              "PetsAnnonces": {
                  "createdAt": "2022-10-02T12:00:00.000Z",
                  "updatedAt": "2022-10-02T12:00:00.000Z",
                  "AnnonceId": 1,
                  "PetId": 1
              }
          }
      ]
  }     

    render(
          <AnimalCard annonce={FakeAnnonce} image={"test"}/>
      )
      const propsAnnonceUser = screen.getByTestId("annonce-user-firstname")
      expect(propsAnnonceUser.textContent).toBe("Inconnu");
  })


})
