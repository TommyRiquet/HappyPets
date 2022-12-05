import {  render } from '@testing-library/react';
import React from 'react';
import Account from './Account';
import {BrowserRouter} from "react-router-dom";

/*Importing Config*/

describe('Render Test for the Page Account', () => {
    it('Should render without crash', async () => {
        render(
            <BrowserRouter>
                <Account/>
            </BrowserRouter>
        )
    })    
})
