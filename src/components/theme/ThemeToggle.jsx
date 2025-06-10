// src/components/ThemeToggle.jsx
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() =>
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      localStorage.removeItem("theme");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 scale-75 h-8 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-500 flex items-center p-1 shadow-md"
    >
      <div
        className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white dark:bg-black transform transition-transform duration-500 ease-in-out ${
          theme === "dark" ? "translate-x-8" : "translate-x-0"
        }`}
      >
        <div className="flex justify-center items-center w-full h-full text-yellow-500 dark:text-yellow-300 text-sm">
          {theme === "dark" ? <FaMoon /> : <FaSun />}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
