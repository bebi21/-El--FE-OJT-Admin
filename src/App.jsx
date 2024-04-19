import "./App.css";
import './css/style.css';
import './css/satoshi.css';

import { RouterProvider } from "react-router-dom";
import router from "./router/Index";
export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
