# Application de Catalogue de Produits avec React Query

Cette application est un catalogue de produits développé avec React et React Query. Elle permet aux utilisateurs de consulter, modifier et supprimer des produits, avec une gestion efficace des données et des états de chargement.

## Fonctionnalités

- **Affichage des produits** : Liste tous les produits disponibles dans un format de grille attrayant.
- **Détails des produits** : Affiche le titre, la description, le prix, la catégorie et les évaluations de chaque produit.
- **Modification des produits** : Permet de modifier les informations d'un produit existant.
- **Suppression des produits** : Permet de supprimer un produit du catalogue.
- **Gestion des états de chargement** : Affiche des indicateurs de chargement pendant les opérations asynchrones.
- **Gestion des erreurs** : Affiche des messages d'erreur appropriés en cas de problème.
- **Mise à jour optimiste** : Les modifications sont reflétées immédiatement dans l'interface utilisateur avant d'être confirmées par le serveur.
- **Mise en cache des données** : Les données sont mises en cache pour améliorer les performances et réduire les requêtes réseau.

## Technologies utilisées

- **React** : Bibliothèque JavaScript pour la construction d'interfaces utilisateur.
- **React Query** : Bibliothèque pour la gestion des données côté serveur dans React.
- **Axios** : Client HTTP pour effectuer des requêtes API.
- **JSONPlaceholder** : API REST factice pour les tests et le prototypage.
- **Styled Components** : Bibliothèque pour styliser les composants React.

## Structure de l'application

L'application est structurée en plusieurs composants React :

- **App** : Composant principal qui gère l'état global et les requêtes de données.
- **ProductCard** : Affiche les informations d'un produit individuel.
- **EditProductForm** : Formulaire pour modifier les informations d'un produit.

## API

L'application utilise JSONPlaceholder comme API de backend. Les endpoints suivants sont utilisés :

- `GET /posts` : Récupère tous les produits.
- `GET /posts/:id` : Récupère un produit spécifique.
- `PUT /posts/:id` : Met à jour un produit existant.
- `DELETE /posts/:id` : Supprime un produit.

## Comportement attendu

1. Au chargement de l'application, tous les produits sont récupérés et affichés.
2. Les produits sont mis en cache pour améliorer les performances.
3. Pendant le chargement des données, un indicateur de chargement est affiché.
4. En cas d'erreur lors de la récupération des données, un message d'erreur est affiché.
5. L'utilisateur peut modifier un produit en cliquant sur le bouton "Modifier".
6. Lors de la modification d'un produit, les changements sont immédiatement reflétés dans l'interface (mise à jour optimiste).
7. L'utilisateur peut supprimer un produit en cliquant sur le bouton "Supprimer".

## Installation et démarrage

1. Clonez ce dépôt
2. Installez les dépendances avec `npm install`
3. Démarrez l'application avec `npm start`
4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur
