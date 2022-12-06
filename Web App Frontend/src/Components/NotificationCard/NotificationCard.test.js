import { render } from '@testing-library/react';
import NotificationCard from './NotificationCard';


let props = {
    "AnnonceId": 1,
    "User": {
        "id": 1,
        "FirstName": "",
        "Email": "",
        "PhotoLink": ""
    }
}

describe('NotificationCard', () => {
    it('Should render without crash', async () => {
        render(
            <NotificationCard notification={props}/>
        )
    })
})