import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "@/components/ui/provider";
import { ColorModeProvider } from "./components/ui/color-mode";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecoilRoot>
      <Provider>
        <ColorModeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ColorModeProvider>
      </Provider>
    </RecoilRoot>
  </StrictMode>
);
