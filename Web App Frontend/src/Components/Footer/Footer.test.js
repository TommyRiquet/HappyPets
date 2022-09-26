import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
    it('Should render without crash', async () => {
        render(
            <Footer/>
        )
    })
})