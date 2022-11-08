import {render} from '@testing-library/react';
import CreatePet from './CreatePet';
import {BrowserRouter} from 'react-router-dom';

describe('CreatePet', () => {
    it('Should render without crash', async () => {
        render(
            <BrowserRouter>
                <CreatePet/>
            </BrowserRouter>
        )
    })
})