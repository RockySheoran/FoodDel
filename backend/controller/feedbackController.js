import feedbackModel from "../models/FeedBackModel.js";


// Function to handle feedback submission
export const submitFeedback = async (req, res) => {
  const { name, email, rating, comments } = req.body;

  // Validate input
  if (!name || !email || !rating || !comments) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    // Create new feedback
    const feedback = new feedbackModel({ name, email, rating, comments });
    await feedback.save();

    res.status(201).json({ success: true, message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
  }
};

// Function to fetch all feedback (for admin or analytics)
export const getAllFeedback = async (req, res) => {
  try {
    const feedbackList = await feedbackModel.find({}); // Sort by newest first
    // console.log(feedbackList)
    res.status(200).json({ success: true, data: feedbackList });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
  }
};
