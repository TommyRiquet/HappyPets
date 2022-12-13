import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Report from './Report';

afterEach(() => {
    jest.restoreAllMocks();
  });

describe('Render Tests for the <Report> component', () => {
    it('Should render without crash', async () => {
        render(
            <Report  page={'all'}/>
        )
    })
})

describe('Integration Tests for the <Annonces> Page', () => { 
    
    it('Should fetch /Report route with the correct url', async () => {
        const jestSpy = jest.spyOn(global, 'fetch')
        
        render(<Report page={'alertProposition'}/>);
        
        await act(async () => {
            expect(jestSpy).toHaveBeenCalledTimes(2);
            expect(jestSpy).toHaveBeenCalledWith("http://localhost:3001/admin/findtype?type=alertProposition&offset=0&limit=20", {"headers": {"Content-type": "application/json"}, "method": "GET"});
        })


        }
    )

    
})