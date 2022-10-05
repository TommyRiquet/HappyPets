import { render } from '@testing-library/react';
import UserForm from './UserForm';
const Control  = require('./UserForm');

describe('UserForm', () => {
    it('Should render without crash', async () => {
        render(
            <UserForm/>
        )
    })
})

test("Check FirstName validity", () => {
    expect(Control.inputeControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(Control.inputeControl("", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
    expect(Control.inputeControl("Je4n", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
    expect(Control.inputeControl("Je)n", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
  });

test("Check Name validity", () => {
    expect(Control.inputeControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(Control.inputeControl("Jean", "","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
    expect(Control.inputeControl("Jean", "Dup77s","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
    expect(Control.inputeControl("Jean", "D()uis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
});

test("Check Age validity", () => {
    expect(Control.inputeControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(Control.inputeControl("Jean", "Dupuis","16", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
    expect(Control.inputeControl("Jean", "Dupuis","0", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
    expect(Control.inputeControl("Jean", "Dupuis","-5", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
});

test("Check Town validity", () => {
    expect(Control.inputeControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(Control.inputeControl("Jean", "Dupuis","18", "", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
    expect(Control.inputeControl("Jean", "Dupuis","18", "W4vre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
    expect(Control.inputeControl("Jean", "Dupuis","18", "W!vre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
});

test("Check Postal Number validity", () => {
    expect(Control.inputeControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(Control.inputeControl("Jean", "Dupuis","18", "Wavre", "", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
});

test("Check Email validity", () => {
    expect(Control.inputeControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(Control.inputeControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail","0474964285","Test1234","Test1234")).toBe(false);
    expect(Control.inputeControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuihotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
    expect(Control.inputeControl("Jean", "Dupuis","18", "Wavre", "1300", "@hotmail.fr","0474964285","Test1234","Test1234")).toBe(false);
});

test("Check Mobile number validity", () => {
    expect(Control.inputeControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(Control.inputeControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","","Test1234","Test1234")).toBe(false);
});

test("Check Password validity", () => {
    expect(Control.inputeControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(Control.inputeControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test12348","Test1234")).toBe(false);
    expect(Control.inputeControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Testazer","Testazer")).toBe(false);
    expect(Control.inputeControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test87","Test87")).toBe(false);
});

test("Check Password confirm validity", () => {
    expect(Control.inputeControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test1234")).toBe(true);
    expect(Control.inputeControl("Jean", "Dupuis","18", "Wavre", "1300", "J.dupuis@hotmail.fr","0474964285","Test1234","Test12349")).toBe(false);
});