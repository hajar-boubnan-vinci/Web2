// routes/films.ts
import { Router } from "express";
import { readAllFilms, readFilmById, createFilm, deleteFilm, updateFilm } from "../services/films";
import { NewFilm, UpdateFilmBody } from "../types";

const router = Router();

// READ ALL FILTERED
router.get("/", (req, res) => {
  const minDuration = req.query['minimum-duration'] ? Number(req.query['minimum-duration']) : null;
  if (minDuration !== null && (isNaN(minDuration) || minDuration <= 0)) {
    return res.status(400).json({ error: "Wrong minimum duration" });
  }
  const films = readAllFilms(minDuration);
  return res.json(films);
});


// READ ONE
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  const film = readFilmById(id);
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
  const newFilm = createFilm({ title, director, duration, budget, description, imageUrl });
  return res.status(201).json(newFilm);
});

// DELETE ONE
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const deletedFilm = deleteFilm(id);
  if (!deletedFilm) {
    return res.sendStatus(404);
  }
  return res.json(deletedFilm);
});

// PATCH ONE
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, director, budget, duration, releaseDate } = req.body as UpdateFilmBody;
  if (budget !== undefined && (typeof budget !== "number" || budget <= 0)) {
    return res.sendStatus(400);
  }
  if (duration !== undefined && (typeof duration !== "number" || duration <= 0)) {
    return res.sendStatus(400);
  }
  const updatedFilm = updateFilm(id, { title, director, budget, duration, releaseDate });
  if (!updatedFilm) {
    return res.sendStatus(404);
  }
  return res.json(updatedFilm);
});

// PUT ONE
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, director, budget, duration, description, imageUrl, releaseDate } = req.body as NewFilm;

  if (!title || !director || budget === undefined || duration === undefined) {
    return res.sendStatus(400);
  }
  if (typeof budget !== "number" || budget <= 0 || typeof duration !== "number" || duration <= 0) {
    return res.sendStatus(400);
  }

  const newFilm = { id, title, director, budget, duration, description, imageUrl, releaseDate };
  const updatedFilm = updateFilm(id, newFilm);
  if (!updatedFilm) {
    return res.status(404).json({ error: "Film not found" });
  }

  return res.json(updatedFilm);
});




export default router;
