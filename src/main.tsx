import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";


import {Provider} from "react-redux"
import {store} from "./app/store.ts"


import "./index.css";
import HomePage from "./components/pages/HomePage.tsx";
import LoginPage from "./components/pages/LoginPage.tsx";
import PlansPage from "./components/pages/PlansPage.tsx";
import BrowsePage from "./components/pages/BrowsePage.tsx";
import WatchPage from "./components/pages/WatchPage.tsx";
import PrivateRoutes from "./utils/PrivateRoutes.tsx";
import PlansManagePage from "./components/pages/PlansManage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/plans" element={<PrivateRoutes />}>
       <Route path="/plans" element={<PlansPage />} />
       <Route path="/plans/manage" element={<PlansManagePage />} />
      </Route>

      <Route path="/browse" element={<PrivateRoutes />}>
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/browse/watch/:id" element={<WatchPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
