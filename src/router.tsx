import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import Feed from "./routes/Feed";
import Search from "./routes/Search";
import NotFound from "./routes/NotFound";
import UploadFeed from "./routes/UploadFeed";
import Enroll from "./routes/Enroll";
import FeedDetail from "./routes/FeedDetail";
import DeleteFeed from "./routes/DeleteFeed";
import EditFeed from "./routes/EditFeed";
import DeleteComment from "./routes/DeleteComment";
import EditComment from "./routes/EditComment";
import ReplyComment from "./routes/ReplyComment";
import CommentDetail from "./routes/CommentDetail";

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
        path: "houses/:kaptName",
        element: <Enroll />,
      },
      {
        path: "houses/:kaptName/feed/:id",
        children: [
          { path: "", element: <FeedDetail /> },
          { path: "delete", element: <DeleteFeed /> },
          { path: "edit", element: <EditFeed /> },
          { path: "comment/:commentId", element: <CommentDetail /> },
          { path: "comment/:commentId/delete", element: <DeleteComment /> },
          { path: "comment/:commentId/edit", element: <EditComment /> },
          { path: "comment/:commentId/reply", element: <ReplyComment /> },
        ],
      },
      {
        path: "houses/:kaptName/feed/upload",
        element: <UploadFeed />,
      },
      {
        path: "houses/:kaptName/feed",
        element: <Feed />,
      },
      {
        path: "houses/search?",
        element: <Search />,
      },
    ],
  },
]);

export default router;
