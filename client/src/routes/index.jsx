import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/pages/HomePage";
import SelectLevel from "../components/pages/SelectLevel";
import GlobalHeader from "../components/GlobalHeader";
import GameBoard from "../components/pages/GameBoard";
import SelectAILevel from "../components/pages/SelectAILevel";
import SelectOnlineLevel from "../components/pages/SelectOnlineLevel";
import Rooms from "../components/Rooms";
import WaitingForOpponent from "../components/WaitingForOpponent";

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
  {
    path: "/online",
    element: (
      <>
        <GlobalHeader />
        <SelectOnlineLevel />
      </>
    ),
    errorElement: <h1>Error</h1>,
  },
  {
    path: "/room",
    element: (
      <>
        <GlobalHeader />
        <Rooms />
      </>
    ),
    errorElement: <h1>Error</h1>,
  },
  {
    path: "/lobby",
    element: (
      <>
        <GlobalHeader />
        <WaitingForOpponent />
      </>
    ),
    errorElement: <h1>Error</h1>,
  },
]);

export default GAME_ROUTES;
