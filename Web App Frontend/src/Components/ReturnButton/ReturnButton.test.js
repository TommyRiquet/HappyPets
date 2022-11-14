import { render } from '@testing-library/react';
import ReturnButton from './ReturnButton';


describe('Render test for the component <ReturnButton />', () => {
    it('Should render without crash', async () => {

        render(
            <ReturnButton/>
        )
    })
})