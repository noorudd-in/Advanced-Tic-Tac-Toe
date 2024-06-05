import "./App.css";
import GAME_ROUTES from "./routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return <RouterProvider router={GAME_ROUTES} />;
}

export default App;
