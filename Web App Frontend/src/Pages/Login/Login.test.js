import { render } from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
    it('Should render without crash', async () => {
        render(
            <Login/>
        )
    })
})
