import { render } from '@testing-library/react';
import NewAnnonces from './NewAnnonce';
import {BrowserRouter} from 'react-router-dom';

describe('NewAnnonces', () => {
    it('Should render without crash', async () => {
        render(
            <BrowserRouter>
                <NewAnnonces/>
            </BrowserRouter>
        )
    })
})
