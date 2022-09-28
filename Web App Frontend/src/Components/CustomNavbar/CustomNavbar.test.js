import { render } from '@testing-library/react';
import CustomNavbar from './CustomNavbar';

describe('CustomNavbar', () => {
    it('Should render without crash', async () => {
        render(
            <CustomNavbar/>
        )
    })
})