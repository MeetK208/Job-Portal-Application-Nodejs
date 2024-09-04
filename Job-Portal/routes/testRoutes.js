import express from "express";
import { testPostController } from "../controllers/testControllerPost.js";
import userAuth from "../middelwares/authMiddleware.js";

const router = express.Router();

// routes Post
// url, middlwware, controller
router.post("/test-post/", userAuth, testPostController);

export default router;
