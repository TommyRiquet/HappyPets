import { render, screen } from '@testing-library/react';
import AnimalCard from './AnimalCard';


describe('Test de rendu du composant <AnimalCard />', () => {
    it('Should render without crash', async () => {
      const FakeAnnonce = {
        "DateBegin": "2022-10-01T21:00:00.000Z",
        "DateEnd": "2022-10-01T21:00:00.000Z",
        "Pets": [
        {
        "Name": "Kiwi",
        "Type": "Chien",
        "Race": "Bichon Maltais",
        "Age": "2",
        "User": {
        "Firstname": "Quentin"
        }}]}

        render(
            <AnimalCard annonce={FakeAnnonce}/>
        )
    })
})



describe("Test des props du composant <AnimalCard/>", () => {

  it('Should display everything correctly', async () => {
    const FakeAnnonce = {
      "DateBegin": "2022-10-01T21:00:00.000Z",
      "DateEnd": "2022-10-01T21:00:00.000Z",
      "Pets": [
      {
      "Name": "Kiwi",
      "Type": "Chien",
      "Race": "Bichon Maltais",
      "Age": "2",
      "User": {
      "Firstname": "Quentin"
      }}]}
    
    render(
          <AnimalCard annonce={FakeAnnonce}/>
      )
      const propsName = screen.getByTestId("annonce-name")
      const propsAge = screen.getByTestId("annonce-age")
      const propsRace = screen.getByTestId("annonce-race")
      const propsDate = screen.getByTestId("annonce-date")
      const propsMaster = screen.getByTestId("annonce-master")

      expect(propsName.textContent).toBe(FakeAnnonce.Pets[0].Name);
      expect(propsAge.textContent).toBe(", "+FakeAnnonce.Pets[0].Age);
      expect(propsRace.textContent).toBe(FakeAnnonce.Pets[0].Race);
      expect(propsDate.textContent).toBe(FakeAnnonce.DateBegin.slice(5,10)+"/"+FakeAnnonce.DateEnd.slice(5,10));
      expect(propsMaster.textContent).toBe(FakeAnnonce.Pets[0].User.Firstname);
  })



  it('Should replace the name with "Inconnu"', async () => {
    const FakeAnnonce = {
      "DateBegin": "2022-10-01T21:00:00.000Z",
      "DateEnd": "2022-10-01T21:00:00.000Z",
      "Pets": [
      {
      "Name": "",
      "Type": "Chien",
      "Race": "Bichon Maltais",
      "Age": "2",
      "User": {
      "Firstname": "Quentin"
      }}]}    
    render(
          <AnimalCard annonce={FakeAnnonce}/>
      )
      const propsName = screen.getByTestId("annonce-name")
      expect(propsName.textContent).toBe("Inconnu");
  })



  it('Should not display the Age if its negative 1', async () => {
    const FakeAnnonce = {
      "DateBegin": "2022-10-01T21:00:00.000Z",
      "DateEnd": "2022-10-01T21:00:00.000Z",
      "Pets": [
      {
      "Name": "Kiwi",
      "Type": "Chien",
      "Race": "Bichon Maltais",
      "Age": "-1",
      "User": {
      "Firstname": "Quentin"
      }}]}    
    render(
          <AnimalCard annonce={FakeAnnonce}/>
      )
      const propsAge = screen.getByTestId("annonce-age")
      expect(propsAge.textContent).toBe("");
  })
  it('Should not display the Age if its negative 2', async () => {
    const FakeAnnonce = {
      "DateBegin": "2022-10-01T21:00:00.000Z",
      "DateEnd": "2022-10-01T21:00:00.000Z",
      "Pets": [
      {
      "Name": "Kiwi",
      "Type": "Chien",
      "Race": "Bichon Maltais",
      "Age": "-2",
      "User": {
      "Firstname": "Quentin"
      }}]}    

    render(
          <AnimalCard annonce={FakeAnnonce}/>
      )
      const propsAge = screen.getByTestId("annonce-age")
      expect(propsAge.textContent).toBe("");
  })

  it('Should not display the Race', async () => {
    const FakeAnnonce = {
      "DateBegin": "2022-10-01T21:00:00.000Z",
      "DateEnd": "2022-10-01T21:00:00.000Z",
      "Pets": [
      {
      "Name": "Kiwi",
      "Type": "Chien",
      "Race": "",
      "Age": "2",
      "User": {
      "Firstname": "Quentin"
      }}]}    

    render(
          <AnimalCard annonce={FakeAnnonce}/>
      )
      const propsRace = screen.getByTestId("annonce-race")
      expect(propsRace.textContent).toBe("");
  })

  it('Should replace the master name with "Inconnu"', async () => {
    const FakeAnnonce = {
      "DateBegin": "2022-10-01T21:00:00.000Z",
      "DateEnd": "2022-10-01T21:00:00.000Z",
      "Pets": [
      {
      "Name": "Kiwi",
      "Type": "Chien",
      "Race": "Bichon Maltais",
      "Age": "2",
      "User": {
      "Firstname": ""
      }}]}    

    render(
          <AnimalCard annonce={FakeAnnonce}/>
      )
      const propsMaster = screen.getByTestId("annonce-master")
      expect(propsMaster.textContent).toBe("Inconnu");
  })


})
