import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { StoreContext } from "../StoreContext/StoreContext";
import { useTheme } from "../StoreContext/ThemeProvider";

const FeedbackDisplay = () => {
  const scrollRef = useRef(null);
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    let animationFrameId;

    const scrollLoop = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1.5; // Increment scroll
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0; // Reset scroll when end is reached
        }
      }
      animationFrameId = requestAnimationFrame(scrollLoop); // Smooth scrolling
    };

    animationFrameId = requestAnimationFrame(scrollLoop);

    return () => cancelAnimationFrame(animationFrameId); // Cleanup animation frame
  }, []);

  const [feedbacks, setFeedbacks] = useState([]);
  const { url } = useContext(StoreContext);

  // Fetch feedbacks from the backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`${url}/api/feedback/all`); // Replace with your API endpoint
        // console.log(response);
        setFeedbacks(response.data.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);
  // console.log(feedbacks);

  return (
    <div
      className={`w-full mb-7 bg-gray-100  rounded-lg py-4  ${
        isDarkTheme ? "bg-gray-700 " : " bg-slate-50 "
      }`}>
      <h2 className="text-center text-xl font-bold mb-4">User Feedback</h2>
      <div className="overflow-x-scroll relative">
        <div
          ref={scrollRef}
          className=" flex !overflow-x-auto  gap-6 p-4 "
          style={{ scrollbarWidth: "none", whiteSpace: "nowrap" }}>
          {[...feedbacks, ...feedbacks].map((feedback, index) => {
            return (
              <div
                key={index}
                className={`flex flex-col w-[300px] px-2 py-1 hover:scale-105 hover:translate-y-1.5    flex-shrink-0 overflow-visible rounded-lg  ${
                  isDarkTheme ? "bg-slate-600" : "bg-slate-100"
                }`}>
                <h3 className="text-lg font-semibold">{feedback.name}</h3>
                <p
                  className={`text-sm text-wrap ${
                    isDarkTheme ? "text-white" : "text-black"
                  } `}>
                  {feedback.comments}
                </p>
                <p className="mt-2 text-yellow-500 font-bold">
                  Rating: {feedback.rating} / 5
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeedbackDisplay;
