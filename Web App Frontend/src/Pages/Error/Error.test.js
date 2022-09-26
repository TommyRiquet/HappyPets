import { render } from '@testing-library/react';
import Error from './Error';

describe('Error', () => {
    it('Should render without crash', async () => {
        render(
            <Error/>
        )
    })
})