import { render } from '@testing-library/react';
import UserForm from './UserForm';

describe('UserForm', () => {
    it('Should render without crash', async () => {
        render(
            <UserForm/>
        )
    })
})