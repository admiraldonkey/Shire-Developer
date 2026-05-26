import { useState } from "react";
import { useUserDispatch } from "./hooks/UseUser";
import type { User } from "./types/User.types";
import noise from "/textures/noise.png";
import { Fireflies } from "./Fireflies";

export const SplashScreen = () => {
  const dispatch = useUserDispatch();

  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const handleLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter a name to continue");
      return;
    }

    setError("");

    const savedData = localStorage.getItem(trimmedName);

    if (savedData) {
      dispatch({
        type: "SET_USER",
        payload: JSON.parse(savedData),
      });
    } else {
      const newUser: User = {
        name: trimmedName,
        theme: "light",
      };

      dispatch({
        type: "SET_USER",
        payload: newUser,
      });

      localStorage.setItem(trimmedName, JSON.stringify(newUser));
    }
  };

  return (
    <div className="relative isolate flex flex-col items-center justify-center h-screen overflow-hidden text-[#f3e9d2] bg-linear-to-br from-[#1c2b22] via-[#2f3e2f] to-[#4b3a2f]">
      {/* Ambient background glow */}
      <div className="absolute w-150 h-150 bg-yellow-200/10 blur-3xl rounded-full z-0" />
      <div className="absolute top-[-10%] left-[15%] w-125 h-125 bg-yellow-200/10 rounded-full blur-3xl z-[0]" />
      <div className="absolute bottom-[-10%] right-[10%] w-100 h-100 bg-green-300/10 rounded-full blur-3xl z-[0]" />
      {/* Add some texture overlay here (for papery text feel) */}
      <div
        className="
    absolute
    inset-0
    pointer-events-none
    opacity-[0.12]
    mix-blend-overlay
    bg-repeat
    z-[1]
  "
        style={{
          backgroundImage: `url(${noise})`,
          backgroundSize: "300px",
        }}
      />
      <Fireflies />
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-[3]">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-55"
          preserveAspectRatio="none"
        >
          <path
            fill="#1a241d"
            fillOpacity="1"
            d="M0,224L80,202.7C160,181,320,139,480,138.7C640,139,800,181,960,176C1120,171,1280,117,1360,90.7L1440,64L1440,320L0,320Z"
          />
        </svg>
      </div>
      <div
        className="
    absolute
    w-175
    h-175
    rounded-full
    border-14
    border-[#4d5b3d]
    bg-[#243225]/30
    shadow-[0_0_80px_rgba(255,220,120,0.12)]
    animate-slow-pulse
    z-[4]
  "
      />

      {/* Main title */}
      <h1 className="font-fantasy text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)] opacity-0 animate-h1-pulse text-[#f5deb3] text-center px-4 z-[5]">
        Hobbit Recruitment Agency
      </h1>

      {/* Subtitle */}
      <h2 className="italic font-semibold text-lg md:text-xl mt-3 text-[#d6c7a1] opacity-0 animate-h2-fall-bounce text-center px-4 z-[5]">
        A fellowship begins with good company and a full belly
      </h2>
      <div
        className="
    relative
    mt-12
    w-full
    max-w-md
    rounded-4xl
    border
    border-[#b08d57]/40
    bg-[#e6d2aa]/10
    backdrop-blur-md
    shadow-2xl
    px-8
    py-10
    overflow-hidden
    opacity-0 animate-glow-fade-in
    z-[6]
  "
        style={{ "--delay": "3.2s" } as React.CSSProperties}
      >
        <form
          onSubmit={handleLogin}
          // className="flex flex-col items-center w-full max-w-sm px-4 mt-10"
          className="flex flex-col items-center"
        >
          {/* Label */}
          <span
            className="text-lg pb-3 font-medium opacity-0 animate-label-fade-in"
            style={{ "--delay": "3.8s" } as React.CSSProperties}
          >
            Enter your name
          </span>

          {/* Input */}
          <div
            className="w-full shadow-shire-glow opacity-0 animate-glow-fade-in"
            style={{ "--delay": "3.2s" } as React.CSSProperties}
          >
            <input
              type="text"
              name="nameInput"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Frodo..."
              className="
              w-full
              p-3
              rounded-xl
              bg-[#2b241d]/90
              border
              border-[#8b6f47]
              text-[#f5e6c8]
              placeholder:text-[#c9b28d]
              backdrop-blur-sm
              focus:outline-none
              focus:ring-2
              focus:ring-[#d4a64a]
              focus:border-[#d4a64a]
              transition-all
            "
            />
          </div>

          {error && <span className="text-red-300 text-sm mt-2">{error}</span>}

          {/* Animated conditional button */}
          <button
            type="submit"
            className={`
            mt-5
            w-full
            py-3
            rounded-xl
            font-fantasy
            text-xl
            font-bold
            transition-all
            duration-500
            border
            border-[#d4a64a]
            bg-[#c89b3c]
            text-[#2b1d0e]
            hover:bg-[#ddb45a]
            hover:scale-[1.02]
            hover:shadow-lg
            ${
              name.trim()
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }
          `}
          >
            Begin Your Journey
          </button>
        </form>
      </div>
    </div>
  );
};
