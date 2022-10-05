import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';

describe('Component rendering test <UserCard />', () => {
    it('Should render without crash', async () => {
      const FakeUser = {name: "Kevin", age: 21, lieu: 'Wavre'}

        render(
            <UserCard proposition={FakeUser}/>
        )
    })
})

describe('Testing component props <UserVard />', () => {

    it('Should display everything correctly', async () =>{
        const FakeUser = {name: "Kevin", age: 21, lieu: 'Wavre'}

        render(
            <UserCard proposition={FakeUser}/>
        )
        const propsName = screen.getByTestId("proposition-name")
        const propsAge = screen.getByTestId("proposition-age")
        const propsLieu = screen.getByTestId("proposition-lieu")

        expect(propsName.textContent).toBe(FakeUser.name);
        expect(propsAge.textContent).toBe(","+FakeUser.age);
        expect(propsLieu.textContent).toBe(FakeUser.lieu);
    })

    it('Should replace the name with "Inconnu"', async () => {
        const FakeUser = {name: "", age: 21, lieu: 'Wavre'}
        
        render(
              <UserCard proposition={FakeUser}/>
          )
          const propsName = screen.getByTestId("proposition-name")
          expect(propsName.textContent).toBe("Inconnu");
      })

    it('Should not display the Age if its negative', async () => {
        const FakeUser = {name: "Kevin", age: -21, lieu: 'Wavre'}
        
        render(
              <UserCard proposition={FakeUser}/>
          )
          const propsAge = screen.getByTestId("proposition-age")
          expect(propsAge.textContent).toBe("");
    })

    it('should replace the place with "Inconnu"', async () =>{
        const FakeUser = {name: "Kevin", age: 21, lieu: ''}

        render(
            <UserCard proposition={FakeUser}/>
        )
        const propsLieu = screen.getByTestId("proposition-lieu")
        expect(propsLieu.textContent).toBe("Inconnu");
    })
})