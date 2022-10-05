import { render} from '@testing-library/react';
import ReturnButton from './ReturnButton';


describe('Test de rendu du composant <ReturnButton />', () => {
    it('Should render without crash', async () => {

        render(
            <ReturnButton/>
        )
    })
})