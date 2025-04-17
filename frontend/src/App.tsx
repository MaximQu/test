import { createHashRouter, RouterProvider } from "react-router";
import MemeList from "./pages/MemeList/MemeList";
import MemeTable from "./pages/MemeTable/MemeTable";
import { MainLayout } from "./layouts";
import { MemesProvider } from "./services/memeContext/MemesPropvider";

const App = () => {
  const router = createHashRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <MemeTable />,
        },
        {
          path: "memeList",
          element: <MemeList />,
        },
      ],
    },
  ]);

  return (
    <MemesProvider>
      <RouterProvider router={router} />
    </MemesProvider>
  );
};

export default App;
