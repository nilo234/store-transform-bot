import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;
rootEl.style.opacity = "1";
rootEl.style.transition = "opacity 0.15s ease-in";
createRoot(rootEl).render(<App />);
