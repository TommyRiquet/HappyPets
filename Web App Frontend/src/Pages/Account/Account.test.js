import {  render } from '@testing-library/react';
import React from 'react';
import Account from './Account';

/*Importing Config*/

describe('Account', () => {
    it('Should render without crash', async () => {
        render(
            <Account/>
        )
    })
})
