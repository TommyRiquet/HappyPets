import { render } from '@testing-library/react';
import Account from './Account';

describe('Account', () => {
    it('Should render without crash', async () => {
        render(
            <Account/>
        )
    })
})
