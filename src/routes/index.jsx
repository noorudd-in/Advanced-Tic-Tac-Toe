import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/pages/HomePage";
import SelectLevel from "../components/pages/SelectLevel";
import GlobalHeader from "../components/GlobalHeader";
import GameBoard from "../components/pages/GameBoard";
import SelectAILevel from "../components/pages/SelectAILevel";

const GAME_ROUTES = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <GlobalHeader />
        <HomePage />
      </>
    ),
    errorElement: <h1>Error</h1>,
  },
  {
    path: "/players",
    element: (
      <>
        <GlobalHeader />
        <SelectLevel />
      </>
    ),
    errorElement: <h1>Error</h1>,
  },
  {
    path: "/game",
    element: (
      <>
        <GlobalHeader />
        <GameBoard />
      </>
    ),
    errorElement: <h1>Error</h1>,
  },
  {
    path: "/ai",
    element: (
      <>
        <GlobalHeader />
        <SelectAILevel />
      </>
    ),
    errorElement: <h1>Error</h1>,
  },
]);

export default GAME_ROUTES;
