import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for theme management
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkTheme(true);
      document.documentElement.classList.add("bg-dark", "text-white");
      document.documentElement.classList.remove("bg-white", "text-black");
    } else {
      setIsDarkTheme(false);
      document.documentElement.classList.add("bg-white", "text-black");
      document.documentElement.classList.remove("bg-dark", "text-white");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.classList.add("bg-dark", "text-white");
        document.documentElement.classList.remove("bg-white", "text-black");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.add("bg-white", "text-black");
        document.documentElement.classList.remove("bg-dark", "text-white");
        localStorage.setItem("theme", "light");
      }
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
