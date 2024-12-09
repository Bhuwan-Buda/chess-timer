import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store, persistor } from "./Store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  console.log(navigator, "navigator");
  navigator.serviceWorker
    .register("../public/service-worker.js")
    .then((registration) => {
      console.log(registration, "sdfsd")
      console.log("Service Worker registered with scope:", registration.scope);
    });
}

reportWebVitals();
