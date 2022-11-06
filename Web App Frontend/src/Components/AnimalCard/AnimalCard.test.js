import { render, screen } from '@testing-library/react';
import AnimalCard from './AnimalCard';

let FakeAnnonce = {
    "DateBegin": "2022-10-02T12:00:00.000Z",
    "DateEnd": "2022-10-02T12:00:00.000Z",
    "Type": "Promenade",
    "Pets": [
        {
          "Name": "Lola",
          "Type": "Chien",
          "Race": "Normal",
          "Sexe": "F",
          "Weight": 5,
          "Height": "Normal",
          "User": {
            "City": "Wavre"
            }
        }
    ]
}


let FakeAnnonce2 = {
  "DateBegin": "2022-10-02T12:00:00.000Z",
  "DateEnd": "2022-10-02T12:00:00.000Z",
  "Type": "Promenade",
  "Pets": [
      {
        "Name": "Chaussette",
        "Type": "Chat",
        "Race": "Normal",
        "Sexe": "F",
        "Weight": 3,
        "Height": "Normal",
        "User": {
          "City": "Perwez"
          },
        },
        {
        "Name": "Chausette",
        "Type": "Chat",
        "Race": "Européen",
        "Sexe": "M",
        "Weight": 4,
        "Height": "Normal",
        "User": {
          "City": "Perwez"
          },
        }
  ]
}



let FakeAnnonce3 = {
  "DateBegin": "2022-10-02T12:00:00.000Z",
  "DateEnd": "2022-10-02T12:00:00.000Z",
  "Type": "Promenade",
  "Pets": [
      {
        "Name": "Yoda",
        "Type": "Chat",
        "Race": "Exotic",
        "Sexe": "F",
        "Weight": 3,
        "Height": "Normal",
        "User": {
          "City": "Rixensart"
          },
        },
        {
        "Name": "Snape",
        "Type": "Chat",
        "Race": "Exotic",
        "Sexe": "M",
        "Weight": 4,
        "Height": "Normal",
        "User": {
          "City": "Rixensart"
          },
        },
        {
        "Name": "Cheche",
        "Type": "Chat",
        "Race": "Exotic",
        "Sexe": "F",
        "Weight": 5,
        "Height": "Normal",
        "User": {
          "City": "Rixensart"
          }
        }
  ]
}



describe('Component Render for the Component <AnimalCard />', () => {
    it('Should render without crash', async () => {
    
     

        render(
          <AnimalCard annonce={FakeAnnonce} image={"test"}/>
        )
    })
})



describe("Props Test for a single pet for the component <AnimalCard/>", () => {

  it('Should display everything correctly', async () => {

    
    render(
        <AnimalCard annonce={FakeAnnonce} image={"test"}/>
      )
      
      const propsPetName = screen.getByTestId("annonce-pets-name0")
      const propsPetWeight = screen.getByTestId("annonce-pets-weight0")
      const propsPetHeight = screen.getByTestId("annonce-pets-height0")
      const propsPetSexe = screen.getByTestId("annonce-pets-sexe0")

      const propsAnnonceDate = screen.getByTestId("annonce-date")
      const propsAnnonceType = screen.getByTestId("annonce-type")

      expect(propsPetName.textContent).toBe(FakeAnnonce.Pets[0].Name);
      expect(propsPetWeight.textContent).toBe(", "+FakeAnnonce.Pets[0].Weight+"kg");
      expect(propsPetHeight.textContent).toBe(" "+FakeAnnonce.Pets[0].Height);
      expect(propsPetSexe).toHaveAttribute('alt','F-icon');

      expect(propsAnnonceDate.textContent).toBe(FakeAnnonce.DateBegin.slice(5,10).replace("-","/")+ ">"+FakeAnnonce.DateEnd.slice(5,10).replace("-","/"));
      expect(propsAnnonceType.textContent).toBe(FakeAnnonce.Type);
  })



  it('Should replace the name with "Inconnu"', async () => {
    
    FakeAnnonce.Pets[0].Name ="" 

    render(
        <AnimalCard annonce={FakeAnnonce} image={"test"}/>
      )
      const propsName = screen.getByTestId("annonce-pets-name0")
      expect(propsName.textContent).toBe("Inconnu");
  })


  
  it('Should Not display the weight', async () => {
    
    FakeAnnonce.Pets[0].Weight =null


    render(
        <AnimalCard annonce={FakeAnnonce} image={"test"}/>
      )
      const propsPetWeight = screen.getByTestId("annonce-pets-weight0")
      expect(propsPetWeight.textContent).toBe(" ");
  })
  



  
  it('Should display the male sexe icon', async () => {

    FakeAnnonce.Pets[0].Sexe = "M"
   

    render(
          <AnimalCard annonce={FakeAnnonce} image={"test"}/>
      )
      const propsPetSexe = screen.getByTestId("annonce-pets-sexe0")
      expect(propsPetSexe).toHaveAttribute('alt','M-icon');
  })


  it('Should display the female sexe icon', async () => {

    FakeAnnonce.Pets[0].Sexe = 'F'



    render(
          <AnimalCard annonce={FakeAnnonce} image={"test"}/>
      )
      const propsPetSexe = screen.getByTestId("annonce-pets-sexe0")
      expect(propsPetSexe).toHaveAttribute('alt','F-icon');
  })




  it('Should replace the user city with null', async () => {

    FakeAnnonce.Pets[0].User.City = ""



    render(
          <AnimalCard annonce={FakeAnnonce} image={"test"}/>
      )
      const propsAnnonceUser = screen.getByTestId("annonce-user-city")
      expect(propsAnnonceUser.textContent).toBe("");
  })



  it('Should replace the type with null', async () => {

    FakeAnnonce.Type = ""

    render(
          <AnimalCard annonce={FakeAnnonce} image={"test"}/>
      )
      const propsAnnonceType = screen.getByTestId("annonce-type")
      expect(propsAnnonceType.textContent).toBe("");
  })

})





