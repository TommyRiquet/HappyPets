import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';

describe('Component rendering test <UserCard />', () => {
    it('Should render without crash', async () => {
      const FakeUser = {User : {FirstName: "Kevin", Age: 21, Adress: 'Wavre'}}

        render(
            <UserCard proposition={FakeUser}/>
        )
    })
})

describe('Testing component props <Usercard />', () => {

    it('Should display everything correctly', async () =>{
        const FakeUser = {User : {FirstName: "Kevin", Age: 21, Adress: 'Wavre'}}

        render(
            <UserCard proposition={FakeUser}/>
        )
        const propsFirstName = screen.getByTestId("proposition-name")
        const propsAge = screen.getByTestId("proposition-age")
        const propsAdress = screen.getByTestId("proposition-lieu")

        expect(propsFirstName.textContent).toBe(FakeUser.User.FirstName);
        expect(propsAge.textContent).toBe(","+FakeUser.User.Age);
        expect(propsAdress.textContent).toBe(FakeUser.User.Adress);
    })

    it('Should replace the FirstName with "Inconnu"', async () => {
        const FakeUser = {User : {FirstName: "", Age: 21, Adress: 'Wavre'}}
        
        render(
              <UserCard proposition={FakeUser}/>
          )
          const propsFirstName = screen.getByTestId("proposition-name")
          expect(propsFirstName.textContent).toBe("Inconnu");
      })

    it('Should not display the Age if its negative', async () => {
        const FakeUser = {User : {FirstName: "Kevin", Age: -21, Adress: 'Wavre'}}
        
        render(
              <UserCard proposition={FakeUser}/>
          )
          const propsAge = screen.getByTestId("proposition-age")
          expect(propsAge.textContent).toBe("");
    })

    it('should replace the place with "Inconnu"', async () =>{
        const FakeUser = {User : {FirstName: "Kevin", Age: 21, Adress: ''}}

        render(
            <UserCard proposition={FakeUser}/>
        )
        const propsAdress = screen.getByTestId("proposition-lieu")
        expect(propsAdress.textContent).toBe("Inconnu");
    })
})