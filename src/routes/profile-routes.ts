import { Router } from "express";
import { ProfileController } from "../controllers/profile-controllers.js";

const router = Router();
const profileController = new ProfileController();

router.post("/profiles", (req, res) => profileController.createProfile(req, res));
router.get("/profiles", (req, res) => profileController.getAllProfiles(req, res));
router.get("/profiles/:id", (req, res) => profileController.getProfileById(req, res));
router.put("/profiles/:id", (req, res) => profileController.updateProfile(req, res));
router.delete("/profiles/:id", (req, res) => profileController.deleteProfile(req, res));

export default router;
