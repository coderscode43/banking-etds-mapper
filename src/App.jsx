import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import PageNotFound from "./components/PageNotFound";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<AppLayout />} errorElement={<ErrorPage />}>
          <Route index element={<HomePage />} />
        </Route>

        {/* Catch-all route for 404s */}
        <Route path="*" element={<PageNotFound />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
