import express from "express";


import usersRouter from "./routes/users";
import pizzaRouter from "./routes/pizzas";
import filmsRouter from "./routes/films";
import drinkRouter from "./routes/drinks";
import textsRouter from './routes/texts';

const app = express();

// Ajoutez ce middleware pour parser les requêtes JSON
app.use(express.json());




app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/pizzas", pizzaRouter);
app.use("/films",filmsRouter);
app.use("/drinks", drinkRouter);
app.use('/texts', textsRouter);

export default app;
