import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MesAnnonces from './MesAnnonces';

describe('MesAnnonces', () => {
    it('Should render without crash', async () => {
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(
                {id: 1}
            ));
        render(
            <BrowserRouter>
                <MesAnnonces/>
            </BrowserRouter>
        )
    })
})
