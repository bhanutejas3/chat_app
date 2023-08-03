import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../public/index.css";
import "../public/header.css";
import "../public/avatar.css";
import "../public/chat.css";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CookiesProvider>
);
