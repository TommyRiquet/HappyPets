import { render } from '@testing-library/react';
import Admin from './Admin';

describe('Render Tests for the <Admin> Page', () => {
    it('Should render without crash', async () => {
        render( <Admin/>)
    })
})