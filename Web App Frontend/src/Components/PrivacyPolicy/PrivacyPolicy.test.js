import { render } from '@testing-library/react';
import PrivacyPolicy from './PrivacyPolicy';

describe('PrivacyPolicy', () => {
    it('Should render without crash', async () => {
        render(
            <PrivacyPolicy/>
        )
    })
})