describe("Props Test for 2 pets for the component <AnimalCard/>", () => {
  
  it('Should display everything correctly', async () => {

    
    render(
        <AnimalCard annonce={FakeAnnonce2} image={"test"}/>
      )
      
      /*Pet 1*/
      const propsPet1Name = screen.getByTestId("annonce-pets-name0")
      const propsPet1Weight = screen.getByTestId("annonce-pets-weight0")
      const propsPet1Height = screen.getByTestId("annonce-pets-height0")
      const propsPet1Sexe = screen.getByTestId("annonce-pets-sexe0")

      expect(propsPet1Name.textContent).toBe(FakeAnnonce2.Pets[0].Name);
      expect(propsPet1Weight.textContent).toBe(", "+FakeAnnonce2.Pets[0].Weight+"kg");
      expect(propsPet1Height.textContent).toBe(" "+FakeAnnonce2.Pets[0].Height);
      expect(propsPet1Sexe).toHaveAttribute('alt','F-icon');

      /*Pet 2*/
      const propsPet2Name = screen.getByTestId("annonce-pets-name1")
      const propsPet2Weight = screen.getByTestId("annonce-pets-weight1")
      const propsPet2Height = screen.getByTestId("annonce-pets-height1")
      const propsPet2Sexe = screen.getByTestId("annonce-pets-sexe1")

      expect(propsPet2Name.textContent).toBe(FakeAnnonce2.Pets[1].Name);
      expect(propsPet2Weight.textContent).toBe(", "+FakeAnnonce2.Pets[1].Weight+"kg");
      expect(propsPet2Height.textContent).toBe(" "+FakeAnnonce2.Pets[1].Height);
      expect(propsPet2Sexe).toHaveAttribute('alt','M-icon');
      
      /*User*/
      const propsAnnonceDate = screen.getByTestId("annonce-date")

      expect(propsAnnonceDate.textContent).toBe(FakeAnnonce2.DateBegin.slice(5,10).replace("-","/")+ ">"+FakeAnnonce2.DateEnd.slice(5,10).replace("-","/"));
    })

}) 











describe("Props Test for 3 pets for the component <AnimalCard/>", () => {
  
  it('Should display everything correctly', async () => {

    
    render(
        <AnimalCard annonce={FakeAnnonce3} image={"test"}/>
      )
      
      /*Pet 1*/
      const propsPet1Name = screen.getByTestId("annonce-pets-name0")
      const propsPet1Weight = screen.getByTestId("annonce-pets-weight0")
      const propsPet1Height = screen.getByTestId("annonce-pets-height0")
      const propsPet1Sexe = screen.getByTestId("annonce-pets-sexe0")

      expect(propsPet1Name.textContent).toBe(FakeAnnonce3.Pets[0].Name);
      expect(propsPet1Weight.textContent).toBe(", "+FakeAnnonce3.Pets[0].Weight+"kg");
      expect(propsPet1Height.textContent).toBe(" "+FakeAnnonce3.Pets[0].Height);
      expect(propsPet1Sexe).toHaveAttribute('alt','F-icon');

      /*Pet 2*/
      const propsPet2Name = screen.getByTestId("annonce-pets-name1")
      const propsPet2Weight = screen.getByTestId("annonce-pets-weight1")
      const propsPet2Height = screen.getByTestId("annonce-pets-height1")
      const propsPet2Sexe = screen.getByTestId("annonce-pets-sexe1")

      expect(propsPet2Name.textContent).toBe(FakeAnnonce3.Pets[1].Name);
      expect(propsPet2Weight.textContent).toBe(", "+FakeAnnonce3.Pets[1].Weight+"kg");
      expect(propsPet2Height.textContent).toBe(" "+FakeAnnonce3.Pets[1].Height);
      expect(propsPet2Sexe).toHaveAttribute('alt','M-icon');
      
      /*Pet 3*/
      const propsPet3Name = screen.getByTestId("annonce-pets-name2")
      const propsPet3Weight = screen.getByTestId("annonce-pets-weight2")
      const propsPet3Height = screen.getByTestId("annonce-pets-height2")
      const propsPet3Sexe = screen.getByTestId("annonce-pets-sexe2")

      expect(propsPet3Name.textContent).toBe(FakeAnnonce3.Pets[2].Name);
      expect(propsPet3Weight.textContent).toBe(", "+FakeAnnonce3.Pets[2].Weight+"kg");
      expect(propsPet3Height.textContent).toBe(" "+FakeAnnonce3.Pets[2].Height);
      expect(propsPet3Sexe).toHaveAttribute('alt','F-icon');
            



      /*User*/
      const propsAnnonceDate = screen.getByTestId("annonce-date")

      expect(propsAnnonceDate.textContent).toBe(FakeAnnonce3.DateBegin.slice(5,10).replace("-","/")+ ">"+FakeAnnonce3.DateEnd.slice(5,10).replace("-","/"));
    })

}) 