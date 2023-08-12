import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import Feed from "./routes/Feed";
import Search from "./routes/Search";
import NotFound from "./routes/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "houses/:kaptName/feed",
        element: <Feed />,
      },
      {
        path: "houses/*",
        element: <Search />,
      },
    ],
  },
]);

export default router;
