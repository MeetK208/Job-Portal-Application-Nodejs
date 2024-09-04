import express from "express";
import { testPostController } from "../controllers/testControllerPost.js";
import {
  getAllJobsController,
  createJobController,
  updateJobController,
  deleteJobController,
  alljobStatsController,
  statusjobStatsController,
} from "../controllers/createJobController.js";
import userAuth from "../middelwares/authMiddleware.js";

const router = express.Router();

// jobs register routes
router.post("/create-job/", userAuth, createJobController);

// jobs view
router.get("/get-job/", userAuth, getAllJobsController);

// jobs view
router.patch("/update-job/:id", userAuth, updateJobController);

// jobs view
router.delete("/delete-job/:id", userAuth, deleteJobController);

// Person's All Job View
router.get("/alljobs/", userAuth, alljobStatsController);

// Person's status wise Aggrigation
router.get("/status-job-stats/", userAuth, statusjobStatsController);

export default router;
