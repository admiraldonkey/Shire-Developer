import { useState } from "react";

type FireflyData = {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
  animation: string;
  glowDuration: number;
  color: string;
};

const generateFireflies = (): FireflyData[] => {
  const animations = [
    "fireflyFloat1",
    "fireflyFloat2",
    "fireflyFloat3",
    "fireflyFloat4",
  ];

  return Array.from({ length: 24 }, (_, i) => ({
    id: i,

    // Push toward outer edges
    left: Math.random() > 0.5 ? Math.random() * 30 : 70 + Math.random() * 30,

    // Lower portion of screen
    top: 35 + Math.random() * 60,

    // Randomized timings
    duration: 16 + Math.random() * 18,
    delay: Math.random() * 20,

    // Slight size variation
    size: Math.random() > 0.9 ? 8 + Math.random() * 4 : 3 + Math.random() * 5,

    // Random movement animation
    animation: animations[Math.floor(Math.random() * animations.length)],

    // Independent glow timing
    glowDuration: 2 + Math.random() * 4,

    // Minor colour variation
    color: [
      "rgba(255,223,120,0.7)",
      "rgba(255,235,160,0.75)",
      "rgba(255,215,100,0.65)",
      "rgba(230,255,140,0.6)",
    ][Math.floor(Math.random() * 4)],
  }));
};

export const Fireflies = () => {
  const [fireflies] = useState(generateFireflies);

  return (
    <div
      className="
        absolute
        inset-0
        overflow-hidden
        pointer-events-none
        z-[2]
        opacity-0
        animate-fireflies-appear
      "
    >
      {fireflies.map((firefly) => (
        <span
          key={firefly.id}
          className="firefly"
          style={{
            left: `${firefly.left}%`,
            top: `${firefly.top}%`,
            width: `${firefly.size}px`,
            height: `${firefly.size}px`,
            background: firefly.color,
            filter: "blur(1px)",
            animation: `
  ${firefly.animation}
  ${firefly.duration}s
  ease-in-out
  ${firefly.delay}s
  infinite
`,
          }}
        />
      ))}
    </div>
  );
};
