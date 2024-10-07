interface Pizza {
  id: number;
  title: string;
  content: string;
}

interface PizzaToUpdate {
  title?: string;
  content?: string;
}

interface Film {
  id: number;
  title: string;
  director: string;
  duration: number;
  budget?: number;
  description?: string;
  imageUrl?: string;
  releaseDate?: string; // Add this line
}

interface Drink {
  id: number;
  title: string;
  image: string;
  volume: number;
  price: number;
}

type NewDrink = Omit<Drink, "id">;
type NewPizza = Omit<Pizza, "id">;
type NewFilm = Omit<Film, "id">;

// Define and export UpdateFilmBody
interface UpdateFilmBody {
  title?: string;
  director?: string;
  duration?: number;
  budget?: number;
  description?: string;
  imageUrl?: string;
  releaseDate?: string;
}

export type { Pizza, NewPizza, PizzaToUpdate, Film, Drink, NewDrink, NewFilm, UpdateFilmBody };
