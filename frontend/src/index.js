import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import ContextProviders from "./context";
import { MovieProvider } from "./context/MovieContext";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <BrowserRouter>
    <ContextProviders>
      <MovieProvider>
      <App />
      </MovieProvider>
    </ContextProviders>
  </BrowserRouter>
);
