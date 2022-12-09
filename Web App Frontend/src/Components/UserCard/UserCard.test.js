import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';

describe('Component rendering test <UserCard />', () => {
    it('Should render without crash', async () => {
      const FakeUser = {Type : 'Promenade', Frequency : 'Régulière', Animal : 'Chien', User : {FirstName: "Kevin", City: 'Wavre', Pets : [{Type : 'Chien' ,Name : 'Kiwi'}]}}


      render(
            <UserCard proposition={FakeUser}/>
        )
    })
})

describe('Testing component User props <Usercard />', () => {

    it('Should display everything correctly', async () =>{

        const FakeUser = {Type : 'Promenade', Frequency : 'Régulière', Animal : 'Chien', User : {FirstName: "Kevin", City: 'Wavre'}}

        render(
            <UserCard proposition={FakeUser}/>
        )
        const propsFirstName = screen.getByTestId("proposition-name")
        const propsVille = screen.getByTestId("proposition-user-city")


        expect(propsFirstName.textContent).toBe(FakeUser.User.FirstName);
        expect(propsVille.textContent).toBe(FakeUser.User.City);
    })

    it('Should replace the FirstName with "Inconnu"', async () => {
        const FakeUser = {Type : 'Promenade', Frequency : 'Régulière', Animal : 'Chien', User : {FirstName: "", City: 'Wavre'}}
        
        render(
              <UserCard proposition={FakeUser}/>
          )
          const propsFirstName = screen.getByTestId("proposition-name")
          expect(propsFirstName.textContent).toBe("Inconnu");
      })

    it('should replace the place with ""', async () =>{

        const FakeUser = {Type : 'Promenade', Frequency : 'Régulière', Animal : 'Chien', User : {FirstName: "Kevin", City: ''}}

        render(
            <UserCard proposition={FakeUser}/>
        )
        const propsVille = screen.getByTestId("proposition-user-city")
        expect(propsVille.textContent).toBe("");
    })

})

describe('Testing of Pets props', () => {
    it('Should display everything correctly', async () => {
        const FakePet = {Type : 'Promenade', Frequency : 'Régulière', Animal : 'Chien', User : {FirstName: "Kevin", City: 'Wavre', Pets : [{Type : 'Chien' ,Name : 'Kiwi'}]}}

        render(
            <UserCard proposition={FakePet}/>
        )
        const propsType =  screen.getByTestId("proposition-pets")
        expect(propsType.textContent).toBe(FakePet.User.Pets[0].Name + " est un " + FakePet.User.Pets[0].Type);
    })

    it('Should display with nothing', async () => {
        const FakePet = {Type : 'Promenade', Frequency : 'Régulière', Animal : 'Chien', User : {FirstName: "Kevin", Age: 21, City: 'Wavre', Pets : [{Type : '' ,Name : ''}]}}

        render(
            <UserCard proposition={FakePet}/>
        )
        const propsType =  screen.getByTestId("proposition-pets")
        expect(propsType.textContent).toBe('');
    })
    it('Should display with Type=""', async () => {
        const FakePet = {Type : 'Promenade', Frequency : 'Régulière', Animal : 'Chien', User : {FirstName: "Kevin", Age: 21, City: 'Wavre', Pets : [{Type : '' ,Name : 'Kiwi'}]}}

        render(
            <UserCard proposition={FakePet}/>
        )
        const propsType =  screen.getByTestId("proposition-pets")
        expect(propsType.textContent).toBe(FakePet.User.Pets[0].Name);
    })
    it('Should display with Name=""', async () => {
        const FakePet = {Type : 'Promenade', Frequency : 'Régulière', Animal : 'Chien', User : {FirstName: "Kevin", Age: 21, City: 'Wavre', Pets : [{Type : 'Chien' ,Name : ''}]}}

        render(
            <UserCard proposition={FakePet}/>
        )
        const propsType =  screen.getByTestId("proposition-pets")
        expect(propsType.textContent).toBe(FakePet.User.Pets[0].Type);
    })
        
})

describe('Testing descriptin of proposition', () => {
    it('Should display everything correctly', async () => {
        const FakeProposition = {Type : 'Promenade', Frequency : 'Régulière', Animal : 'Chien', User : {FirstName: "Kevin", City: 'Wavre', Pets : [{Type : 'Chien' ,Name : 'Kiwi'}]}}

        render(
            <UserCard proposition={FakeProposition}/>
        )
        const propsProposition = screen.getByTestId("proposition-description")
        expect(propsProposition.textContent).toBe(FakeProposition.Type + ' ' + FakeProposition.Frequency + ' de ' + FakeProposition.Animal)
    })
    it('Should display with Type, Frequency and Animal =""', async () => {
        const FakeProposition = {Type : '', Frequency : '', Animal : '', User : {FirstName: "Kevin", City: 'Wavre', Pets : [{Type : 'Chien' ,Name : 'Kiwi'}]}}

        render(
            <UserCard proposition={FakeProposition}/>
        )
        const propsProposition = screen.getByTestId("proposition-description")
        expect(propsProposition.textContent).toBe('')
    })
    it('Should display with Type=""', async () => {
        const FakeProposition = {Type : '', Frequency : 'Régulière', Animal : 'Chien', User : {FirstName: "Kevin", City: 'Wavre', Pets : [{Type : 'Chien' ,Name : 'Kiwi'}]}}

        render(
            <UserCard proposition={FakeProposition}/>
        )
        const propsProposition = screen.getByTestId("proposition-description")
        expect(propsProposition.textContent).toBe('')
    })
    it('Should display with frequency and Animal=""', async () => {
        const FakeProposition = {Type : 'Promenade', Frequency : '', Animal : '', User : {FirstName: "Kevin", City: 'Wavre', Pets : [{Type : 'Chien' ,Name : 'Kiwi'}]}}

        render(
            <UserCard proposition={FakeProposition}/>
        )
        const propsProposition = screen.getByTestId("proposition-description")
        expect(propsProposition.textContent).toBe(FakeProposition.Type)
    })
    it('Should display with Frequency=""', async () => {
        const FakeProposition = {Type : 'Promenade', Frequency : '', Animal : 'Chien', User : {FirstName: "Kevin", City: 'Wavre', Pets : [{Type : 'Chien' ,Name : 'Kiwi'}]}}

        render(
            <UserCard proposition={FakeProposition}/>
        )
        const propsProposition = screen.getByTestId("proposition-description")
        expect(propsProposition.textContent).toBe(FakeProposition.Type + ' de ' + FakeProposition.Animal)
    })
    it('Should display with Animal=""', async () => {
        const FakeProposition = {Type : 'Promenade', Frequency : 'Régulière', Animal : '', User : {FirstName: "Kevin", City: 'Wavre', Pets : [{Type : 'Chien' ,Name : 'Kiwi'}]}}

        render(
            <UserCard proposition={FakeProposition}/>
        )
        const propsProposition = screen.getByTestId("proposition-description")
        expect(propsProposition.textContent).toBe(FakeProposition.Type + ' ' + FakeProposition.Frequency)
    })
    
})