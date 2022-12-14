import {  render} from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import {BrowserRouter} from 'react-router-dom';
import {DetailProposition} from './DetailProposition';

describe('Render Tests for the <DetailProposition> Page', () => {
    it('Should render without crash', async () => {
        localStorage.setItem('user', JSON.stringify({id:1}));
        render(
            <BrowserRouter>
                <DetailProposition/>
            </BrowserRouter>
        )
    })
})
/*

describe('Integration Tests for the <DetailProposition> Page', () => { 

    it('Should fetch the /DetailProposition route once with the correct url', async () => {
        const jestSpy = jest.spyOn(global, 'fetch')
        
        render(
            <BrowserRouter>
                <DetailProposition/>
            </BrowserRouter>        );
        
        await act(async () => {
            expect(jestSpy).toHaveBeenCalledTimes(1);
            expect(jestSpy).toHaveBeenCalledWith("http://localhost:3001/propositions/detailProposition?id=undefined");
        })


        }
    )

})*/
