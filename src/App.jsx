import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
// import HomeView from "./pages/HomeView";
import AuthPage from "./pages/AuthPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<AuthPage />} />
        {/* <Route path="/AuthPage" element={<AuthPage />} /> */}
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
