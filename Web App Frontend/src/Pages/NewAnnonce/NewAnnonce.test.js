import { render } from '@testing-library/react';
import NewAnnonces from './NewAnnonce';

describe('NewAnnonces', () => {
    it('Should render without crash', async () => {
        render(
            <NewAnnonces/>
        )
    })
})
