import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, random } from "remotion";
import { FONTS } from "../MainVideo";

const GOLD = "#d4a85a";
const CREAM = "#f7f3ec";
const GREEN = "#7bc47f";
const FOREST_DEEP = "#1f3a2e";

const Bottle: React.FC<{ rotation: number; scale: number }> = ({ rotation, scale }) => {
  return (
    <div
      style={{
        width: 360,
        height: 560,
        transform: `perspective(1200px) rotateY(${rotation}deg) scale(${scale})`,
        transformStyle: "preserve-3d",
        position: "relative",
      }}
    >
      {/* Cap */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 200,
          height: 90,
          background: `linear-gradient(180deg, ${FOREST_DEEP}, #0f1f17)`,
          borderRadius: "12px 12px 6px 6px",
          boxShadow: "inset 0 -8px 12px rgba(0,0,0,0.5), inset 0 4px 6px rgba(255,255,255,0.15)",
        }}
      />
      {/* Neck */}
      <div
        style={{
          position: "absolute",
          top: 82,
          left: "50%",
          transform: "translateX(-50%)",
          width: 170,
          height: 30,
          background: `linear-gradient(180deg, #2a4538, #1f3a2e)`,
        }}
      />
      {/* Body */}
      <div
        style={{
          position: "absolute",
          top: 110,
          left: "50%",
          transform: "translateX(-50%)",
          width: 340,
          height: 440,
          background: `linear-gradient(180deg, #2e4a3c 0%, #3a5a48 45%, #1f3a2e 100%)`,
          borderRadius: 36,
          boxShadow: "inset -30px 0 50px rgba(0,0,0,0.4), inset 30px 0 50px rgba(255,255,255,0.08), 0 30px 60px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}
      >
        {/* Highlight */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 30,
            width: 50,
            height: 380,
            background: "linear-gradient(180deg, rgba(255,255,255,0.35), transparent)",
            borderRadius: 30,
            filter: "blur(8px)",
          }}
        />
        {/* Label */}
        <div
          style={{
            position: "absolute",
            top: 120,
            left: "50%",
            transform: "translateX(-50%)",
            width: 280,
            height: 220,
            background: `linear-gradient(180deg, ${CREAM}, #ede5d4)`,
            borderRadius: 8,
            boxShadow: "0 4px 8px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.playfair,
              fontWeight: 700,
              fontSize: 42,
              color: "#2e4a3c",
              letterSpacing: 4,
            }}
          >
            NEUVIE
          </div>
          <div style={{ width: 60, height: 1, background: GOLD, margin: "10px 0" }} />
          <div
            style={{
              fontFamily: FONTS.dmsans,
              fontSize: 14,
              letterSpacing: 3,
              color: "#7a6135",
              textTransform: "uppercase",
            }}
          >
            Daily Vitality
          </div>
          <div
            style={{
              fontFamily: FONTS.dmsans,
              fontSize: 11,
              letterSpacing: 2,
              color: "#9a8556",
              marginTop: 16,
              textTransform: "uppercase",
            }}
          >
            30 Strips
          </div>
        </div>
      </div>
    </div>
  );
};

const EnergyBar: React.FC<{ delay: number; targetHeight: number; x: number }> = ({ delay, targetHeight, x }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 110 } });
  const h = interpolate(s, [0, 1], [0, targetHeight]);
  const pulse = 0.85 + Math.sin((frame - delay) / 6) * 0.15 * s;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 0,
        width: 36,
        height: h,
        background: `linear-gradient(180deg, ${GREEN} 0%, #4ea054 100%)`,
        borderRadius: 6,
        boxShadow: `0 0 ${20 * pulse}px rgba(123,196,127,${0.7 * pulse})`,
        opacity: s,
      }}
    />
  );
};

export const SceneProduct: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });
  const scale = interpolate(enter, [0, 1], [0.5, 1]);
  const rotation = interpolate(frame, [0, 120], [-40, 25]);

  const exit = interpolate(frame, [110, 120], [1, 0], { extrapolateLeft: "clamp" });

  // Bars rising
  const barHeights = [180, 280, 380, 460, 520, 480, 360];
  const barDelays = [40, 48, 56, 64, 72, 80, 88];

  const headlineOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });
  const headlineX = interpolate(frame, [20, 50], [-40, 0]);

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      {/* Energy bars on right */}
      <div
        style={{
          position: "absolute",
          right: 140,
          bottom: 140,
          width: 360,
          height: 560,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {barHeights.map((h, i) => (
          <EnergyBar key={i} delay={barDelays[i]} targetHeight={h} x={i * 50} />
        ))}
        <div
          style={{
            position: "absolute",
            bottom: -40,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: FONTS.dmsans,
            fontSize: 16,
            letterSpacing: 4,
            color: "#d4a85a",
            textTransform: "uppercase",
            opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          Energy · Focus · Recovery
        </div>
      </div>

      {/* Bottle center-left */}
      <div
        style={{
          position: "absolute",
          left: 260,
          top: "50%",
          transform: `translateY(-50%) scale(${scale})`,
        }}
      >
        <Bottle rotation={rotation} scale={1} />
      </div>

      {/* Headline top */}
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 120,
          opacity: headlineOpacity,
          transform: `translateX(${headlineX}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.playfair,
            fontSize: 72,
            color: CREAM,
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          Premium <span style={{ color: GOLD, fontStyle: "italic" }}>Daily</span> Strips
        </div>
        <div
          style={{
            fontFamily: FONTS.dmsans,
            fontSize: 22,
            letterSpacing: 3,
            color: "#cfe6d4",
            marginTop: 10,
            textTransform: "uppercase",
          }}
        >
          Dissolves in 30 seconds
        </div>
      </div>
    </AbsoluteFill>
  );
};
