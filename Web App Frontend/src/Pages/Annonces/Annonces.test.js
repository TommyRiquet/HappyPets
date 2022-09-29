import { render } from '@testing-library/react';
import Annonces from './Annonces';

describe('Annonces', () => {
    it('Should render without crash', async () => {
        render(
            <Annonces/>
        )
    })
})
