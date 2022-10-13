import { render } from '@testing-library/react';
import MesAnnonces from './MesAnnonces';

describe('MesAnnonces', () => {
    it('Should render without crash', async () => {
        render(
            <MesAnnonces/>
        )
    })
})
