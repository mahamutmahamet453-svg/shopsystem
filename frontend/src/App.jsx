import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  useContext,
} from "react";

import {
  AuthContext,
} from "./context/AuthContext";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import POS from "./pages/POS";
import Sales from "./pages/Sales";
import Settings from "./pages/Settings";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  const { user } =
    useContext(
      AuthContext
    );






  return (

    <BrowserRouter>

      {!user ? (

        <Routes>

          <Route
            path="/"
            element={<Login />}
          />






          <Route
            path="/register"
            element={<Register />}
          />






          <Route
            path="*"
            element={
              <Navigate to="/" />
            }
          />

        </Routes>

      ) : (

        <DashboardLayout>

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />






            <Route
              path="/products"
              element={<Products />}
            />






            <Route
              path="/pos"
              element={<POS />}
            />






            <Route
              path="/sales"
              element={<Sales />}
            />






            <Route
              path="/settings"
              element={<Settings />}
            />






            <Route
              path="*"
              element={
                <Navigate to="/" />
              }
            />

          </Routes>

        </DashboardLayout>

      )}

    </BrowserRouter>

  );

}

export default App;