import { render } from '@testing-library/react';
import CreatePet from './CreatePet';

describe('CreatePet', () => {
    it('Should render without crash', async () => {
        render(
            <CreatePet/>
        )
    })
})