import { render } from '@testing-library/react';
/*import { act } from 'react-dom/test-utils';*/

afterEach(() => {
    jest.restoreAllMocks();
  });

describe('Render Tests for the <Report> component', () => {
    it('Should render without crash', async () => {
        render(
            
        )
    })
})
/*
describe('Integration Tests for the <Annonces> Page', () => { 

    it('Should fetch the /Report route once with the correct url', async () => {
        const jestSpy = jest.spyOn(global, 'fetch')
        
        render(<Report page={'all'}/>);
        
        await act(async () => {
            expect(jestSpy).toHaveBeenCalledTimes(2);
            expect(jestSpy).toHaveBeenCalledWith("http://localhost:3001/admin?offset=0&limit=20");
        })


        }
    )

    it('Should fetch /Report route with the correct url', async () => {
        const jestSpy = jest.spyOn(global, 'fetch')
        
        render(<Report page={'alertAvis'}/>);
        
        await act(async () => {
            expect(jestSpy).toHaveBeenCalledTimes(2);
            expect(jestSpy).toHaveBeenCalledWith("http://localhost:3001/admin/findtype?type=alertAvis&offset=0&limit=20");
        })


        }
    )

    it('Should fetch the /Report route with the correct url', async () => {
        const jestSpy = jest.spyOn(global, 'fetch')
        
        render(<Report page={'alertAnnonce'}/>);
        
        await act(async () => {
            expect(jestSpy).toHaveBeenCalledTimes(2);
            expect(jestSpy).toHaveBeenCalledWith("http://localhost:3001/admin/findtype?type=alertAnnonce&offset=0&limit=20");
        })


        }
    )

    it('Should fetch the /Report routes with the correct url', async () => {
        const jestSpy = jest.spyOn(global, 'fetch')
        
        render(<Report page={'alertUser'}/>);
        
        await act(async () => {
            expect(jestSpy).toHaveBeenCalledTimes(2);
            expect(jestSpy).toHaveBeenCalledWith("http://localhost:3001/admin/findtype?type=alertUser&offset=0&limit=20");
        })


        }
    )


})*/