import { lazy } from "react";
import { createHashRouter } from "react-router-dom";

import Main from "@/components/Layout/Main";

// Lazy load the component
const HomeScreen = lazy(() => import("@/pages/home/HomeScreen"));
const FavoritesScreen = lazy(() => import("@/pages/favorites/FavoritesScreen"));

const routes = [
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/favorites",
        element: <FavoritesScreen />,
      },
    ],
  },
];

const router = createHashRouter(routes);

export default router;
