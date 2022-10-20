import { render } from '@testing-library/react';
import FormPet from './FormPet';

describe('FormPet', () => {
    it('Should render without crash', async () => {
        render(
            <FormPet/>
        )
    })
})