import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StateCompo } from "@/context/StateComp";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StateCompo>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StateCompo>,
);
