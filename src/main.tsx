import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import productsLineup from "@/assets/neuvie-products-lineup.png";

// Preload the hero LCP image as early as possible (before React renders)
// — improves Largest Contentful Paint on mobile.
const preload = document.createElement("link");
preload.rel = "preload";
preload.as = "image";
preload.href = productsLineup;
preload.fetchPriority = "high";
document.head.appendChild(preload);

const rootEl = document.getElementById("root")!;
rootEl.style.opacity = "1";
rootEl.style.transition = "opacity 0.15s ease-in";
createRoot(rootEl).render(<App />);
