import { render, screen} from '@testing-library/react';
import CustomNavbar from './CustomNavbar';

describe('CustomNavbar', () => {
    it('Should render without crash', async () => {
        render(
            <CustomNavbar/>
        )
    })
})



describe('Props Test for the component CustomNavbar', () => {
    it('Should display the Link One correctly', async () => {
        render(
            <CustomNavbar
                textLinkOne="TextLinkOne"
                linkOne="/linkone"
                textLinkTwo="TextLinkTwo"
                linkTwo="/linktwo"
                color="rgba(47, 72, 88, 1)"
            />
        )

        const propsLinkOne = screen.getByTestId("link-one")
        expect(propsLinkOne.textContent).toBe("TextLinkOne");

    })
    it('Should display the Link Two correctly', async () => {
        render(
            <CustomNavbar
                textLinkOne="TextLinkOne"
                linkOne="/linkone"
                textLinkTwo="TextLinkTwo"
                linkTwo="/linktwo"
                color="rgba(47, 72, 88, 1)"
            />
        )

        const propsLinkTwo = screen.getByTestId("link-two")
        expect(propsLinkTwo.textContent).toBe("TextLinkTwo");

    })
    it('Should have the correct href for LinkOne', async () => {
        render(
            <CustomNavbar
                textLinkOne="TextLinkOne"
                linkOne="/linkone"
                textLinkTwo="TextLinkTwo"
                linkTwo="/linktwo"
                color="rgba(47, 72, 88, 1)"
            />
        )

        const propsLinkOne = screen.getByTestId("link-one")
        expect(propsLinkOne).toHaveAttribute('href','/linkone');

    })
    it('Should have the correct href for LinkTwo', async () => {
        render(
            <CustomNavbar
                textLinkOne="TextLinkOne"
                linkOne="/linkone"
                textLinkTwo="TextLinkTwo"
                linkTwo="/linktwo"
                color="rgba(47, 72, 88, 1)"
            />
        )

        const propsLinkTwo = screen.getByTestId("link-two")
        expect(propsLinkTwo).toHaveAttribute('href','/linktwo');

    })
})
