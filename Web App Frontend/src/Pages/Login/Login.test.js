import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Login from './Login';

describe('Login', () => {
    it('Should render without crash', async () => {
        render(
            <BrowserRouter>
                <Login/>
            </BrowserRouter>
        )
    })
})
