import express from "express";
import { getAllFeedback, submitFeedback } from "../controller/feedbackController.js";


const feedbackRoutes = express.Router();

// Route for submitting feedback
feedbackRoutes.post("/submit", submitFeedback);

// Route for fetching all feedback
feedbackRoutes.get("/all", getAllFeedback);

export default feedbackRoutes;
