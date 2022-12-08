import {  render } from '@testing-library/react';
import React from 'react';
import Policy from './Policy';
import {BrowserRouter} from "react-router-dom";

/*Importing Config*/

describe('Render Test for the Page Policy', () => {
    it('Should render without crash', async () => {
        render(
            <BrowserRouter>
                <Policy/>
            </BrowserRouter>

        )
    })
})