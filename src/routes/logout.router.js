import { Router } from "express";
import { LogOut} from "../controllers/logoutControllers.js";

const router = Router();

router.delete("/timeline", LogOut);

export default router;