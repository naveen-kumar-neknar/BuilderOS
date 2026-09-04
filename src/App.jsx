import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { ProtectedRoute, PublicOnlyRoute } from './components/auth/RouteGuards';
import AppShell from './components/layout/AppShell';
import InstallSheet from './components/installation/InstallSheet';

// Routes
import Landing from './routes/Landing';
import About from './routes/About';
import HowItWorks from './routes/HowItWorks';
import Login from './routes/Login';
import Signup from './routes/Signup';
import ForgotPassword from './routes/ForgotPassword';
import ResetPassword from './routes/ResetPassword';
import AppDashboard from './routes/AppDashboard';
import Explore from './routes/Explore';
import TechnologyDetail from './routes/TechnologyDetail';
import Installed from './routes/Installed';
import Activity from './routes/Activity';
import Stacks from './routes/Stacks';
import AI from './routes/AI';
import Settings from './routes/Settings';
import Profile from './routes/Profile';

import { getTechnologies, getTechnology } from './services/installer';
import { TECHNOLOGIES } from './data/technologiesData';

function AppContent() {
  const { showToast } = useToast();
  const [technologies, setTechnologies] = useState(TECHNOLOGIES);
  const [detectedInstalls, setDetectedInstalls] = useState({});
  const [activeInstallTech, setActiveInstallTech] = useState(null);

  // Load catalog technologies
  const loadCatalog = useCallback(async () => {
    try {
      const data = await getTechnologies();
      if (Array.isArray(data.technologies) && data.technologies.length > 0) {
        setTechnologies(data.technologies);
      }
    } catch {
      setTechnologies(TECHNOLOGIES);
    }
  }, []);

  // Detect real installations on local machine
  const refreshDetection = useCallback(async () => {
    if (technologies.length === 0) return;

    const results = await Promise.all(
      technologies.map(async (tech) => {
        try {
          const res = await getTechnology(tech.slug);
          return [tech.slug, res.detection || { installed: false, version: null }];
        } catch {
          return [tech.slug, { installed: false, version: null }];
        }
      })
    );

    const nextDetected = {};
    results.forEach(([slug, det]) => {
      nextDetected[slug] = det;
    });
    setDetectedInstalls(nextDetected);
  }, [technologies]);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  useEffect(() => {
    if (technologies.length > 0) {
      refreshDetection();
    }
  }, [technologies, refreshDetection]);

  const handleInstalled = (slug, version) => {
    setDetectedInstalls((prev) => ({
      ...prev,
      [slug]: { installed: true, version }
    }));
  };

  return (
    <>
      <Routes>
        {/* Public Landing & Information Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />

        {/* Auth routes (Public only - redirect to /app if already logged in) */}
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <Signup />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicOnlyRoute>
              <ForgotPassword />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicOnlyRoute>
              <ResetPassword />
            </PublicOnlyRoute>
          }
        />

        {/* Protected Application Routes (Require Authentication) */}
        <Route
          element={
            <ProtectedRoute>
              <AppShell
                technologies={technologies}
                onSelectTech={(tech) => setActiveInstallTech(tech)}
              />
            </ProtectedRoute>
          }
        >
          <Route
            path="/app"
            element={
              <AppDashboard
                technologies={technologies}
                detectedInstalls={detectedInstalls}
                onSelectTech={(tech) => setActiveInstallTech(tech)}
                onInstallTech={(tech) => setActiveInstallTech(tech)}
              />
            }
          />
          <Route
            path="/explore"
            element={
              <Explore
                technologies={technologies}
                detectedInstalls={detectedInstalls}
                onSelectTech={(tech) => setActiveInstallTech(tech)}
                onInstallTech={(tech) => setActiveInstallTech(tech)}
              />
            }
          />
          <Route
            path="/technology/:slug"
            element={
              <TechnologyDetail
                technologies={technologies}
                detectedInstalls={detectedInstalls}
                onInstallTech={(tech) => setActiveInstallTech(tech)}
              />
            }
          />
          <Route
            path="/installed"
            element={
              <Installed
                technologies={technologies}
                detectedInstalls={detectedInstalls}
                onRefreshDetection={refreshDetection}
                onInstallTech={(tech) => setActiveInstallTech(tech)}
              />
            }
          />
          <Route
            path="/activity"
            element={<Activity detectedInstalls={detectedInstalls} />}
          />
          <Route
            path="/stacks"
            element={
              <Stacks
                technologies={technologies}
                detectedInstalls={detectedInstalls}
                onInstalled={handleInstalled}
                onShowToast={showToast}
              />
            }
          />
          <Route
            path="/ai"
            element={
              <AI
                technologies={technologies}
                detectedInstalls={detectedInstalls}
                onInstallTech={(tech) => setActiveInstallTech(tech)}
                onInstalled={handleInstalled}
              />
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Installation Sheet Overlay */}
      <AnimatePresence>
        {activeInstallTech && (
          <InstallSheet
            tech={activeInstallTech}
            onClose={() => setActiveInstallTech(null)}
            onInstalled={handleInstalled}
            onShowToast={showToast}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
