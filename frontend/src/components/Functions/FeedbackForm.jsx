import React, { useContext, useState } from "react";
import { useTheme } from "../StoreContext/ThemeProvider";
import axios from "axios";
import { StoreContext } from "../StoreContext/StoreContext";

const FeedbackForm = () => {
  const { isDarkTheme } = useTheme();
  const { url } = useContext(StoreContext);

  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    rating: "",
    comments: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${url}/api/feedback/submit`, feedback);
      //  console.log(response)
      if (response.data.success) {
        setMessage("Thank you for your feedback!");
        setFeedback({
          // name: "",
          // email: "",
          // rating: "",
          comments: "",
        });
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Error: Unable to submit feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}>
      <div
        className={`w-full max-w-md p-6  shadow-lg${
          isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}>
        <h1
          className={`text-2xl font-bold mb-4 ${
            isDarkTheme ? " text-white" : " text-black"
          }`}>
          Feedback Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={feedback.name}
              onChange={handleChange}
              className={`!sm:ml-3 rounded-md px-1 h-7 w-full ${
                isDarkTheme ? " text-white bg-black " : " text-black bg-white"
              }`}
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={feedback.email}
              onChange={handleChange}
              className={`!sm:ml-3 rounded-md px-1 h-7 w-full ${
                isDarkTheme ? " text-white bg-black " : " text-black bg-white"
              }`}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="rating" className="block font-medium">
              Rating (1 to 5)
            </label>
            <select
              id="rating"
              name="rating"
              value={feedback.rating}
              onChange={handleChange}
              className={`mt-1 p-2 border rounded-md w-full ${
                isDarkTheme ? " text-white bg-black " : " text-black bg-white"
              }`}
              required>
              <option value="">Select Rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
          <div>
            <label htmlFor="comments" className="block font-medium">
              Comments
            </label>
            <textarea
              id="comments"
              name="comments"
              value={feedback.comments}
              onChange={handleChange}
              className={`!sm:ml-3 rounded-md px-2 pt-1  w-full ${
                isDarkTheme ? " text-white bg-black " : " text-black bg-white"
              }`}
              placeholder="Enter your comments"
              rows="4"
              required></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-400"
            disabled={loading}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default FeedbackForm;
