import { Router } from "express";
import { Film ,NewFilm} from "../types";

const films: Film[] = [
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

const router = Router();
/ READ ALL FILTERED
router.get("/", (req, res) => {
  const minDuration = Number(req.query['minimum-duration']);
  if (isNaN(minDuration) || minDuration <= 0) {
    return res.status(400).json({ error: "Wrong minimum duration" });
  }

  const filteredFilms = films.filter(film => film.duration >= minDuration);
  return res.json(filteredFilms);
});

// READ ONE
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find(f => f.id === id);
  if (!film) {
    return res.status(404).json({ error: "Film not found" });
  }
  return res.json(film);
});

// CREATE ONE
router.post("/", (req, res) => {
  const body: unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0 ||
    ("budget" in body && (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body && typeof body.description !== "string") ||
    ("imageUrl" in body && typeof body.imageUrl !== "string")
  ) {
    return res.status(400).json({ error: "Invalid data" });
  }
  const { title, director, duration, budget, description, imageUrl } = body as NewFilm;

  const nextId = films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;

  const newFilm: Film = {
    id: nextId,
    title,
    director,
    duration,
    budget,
    description,
    imageUrl,
  };

  films.push(newFilm);
  return res.json(newFilm);
});

export default router;