_Copy .env.example to a .env file_
  
## Running app

-  `npm install`
-  `npm run dev`

## Proposition de modèle
**flippers**
 ```js   
 {
    imgUri: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    title: "Classic Flipper",
    isNew: true,
    price: 199.99,
    isInStock: true,
    releaseDate: "2023-05-15T00:00:00.000Z",
    note: 4.5,
    marque: "60f73e8f4f1c2c001c8b4567"
}
```
**Marques**
 ```js  
 {
    nom: "ExampleBrand",
    logo: "https://example.com/logo.png",
    description: "This is an example brand description.",
    guide: "https://example.com/guide.pdf"
}
```

## Optimisation
**Search**
	Pour optimiser le search on pourrais créer des routes avec des filtres sur certains champs
**Améliorer les performances**
	Loader les data au fil du scroll ou faire de la pagination