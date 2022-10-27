import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';

describe('Component rendering test <UserCard />', () => {
    it('Should render without crash', async () => {
      const FakeUser = {User : {FirstName: "Kevin", Age: 21, City: 'Wavre', Postal: 1330}}

      render(
            <UserCard proposition={FakeUser}/>
        )
    })
})

describe('Testing component props <Usercard />', () => {

    it('Should display everything correctly', async () =>{

        const FakeUser = {User : {FirstName: "Kevin", Age: 21, City: 'Wavre', Postal: 1330}}

        render(
            <UserCard proposition={FakeUser}/>
        )
        const propsFirstName = screen.getByTestId("proposition-name")
        const propsAge = screen.getByTestId("proposition-age")
        const propsVille = screen.getByTestId("proposition-lieu")
        const propsPostal = screen.getByTestId("proposition-postal")


        expect(propsFirstName.textContent).toBe(FakeUser.User.FirstName);
        expect(propsAge.textContent).toBe(","+FakeUser.User.Age);
        expect(propsVille.textContent).toBe(FakeUser.User.City);
        expect(propsPostal.textContent).toBe(","+FakeUser.User.Postal);
    })

    it('Should replace the FirstName with "Inconnu"', async () => {
        const FakeUser = {User : {FirstName: "", Age: 21, City: 'Wavre', Postal: 1330}}

        
        render(
              <UserCard proposition={FakeUser}/>
          )
          const propsFirstName = screen.getByTestId("proposition-name")
          expect(propsFirstName.textContent).toBe("Inconnu");
      })

    it('Should not display the Age if its negative', async () => {
        const FakeUser = {User : {FirstName: "Kevin", Age: -21, City: 'Wavre', Postal: 1330}}

        
        render(
              <UserCard proposition={FakeUser}/>
          )
          const propsAge = screen.getByTestId("proposition-age")
          expect(propsAge.textContent).toBe("");
    })

    it('should replace the place with "Inconnu"', async () =>{

        const FakeUser = {User : {FirstName: "Kevin", Age: 21, City: '', Postal: 1330}}

        render(
            <UserCard proposition={FakeUser}/>
        )
        const propsVille = screen.getByTestId("proposition-lieu")
        expect(propsVille.textContent).toBe("Inconnu");
    })

    it('should not display the Postal if its different of 4 number', async () => {
        const FakeUser = {User : {FirstName: "Kevin", Age: 21, City: 'Wavre', Postal: 330}}


        render(
            <UserCard proposition={FakeUser}/>
        )

        const propsPostal = screen.getByTestId("proposition-postal")
        expect(propsPostal.textContent).toBe("");

    })
})