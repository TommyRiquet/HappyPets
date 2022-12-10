import { render } from '@testing-library/react';
import Propositions from './Propositions';
import {BrowserRouter} from 'react-router-dom';

describe('Propositions', () => {
    it('Should render without crash', async () => {
        render(
            <BrowserRouter>
                <Propositions/>
            </BrowserRouter>
        )
    })
})
