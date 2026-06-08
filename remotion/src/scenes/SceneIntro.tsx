import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { FONTS } from "../MainVideo";

const GOLD = "#d4a85a";
const CREAM = "#f7f3ec";

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0.6, 1]);
  const logoOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const letterSpacing = interpolate(frame, [0, 40], [40, 14]);

  const glow = 20 + Math.sin(frame / 8) * 14;
  const glowOpacity = interpolate(frame, [0, 20, 50, 60], [0, 1, 1, 0.6]);

  const tagOpacity = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: "clamp" });
  const tagY = interpolate(frame, [22, 42], [20, 0]);

  const lineScale = interpolate(frame, [16, 40], [0, 1], { extrapolateRight: "clamp" });

  const exitOpacity = interpolate(frame, [52, 60], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: exitOpacity }}>
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.playfair,
            fontWeight: 700,
            fontSize: 220,
            letterSpacing: `${letterSpacing}px`,
            color: CREAM,
            textShadow: `0 0 ${glow}px rgba(212,168,90,${glowOpacity}), 0 0 ${glow * 2}px rgba(212,168,90,${glowOpacity * 0.5})`,
            lineHeight: 1,
          }}
        >
          NEUVIE
        </div>
        <div
          style={{
            height: 2,
            background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            margin: "28px auto 22px",
            width: 520,
            transform: `scaleX(${lineScale})`,
          }}
        />
        <div
          style={{
            fontFamily: FONTS.dmsans,
            fontWeight: 400,
            fontSize: 34,
            letterSpacing: 12,
            color: GOLD,
            textTransform: "uppercase",
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
          }}
        >
          Vitality Redefined
        </div>
      </div>
    </AbsoluteFill>
  );
};
