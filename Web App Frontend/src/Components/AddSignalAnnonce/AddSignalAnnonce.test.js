import { render , screen} from '@testing-library/react';
import AddPetModal from './AddPetModal';


const annonce = {
    "id": 8,
    "Comment": "Commentaire de l'annonce de Chausette et Jean-David",
    "Type": "Promenade",
    "DateBegin": "2022-10-13T00:00:00.000Z",
    "DateEnd": "2022-10-13T00:00:00.000Z",
    "Pets": [
        {
            "id": 2,
            "Name": "Chaussette",
            "Type": "Chat",
            "Race": "Exotic",
            "Age": "1",
            "Sexe": "F",
            "Weight": 5,
            "Height": "Normal",
            "Comment": "Meilleur chat ever",
            "DogFriendly": true,
            "CatFriendly": true,
            "KidFriendly": true,
            "User": {
                "id": 2,
                "Firstname": "Tommy",
                "City": "Perwez"
            },
            "PetsAnnonces": {
                "createdAt": "2022-11-14T22:10:48.000Z",
                "updatedAt": "2022-11-14T22:10:48.000Z",
                "AnnonceId": 8,
                "PetId": 2
            }
        },
        {
            "id": 12,
            "Name": "Jean-Louis-David",
            "Type": "Oiseau",
            "Race": "Toucan",
            "Age": "2",
            "Sexe": "M",
            "Weight": 2,
            "Height": "Normal",
            "Comment": "Best Toucan ever",
            "DogFriendly": true,
            "CatFriendly": false,
            "KidFriendly": true,
            "User": {
                "id": 2,
                "Firstname": "Tommy",
                "City": "Perwez"
            },
            "PetsAnnonces": {
                "createdAt": "2022-11-14T22:10:48.000Z",
                "updatedAt": "2022-11-14T22:10:48.000Z",
                "AnnonceId": 8,
                "PetId": 12
            }
        }
    ]
}




describe('Render Test for the component AddPetModal', () => {
    it('Should render without crash', async () => {
        render(
            <>
                <AddPetModal pets={[]}/>
            </>
        )
    })
})



describe('Props Test for the component AddPetModal', () => {
    it('Should display the error message when no pets is given', async () => {
        render(
            <AddPetModal pets={[]} show={true}/>
        )
        const ListPets = screen.getByTestId("list-pets");
        expect(ListPets.textContent).toBe("Aucun animal :/")
    })

    it('Should display a list of pets when some pets are given', async () => {
        render(
            <AddPetModal pets={[[
                {
                    "id": 2,
                    "Name": "Chaussette",
                    "Type": "Chat",
                },
                {
                    "id": 10,
                    "Name": "Jean-Louis",
                    "Type": "NAC",
                }
            ]]} 
            annonce={annonce}
            show={true}/>
        )
        const ListPets = screen.getByTestId("list-pets").innerHTML;
        expect(ListPets).toBe("<div class=\"pet-image-modal-col col\"><img alt=\"\" class=\"pet-image-modal\"><span></span></div>")
    })


})
