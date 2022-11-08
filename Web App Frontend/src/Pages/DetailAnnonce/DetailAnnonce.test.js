import { render } from '@testing-library/react';
import DetailAnnonce from './DetailAnnonce';

describe('DetailAnnonce', () => {
    it('Should render without crash', async () => {
        render(
            <DetailAnnonce/>
        )
    })
})