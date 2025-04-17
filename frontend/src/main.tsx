import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";

import App from "./App.tsx";

import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </StrictMode>,
);
