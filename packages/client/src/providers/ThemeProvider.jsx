//ThemeProvider.jsx

import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

// Apply theme class to body
useEffect(() => {
  document.body.classList.remove("bg-light", "text-dark", "bg-dark", "text-white");
  if (theme === "dark") {
    document.body.classList.add("bg-dark", "text-white");
  } else {
    document.body.classList.add("bg-light", "text-dark");
  }
}, [theme]);


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
export default ThemeProvider;