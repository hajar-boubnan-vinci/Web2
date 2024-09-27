interface Car {
    brand: string;
    model: string;
    id: number | undefined;
    getDescription: () => string;
  }
  
  const dacia: Car = {
    brand: "Dacia",
    model: "Sandero",
    id: undefined,
    getDescription: function () {
      return `${this.id} ${this.brand} ${this.model}`;
    },
  };
  
  console.log(dacia.getDescription());
  
  dacia.id = Math.random();
  
  console.log(dacia.getDescription());
  
  import express from 'express';


import * as path from 'path';

const app = express();
const port = 3000;

// Définir le répertoire des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur de fichiers statiques en cours d'exécution sur le port ${port}`);
});
