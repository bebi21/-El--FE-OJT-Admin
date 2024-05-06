import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import TableUser from "../Pages/Users";
import TableCourse from "../Pages/Course";
import Lession from "../Pages/CourseDetail";
import CKEditorComponent from "../components/CkEditor/CKeditor";
import Test1 from "../Pages/Test1";
import Teacher from "../Pages/Teacher";

/* const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []); */

// chia router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>tran web bị lỗi</div>,
    children: [
      {
        path: "/",
        element: <TableUser />,
      },
      { path: "/course", element: <TableCourse /> },
      {
        path: "/course-detail/:id",
        element: <Lession />,
      },
      {
        path: "/blog",
        element: <Test1 />,
      },
    
    ],
  },
]);

export default router;
