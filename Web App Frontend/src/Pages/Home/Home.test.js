import { render } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
    it('Should render without crash', async () => {
        render(
            <Home/>
        )
    })
})