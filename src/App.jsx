import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import DefaultRedirect from "./components/navigation/DefaultRedirect";
import PageNotFound from "./components/PageNotFound";
import AppLayout from "./layout/AppLayout";
import ImportDeducteeDetails from "./pages/ImportDeducteeDetails";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Redirect root to dynamic importDeductee route */}
        <Route path="/" element={<DefaultRedirect />} />

        <Route path="home" element={<AppLayout />} errorElement={<ErrorPage />}>
          <Route
            path="listSearch/importDeducteeDetails/:params"
            element={<ImportDeducteeDetails />}
          />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
