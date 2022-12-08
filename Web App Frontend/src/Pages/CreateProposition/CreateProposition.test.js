import {render} from '@testing-library/react';
import {act} from "react-dom/test-utils";
import CreateProposition from './CreateProposition';
import {BrowserRouter} from 'react-router-dom';



describe('CreatePet', () => {
    it('Should render without crash', async () => {
        render(
            <BrowserRouter><CreateProposition/></BrowserRouter>
        )
    })
})