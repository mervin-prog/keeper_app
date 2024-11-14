import express from 'express';
import { createNote, deleteNote, getNotes, updateNote, checkAuth} from '../controllers/note.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.use(verifyToken);

router.get("/", checkAuth, getNotes);
router.post("/", checkAuth, createNote);
router.delete("/:id", checkAuth, deleteNote);
router.put("/:id", checkAuth, updateNote);

export default router;