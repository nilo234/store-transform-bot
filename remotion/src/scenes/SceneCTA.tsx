import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { FONTS } from "../MainVideo";

const GOLD = "#d4a85a";
const CREAM = "#f7f3ec";
const FOREST = "#2e4a3c";

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({ frame, fps, config: { damping: 14, stiffness: 95 } });
  const logoScale = interpolate(logoIn, [0, 1], [0.7, 1]);
  const logoOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });

  const glow = 30 + Math.sin(frame / 6) * 18;

  const lineScale = interpolate(frame, [10, 32], [0, 1], { extrapolateRight: "clamp" });

  const btnIn = spring({ frame: frame - 24, fps, config: { damping: 12, stiffness: 110 } });
  const btnScale = interpolate(btnIn, [0, 1], [0.6, 1]);
  const btnOpacity = interpolate(frame, [24, 38], [0, 1], { extrapolateRight: "clamp" });

  const urlOpacity = interpolate(frame, [40, 56], [0, 1], { extrapolateRight: "clamp" });
  const urlY = interpolate(frame, [40, 60], [16, 0]);

  const finalGlow = interpolate(frame, [80, 110], [0, 1], { extrapolateRight: "clamp" });

  const btnPulse = 1 + Math.sin(frame / 10) * 0.04;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", transform: `scale(${logoScale})`, opacity: logoOpacity }}>
        <div
          style={{
            fontFamily: FONTS.playfair,
            fontWeight: 700,
            fontSize: 180,
            letterSpacing: 16,
            color: CREAM,
            textShadow: `0 0 ${glow}px rgba(212,168,90,${0.7 + finalGlow * 0.3}), 0 0 ${glow * 2.5}px rgba(212,168,90,${0.4 + finalGlow * 0.4})`,
            lineHeight: 1,
          }}
        >
          NEUVIE
        </div>
        <div
          style={{
            height: 2,
            background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            margin: "20px auto 30px",
            width: 480,
            transform: `scaleX(${lineScale})`,
          }}
        />
      </div>

      <div
        style={{
          marginTop: 10,
          transform: `scale(${btnScale * btnPulse})`,
          opacity: btnOpacity,
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${GOLD}, #b88a3f)`,
            color: FOREST,
            fontFamily: FONTS.dmsans,
            fontWeight: 700,
            fontSize: 32,
            letterSpacing: 5,
            padding: "26px 80px",
            borderRadius: 60,
            textTransform: "uppercase",
            boxShadow: `0 16px 40px rgba(212,168,90,0.45), 0 0 ${40 + Math.sin(frame / 8) * 20}px rgba(212,168,90,0.5)`,
          }}
        >
          Shop Now
        </div>
      </div>

      <div
        style={{
          marginTop: 36,
          fontFamily: FONTS.dmsans,
          fontWeight: 500,
          fontSize: 30,
          letterSpacing: 6,
          color: CREAM,
          opacity: urlOpacity,
          transform: `translateY(${urlY}px)`,
        }}
      >
        tryneuvie.com
      </div>
    </AbsoluteFill>
  );
};
