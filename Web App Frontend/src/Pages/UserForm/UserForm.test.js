import { render } from '@testing-library/react';
import {UserForm , inputControl} from './UserForm';
import {BrowserRouter} from 'react-router-dom';

describe('UserForm', () => {
    it('Should render without crash', async () => {
        render(
            <BrowserRouter>
                <UserForm/>
            </BrowserRouter>
        )
    })
})

test("Check FirstName validity", () => {
    expect(inputControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(inputControl("", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
    expect(inputControl("Je4n", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
    expect(inputControl("Je()n", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
  });

test("Check Name validity", () => {
    expect(inputControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(inputControl("Jean", "","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
    expect(inputControl("Jean", "Dup7s","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(inputControl("Jean", "D()uis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
});

test("Check Age validity", () => {
    expect(inputControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(inputControl("Jean", "Dupuis","16", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
    expect(inputControl("Jean", "Dupuis","0", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
    expect(inputControl("Jean", "Dupuis","-5", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
});

test("Check Town validity", () => {
    expect(inputControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(inputControl("Jean", "Dupuis","18", "", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
    expect(inputControl("Jean", "Dupuis","18", "W4vre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
    expect(inputControl("Jean", "Dupuis","18", "Wa()re", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
});

test("Check Postal Number validity", () => {
    expect(inputControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(inputControl("Jean", "Dupuis","18", "Wavre", "", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
});

test("Check Email validity", () => {
    expect(inputControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(inputControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail","0474964285","Test1234","Test1234")).toBe(false);
    expect(inputControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuihotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
    expect(inputControl("Jean", "Dupuis","18", "Wavre", "1300", "@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
});

test("Check Mobile number validity", () => {
    expect(inputControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(inputControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","","Test1234","Test1234")).toBe(false);
});

test("Check Password validity", () => {
    expect(inputControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(inputControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test12348","Test1234")).toBe(false);
    expect(inputControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Testazer","Testazer")).toBe(false);
    expect(inputControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test87","Test87")).toBe(false);
});

test("Check Password confirm validity", () => {
    expect(inputControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(inputControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test12349")).toBe(false);
});