import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import rootReducer from "./store/store.ts";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: rootReducer,
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
