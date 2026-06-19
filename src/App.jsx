import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TrackerPage from "./pages/TrackerPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AnalyzerPage from "./pages/AnalyzerPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/tracker"
              element={
                <ProtectedRoute>
                  <TrackerPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analyzer"
              element={
                <ProtectedRoute>
                  <AnalyzerPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;