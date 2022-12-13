import { render} from '@testing-library/react';
import AddSignalAnnonce from './AddSignalAnnonce';

describe('Render Test for the component AddPetModal', () => {
    it('Should render without crash', async () => {
        render(
            <>
                <AddSignalAnnonce           
          idSuspect={""}
          idUser={""}
          type=""/>
            </>
        )
    })
})
