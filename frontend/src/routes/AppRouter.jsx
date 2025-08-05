import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Resources from "../pages/Resources";
import Areas from "../pages/Areas";
import AreasMap from "../pages/AreasMap";
import AccessLogs from "../pages/AccessLogs";
import PrivateRoute from "./PrivateRoute";
import PrivateLayout from "../components/PrivateLayout";
import Unauthorized from "../pages/Unauthorized";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <PrivateLayout>
                  <Dashboard />
                </PrivateLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/users"
            element={
              <PrivateRoute allowedRoles={["administrador"]}>
                <PrivateLayout>
                  <Users />
                </PrivateLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/resources"
            element={
              <PrivateRoute allowedRoles={["gerente", "administrador"]}>
                <PrivateLayout>
                  <Resources />
                </PrivateLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/areas"
            element={
              <PrivateRoute allowedRoles={["gerente", "administrador"]}>
                <PrivateLayout>
                  <Areas />
                </PrivateLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/access-logs"
            element={
              <PrivateRoute
                allowedRoles={["funcionario", "gerente", "administrador"]}
              >
                <PrivateLayout>
                  <AccessLogs />
                </PrivateLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/areas-map"
            element={
              <PrivateRoute
                allowedRoles={["funcionario", "gerente", "administrador"]}
              >
                <PrivateLayout>
                  <AreasMap />
                </PrivateLayout>
              </PrivateRoute>
            }
          />

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<div>404 - Página não encontrada</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
