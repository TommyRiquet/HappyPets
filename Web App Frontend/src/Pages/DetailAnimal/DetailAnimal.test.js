import { render } from '@testing-library/react';
import DetailAnimal from './DetailAnimal';

describe('DetailAnimal', () => {
    it('Should render without crash', async () => {
        render(
            <DetailAnimal/>
        )
    })
})