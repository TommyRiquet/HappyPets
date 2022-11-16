import { render , screen } from '@testing-library/react';
import ReturnButton from './ReturnButton';

describe('Render test for the component <ReturnButton />', () => {
    it('Should render without crash', async () => {

        render(
            <ReturnButton/>
        )
    })
})



describe('test onClick for the component <ReturnButton />', () => {
    it('Should call the onClick function', async () => {

        render(
                <ReturnButton/>
        )

        const button = screen.getByRole('button')
        button.click()
        expect(button.className).toBe("return-button btn")

    })
})
