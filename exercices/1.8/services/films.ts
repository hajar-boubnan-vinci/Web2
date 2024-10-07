import path from "node:path";
import { Film, NewFilm } from "../types";
import { parse, serialize } from "../utils/json";

const jsonDbPath = path.join(__dirname, "/../data/films.json");

const defaultFilms: Film[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    budget: 160,
    description: "https://example.com/inception-description",
    imageUrl: "https://example.com/inception-image"
  },
  {
    id: 2,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
    budget: 63,
    description: "https://example.com/matrix-description",
    imageUrl: "https://example.com/matrix-image"
  },
  {
    id: 3,
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    budget: 165,
    description: "https://example.com/interstellar-description",
    imageUrl: "https://example.com/interstellar-image"
  }
];


function readAllFilms(minDuration: number | null = null) {
    const films = parse(jsonDbPath, defaultFilms);
    return minDuration !== null
      ? films.filter(film => film.duration >= minDuration)
      : films;
  }

function readFilmById(id: number): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  return films.find((film) => film.id === id);
}

function createFilm(newFilm: NewFilm): Film {
  const films = parse(jsonDbPath, defaultFilms);
  const nextId = films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;
  const createdFilm: Film = { id: nextId, ...newFilm };
  films.push(createdFilm);
  serialize(jsonDbPath, films);
  return createdFilm;
}

function deleteFilm(id: number): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const index = films.findIndex((film) => film.id === id);
  if (index === -1) {
    return undefined;
  }
  const [deletedFilm] = films.splice(index, 1);
  serialize(jsonDbPath, films);
  return deletedFilm;
}

function updateFilm(id: number, updatedFilm: Partial<NewFilm>): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const film = films.find((film) => film.id === id);
  if (!film) {
    return undefined;
  }
  if (updatedFilm.title !== undefined) {
    film.title = updatedFilm.title;
  }
  if (updatedFilm.director !== undefined) {
    film.director = updatedFilm.director;
  }
  if (updatedFilm.releaseDate !== undefined) {
    film.releaseDate = updatedFilm.releaseDate;
  }
  serialize(jsonDbPath, films);
  return film;
}

export {
  readAllFilms,
  readFilmById,
  createFilm,
  deleteFilm,
  updateFilm,
};
