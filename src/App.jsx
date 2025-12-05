import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import HomeView from "./pages/HomeView";
import Settings from "./pages/Settings";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/authpage" element={<AuthPage />} />
        <Route path="/homeview" element={<HomeView />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
