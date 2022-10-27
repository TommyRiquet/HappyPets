import {  render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Annonces from './Annonces';

// Path: Web App Frontend\src\Pages\Annonces\Annonces.js

  
  afterEach(() => {
    jest.restoreAllMocks();
  });

describe('Render Tests for the <Annonces> Page', () => {
    it('Should render without crash', async () => {
        render(
            <Annonces/>
        )
    })
})


describe('Integration Tests for the <Annonces> Page', () => { 

    it('Should fetch the /annonces route once with the correct url', async () => {
        const jestSpy = jest.spyOn(global, 'fetch')
        
        render(
            <Annonces/>
        );
        
        await act(async () => {
            expect(jestSpy).toHaveBeenCalledTimes(1);
            expect(jestSpy).toHaveBeenCalledWith('http://localhost:3001/annonces?offset=0');
        })


        }
    )


    it('Should display the error message because there\'s no data received', async () => {        
        render(
            <Annonces/>
        );
        
        
        const propsAnnonceType = screen.getByTestId("list-annonce")
        expect(propsAnnonceType.textContent).toBe("Aucun Résultat :/");

        }
    )

})
