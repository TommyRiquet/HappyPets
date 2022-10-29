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
        const propsVille = screen.getByTestId("proposition-lieu")


        expect(propsFirstName.textContent).toBe(FakeUser.User.FirstName);
        expect(propsVille.textContent).toBe(FakeUser.User.City);
    })

    it('Should replace the FirstName with "Inconnu"', async () => {
        const FakeUser = {User : {FirstName: "", Age: 21, City: 'Wavre', Postal: 1330}}

        
        render(
              <UserCard proposition={FakeUser}/>
          )
          const propsFirstName = screen.getByTestId("proposition-name")
          expect(propsFirstName.textContent).toBe("Inconnu");
      })

    it('should replace the place with "Inconnu"', async () =>{

        const FakeUser = {User : {FirstName: "Kevin", Age: 21, City: '', Postal: 1330}}

        render(
            <UserCard proposition={FakeUser}/>
        )
        const propsVille = screen.getByTestId("proposition-lieu")
        expect(propsVille.textContent).toBe("Inconnu");
    })

})