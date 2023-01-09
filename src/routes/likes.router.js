import { Router } from "express";
import { create, deleteLike } from "../controllers/likes.controller.js";
import { tokenValidation } from "../middlewares/tokenValidations.middleware.js";

const router = Router();

router.post("/like/:id", tokenValidation, create);
router.delete("/dislike/:id", tokenValidation, deleteLike);

export default router;