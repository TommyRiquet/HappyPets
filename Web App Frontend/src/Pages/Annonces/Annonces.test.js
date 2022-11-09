import {  render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Annonces from './Annonces';
import {BrowserRouter} from 'react-router-dom';

// Path: Web App Frontend\src\Pages\Annonces\Annonces.js

  
  afterEach(() => {
    jest.restoreAllMocks();
  });

describe('Render Tests for the <Annonces> Page', () => {
    it('Should render without crash', async () => {
        render(
            <BrowserRouter>
                <Annonces/>
            </BrowserRouter>
        )
    })
})


describe('Integration Tests for the <Annonces> Page', () => { 

    it('Should fetch the /annonces route once with the correct url', async () => {
        const jestSpy = jest.spyOn(global, 'fetch')
        
        render(
            <BrowserRouter>
                <Annonces/>
            </BrowserRouter>        );
        
        await act(async () => {
            expect(jestSpy).toHaveBeenCalledTimes(2);
            expect(jestSpy).toHaveBeenCalledWith("http://localhost:3001/annonces?offset=0&limit=20");
        })


        }
    )


    it('Should display the error message because there\'s no data received', async () => {        
        render(
            <BrowserRouter>
                <Annonces/>
            </BrowserRouter>        );
        
        
        const propsAnnonceType = screen.getByTestId("list-annonce")
        expect(propsAnnonceType.textContent).toBe("Aucun Résultat :/");

        }
    )

})
