import { render, screen} from '@testing-library/react';
import ReturnButton from './ReturnButton';


describe('Render test for the component <ReturnButton />', () => {
    it('Should render without crash', async () => {

        render(
            <ReturnButton/>
        )
    })
})


describe('Props test for the component <ReturnButton />', () => {
    it('Should change the href of the Button correctly', async () => {

        render(
            <ReturnButton returnLink="/test"/>
        )
        const propsLink = screen.getByTestId("button-return-link")
        expect(propsLink.href).toBe("http://localhost/test");
    })
})