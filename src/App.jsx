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
import ComponentUi from "./pages/component-ui";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<HomeView />} />
        <Route path="/authpage" element={<AuthPage />} />
        <Route path="/uiComponent" element={<ComponentUi />} />
        <Route path="/" element={<RootLayout />}>
          <Route path="/settings" element={<Settings />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
