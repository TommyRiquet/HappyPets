import { render } from '@testing-library/react';
import Propositions from './Propositions';

describe('Propositions', () => {
    it('Should render without crash', async () => {
        render(
            <Propositions/>
        )
    })
})
