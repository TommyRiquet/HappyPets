import { render, screen } from '@testing-library/react';
import AnimalCard from './AnimalCard';


describe('Test de rendu du composant <AnimalCard />', () => {
    it('Should render without crash', async () => {
      const FakeAnnonce = {name: "Kevin", age: 10, race:"Ptit Con Maltais", date:"11/07-11/09", master:"Tommy"}

        render(
            <AnimalCard annonce={FakeAnnonce}/>
        )
    })
})


describe("Test des props du composant <AnimalCard/>", () => {

  it('Should display everything correctly', async () => {
    const FakeAnnonce = {name: "Kiwi", age: 10, race:"Ptit Con Maltais", date:"11/07-11/09", master:"Tommy"}
    
    render(
          <AnimalCard annonce={FakeAnnonce}/>
      )
      const propsName = screen.getByTestId("annonce-name")
      const propsAge = screen.getByTestId("annonce-age")
      const propsRace = screen.getByTestId("annonce-race")
      const propsDate = screen.getByTestId("annonce-date")
      const propsMaster = screen.getByTestId("annonce-master")

      expect(propsName.textContent).toBe(FakeAnnonce.name);
      expect(propsAge.textContent).toBe(", "+FakeAnnonce.age);
      expect(propsRace.textContent).toBe(FakeAnnonce.race);
      expect(propsDate.textContent).toBe(FakeAnnonce.date);
      expect(propsMaster.textContent).toBe(FakeAnnonce.master);
  })

  it('Should replace the name with "Inconnu"', async () => {
    const FakeAnnonce = {name: "", age: 10, race:"Ptit Con Maltais", date:"11/07-11/09", master:"Tommy"}
    
    render(
          <AnimalCard annonce={FakeAnnonce}/>
      )
      const propsName = screen.getByTestId("annonce-name")
      expect(propsName.textContent).toBe("Inconnu");
  })

  it('Should not display the Age if its negative 1', async () => {
    const FakeAnnonce = {name: "Kiwi", age: -1, race:"Ptit Con Maltais", date:"11/07-11/09", master:"Tommy"}
    
    render(
          <AnimalCard annonce={FakeAnnonce}/>
      )
      const propsAge = screen.getByTestId("annonce-age")
      expect(propsAge.textContent).toBe("");
  })
  it('Should not display the Age if its negative 2', async () => {
    const FakeAnnonce = {name: "Kiwi", age: -2, race:"Ptit Con Maltais", date:"11/07-11/09", master:"Tommy"}
    
    render(
          <AnimalCard annonce={FakeAnnonce}/>
      )
      const propsAge = screen.getByTestId("annonce-age")
      expect(propsAge.textContent).toBe("");
  })

  it('Should not display the Race', async () => {
    const FakeAnnonce = {name: "Kiwi", age: 10, race:"", date:"11/07-11/09", master:"Tommy"}
    
    render(
          <AnimalCard annonce={FakeAnnonce}/>
      )
      const propsRace = screen.getByTestId("annonce-race")
      expect(propsRace.textContent).toBe("");
  })

  it('Should replace the master name with "Inconnu"', async () => {
    const FakeAnnonce = {name: "Kiwi", age: 10, race:"", date:"11/07-11/09", master:""}
    
    render(
          <AnimalCard annonce={FakeAnnonce}/>
      )
      const propsMaster = screen.getByTestId("annonce-master")
      expect(propsMaster.textContent).toBe("Inconnu");
  })


})
