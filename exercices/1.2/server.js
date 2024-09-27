const express = require('express');
const app = express();
let getRequestCount = 0;

// Middleware pour compter les requêtes GET
app.use((req, res, next) => {
    if (req.method === 'GET') {
        getRequestCount++;
        console.log(`GET counter : ${getRequestCount}`);
    }
    next();
});

// Exemple de route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
