import {render, screen, fireEvent, getByLabelText, getAllByRole, waitFor} from '@testing-library/react';
import {act} from "react-dom/test-utils";
import CreatePet from './CreatePet';
import {BrowserRouter} from 'react-router-dom';

describe('CreatePet', () => {
    it('Should render without crash', async () => {
        render(
            <BrowserRouter>
                <CreatePet/>
            </BrowserRouter>
        )
    })
    it('Should fill the form', async () => {
            render(
                <BrowserRouter>
                    <CreatePet/>
                </BrowserRouter>
            );
            await act(() => {
                fireEvent.change(screen.getByTestId("name"), {target: {value: 'test'}});
                fireEvent.change(screen.getByTestId("behaviour"), {target: {value: 'Dominant'}});
                fireEvent.change(screen.getByTestId("type"), {target: {value: 'Chat'}});
                fireEvent.change(screen.getByTestId("race"), {target: {value: 'Ragdol'}});
                fireEvent.change(screen.getByTestId("age"), {target: {value: 3}});
                fireEvent.change(screen.getByTestId("sex"), {target: {value: 'M'}});
                fireEvent.change(screen.getByTestId("weight"), {target: {value: 2}});
                fireEvent.change(screen.getByTestId("height"), {target: {value: "Grand"}});
                fireEvent.change(screen.getByTestId("comment"), {target: {value: "Super sympa"}});
            });
            await waitFor(() => {
                expect(screen.getByTestId("name").value).toBe('test');
                expect(screen.getByTestId("behaviour").value).toBe('Dominant');
                expect(screen.getByTestId("type").value).toBe('Chat');
                expect(screen.getByTestId("race").value).toBe('Ragdol');
                expect(screen.getByTestId("age").value).toBe("3");
                expect(screen.getByTestId("weight").value).toBe("2");
                expect(screen.getByTestId("height").value).toBe("Grand");
                expect(screen.getByTestId("comment").value).toBe("Super sympa");
            }
        );
    })
})