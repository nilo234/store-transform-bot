import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, random } from "remotion";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadDM } from "@remotion/google-fonts/DMSans";
import { SceneIntro } from "./scenes/SceneIntro";
import { SceneProduct } from "./scenes/SceneProduct";
import { SceneCTA } from "./scenes/SceneCTA";

const { fontFamily: playfair } = loadPlayfair("normal", { weights: ["400", "700"], subsets: ["latin"] });
const { fontFamily: dmsans } = loadDM("normal", { weights: ["400", "500", "700"], subsets: ["latin"] });

export const FONTS = { playfair, dmsans };

const FOREST = "#2e4a3c";
const CREAM = "#f7f3ec";
const GOLD = "#d4a85a";
const TERRA = "#c8794a";

const Particles: React.FC<{ count?: number; color?: string }> = ({ count = 60, color = GOLD }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: count }).map((_, i) => {
        const seed = i + 1;
        const x = random(`x${seed}`) * width;
        const yStart = random(`y${seed}`) * height + height;
        const speed = 0.5 + random(`s${seed}`) * 1.5;
        const size = 2 + random(`sz${seed}`) * 5;
        const y = yStart - frame * speed * 3;
        const drift = Math.sin((frame + seed * 10) / 25) * 30;
        const opacity = interpolate((y % height) / height, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + drift,
              top: ((y % height) + height) % height,
              width: size,
              height: size,
              borderRadius: "50%",
              background: color,
              opacity: opacity * 0.8,
              boxShadow: `0 0 ${size * 3}px ${color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = Math.sin(frame / 60) * 30;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${50 + shift}% ${40 - shift / 2}%, #3d6450 0%, ${FOREST} 45%, #1a2e23 100%)`,
      }}
    />
  );
};

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background: "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
      pointerEvents: "none",
    }}
  />
);

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const parallax = Math.sin(frame / 80) * 12;
  const zoom = 1 + Math.sin(frame / 100) * 0.015;
  return (
    <AbsoluteFill style={{ background: CREAM, fontFamily: dmsans }}>
      <Background />
      <Particles count={70} color={GOLD} />
      <AbsoluteFill style={{ transform: `translateX(${parallax}px) scale(${zoom})` }}>
        <Sequence from={0} durationInFrames={60}>
          <SceneIntro />
        </Sequence>
        <Sequence from={60} durationInFrames={120}>
          <SceneProduct />
        </Sequence>
        <Sequence from={180} durationInFrames={120}>
          <SceneCTA />
        </Sequence>
      </AbsoluteFill>
      <Vignette />
    </AbsoluteFill>
  );
};

export { FOREST, CREAM, GOLD, TERRA };
