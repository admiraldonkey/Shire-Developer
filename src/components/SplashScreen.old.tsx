import { useState } from "react";
import { useUserDispatch } from "./hooks/UseUser";
import type { User } from "./types/User.types";

export const SplashScreen = () => {
  const dispatch = useUserDispatch();
  const [error, setError] = useState("");

  const handleLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nameInput = formData.get("nameInput")?.toString().trim() || "";

    if (!nameInput) {
      setError("Please enter a name to continue");
      return;
    }

    setError(""); // clear previous errors

    const savedData = localStorage.getItem(nameInput);
    if (savedData) {
      const parsed: User = JSON.parse(savedData);
      dispatch({ type: "SET_USER", payload: parsed });
    } else {
      const newUser: User = { name: nameInput, theme: "light" };
      dispatch({ type: "SET_USER", payload: newUser });
      localStorage.setItem(nameInput, JSON.stringify(newUser));
    }
  };

  return (
    <div className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 h-screen text-white relative flex flex-col items-center justify-center overflow-hidden">
      {/* Header section */}
      <div
        className="absolute top-1/4 w-full text-center px-4 animate-fade-in-down"
        style={{ animationDelay: "0.2s" }}
      >
        <h1 className="font-fantasy font-extrabold text-5xl md:text-6xl tracking-wide drop-shadow-lg">
          Hobbit Recruitment Agency
        </h1>
        <h2 className="italic font-semibold text-lg md:text-xl mt-2 text-gray-300 drop-shadow-sm">
          Executive body of the Shire Redevelopment Initiative
        </h2>
      </div>

      {/* Form section */}
      <form
        className="flex flex-col items-center w-full max-w-sm px-4 animate-fade-in-up"
        style={{ animationDelay: "0.6s" }}
        onSubmit={handleLogin}
      >
        <label className="flex flex-col items-center w-full text-center mb-2 relative">
          <span className="text-lg font-medium mb-1">Enter name to login:</span>
          <input
            type="text"
            name="nameInput"
            placeholder="Your name"
            className="mt-2 p-3 rounded-lg w-full bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 shadow-glow transition-all"
          />
          {/* Inline error message */}
          {error && <span className="text-red-400 text-sm mt-1">{error}</span>}
        </label>

        <button
          type="submit"
          className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 hover:scale-105 transform transition-all shadow-lg"
          style={{ animationDelay: "1s" }}
        >
          Log In & Enter the Shire
        </button>
      </form>
    </div>
  );
};
