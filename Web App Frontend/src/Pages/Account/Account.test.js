import {  render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Account from './Account';
import {BrowserRouter} from 'react-router-dom';

describe('Account', () => {
    it('Should render without crash', async () => {
        render(
            <Account/>
        )
    })
})


describe('Integration Tests for the <Account> Page', () => { 

    it('Should fetch the /account route once with the correct url', async () => {
        const jestSpy = jest.spyOn(global, 'fetch')
        
        render(
            <BrowserRouter>
                <Account/>
            </BrowserRouter>        );
        
        await act(async () => {
            expect(jestSpy).toHaveBeenCalledTimes(1);
            expect(jestSpy).toHaveBeenCalledWith("http://localhost:3001/users/info?id=3");
        })


        }
    )

})
