# Happy Pets 
[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]



<!-- À Propos du Projet -->
## À Propos du Projet


Ce projet propose une alternative aux personnes propriétaires d'un ou plusieurs animaux de compagnie et qui se retrouvent en situation précaire

Comment peut-on se retrouver en situation précaire :
* La perte d'un emploi
* La perte du logement
* La perte de la mobilité

Il s'agit de mettre en relation ces personnes avec d'autres qui se proposent de garder ou de promener l'animal en question pour la durée indiquée.On évite ainsi les abandons de circonstances.




<!-- TECHNOLOGIES -->

## Technologies

Liste des librairies/frameworks que nous avons utilisé dans la réalisation de ce projet.

* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Express][Express]][Express-url]




<!-- FONCTIONNEMENT -->
## Fonctionnement

Pour avoir une copie local fonctionnel, suivez ces étapes.

### Prérequis

Vous allez avoir besoin d'un gestionnaire de packages, nous avons utiliser npm
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

Étapes d'installation pour lancer le dévelopement de l'application.

1. Clonez le repo
   ```sh
   git clone https://github.com/TommyRiquet/ProjetIntegration.git
   ```
2. Installez les packages NPM du Frontend et du Backend
   ```sh
   npm install
   ```
3. Créer une DB SQL de dévelopement
   ```sql
   CREATE SCHEMA `<nom de la DB>` ;
   ```
4. Modifier le fichier config.js
   ```js
    "development": {
        "username": "<nom d'utilisateur>",
        "password": "<mot de passe>",
        "database": "<nom de la database>",
        "host": "localhost",
        "dialect": "mysql"
    }
   ```
4. Démarrer le Backend
   ```sh
   npm run devStart
   ```
5. Démarrer le Frontend
   ```sh
   npm start
   ```





<!-- VARIABLES -->
[contributors-shield]: https://img.shields.io/github/contributors/TommyRiquet/ProjetIntegration.svg?style=for-the-badge
[contributors-url]: https://github.com/TommyRiquet/ProjetIntegration/graphs/contributors

[stars-shield]: https://img.shields.io/github/stars/TommyRiquet/ProjetIntegration.svg?style=for-the-badge
[stars-url]: https://github.com/TommyRiquet/ProjetIntegration/stargazers

[issues-shield]: https://img.shields.io/github/issues/TommyRiquet/ProjetIntegration.svg?style=for-the-badge
[issues-url]: https://github.com/TommyRiquet/ProjetIntegration/issues

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Express]: https://img.shields.io/badge/Express-56606a?style=for-the-badge&logo=express
[Express-url]: https://expressjs.com/fr/

[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com