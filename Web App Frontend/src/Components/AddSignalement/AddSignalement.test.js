import { render} from '@testing-library/react';
import AddSignalement from './AddSignalement';

describe('Render Test for the component AddSignalement', () => {
    it('Should render without crash', async () => {
        render(
            <>
                <AddSignalement           
          idSuspect={""}
          idUser={""}
          type=""/>
            </>
        )
    })
})
