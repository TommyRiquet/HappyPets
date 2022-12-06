import {  render } from '@testing-library/react';
import React from 'react';
import Notifications from './Notifications';
import {BrowserRouter} from 'react-router-dom';

// Path: Web App Frontend\src\Pages\Notifications\Notifications.js


describe('Render Tests for the <Notifications> Page', () => {
    it('Should render without crash', async () => {
        render(
            <BrowserRouter>
                <Notifications/>
            </BrowserRouter>
        )
    })
})
