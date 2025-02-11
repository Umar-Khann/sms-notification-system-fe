import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { getToken } from "./util/token";
import { MessageThresholdProvider } from "./context/MessageThresholdContext";

const AuthPage = lazy(() => import("./pages/Auth"));
const HomePage = lazy(() => import("./pages/Home"));

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isLoggedIn = getToken();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App: React.FC = () => (
  <AuthProvider>
    <MessageThresholdProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </MessageThresholdProvider>
  </AuthProvider>
);

export default App;
