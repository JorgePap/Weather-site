import { PATHS } from "../domain/index";
import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { CitiesManagement, ForecastPage, HomePage } from "../ui";
import { AnimatePresence } from "framer-motion";

export const Routing: React.FC = () => {
  const location = useLocation();

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route
            key={"home"}
            path={PATHS.HOME}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            key={PATHS.CITIESMANAGEMENT}
            path={PATHS.CITIESMANAGEMENT}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <CitiesManagement />
              </Suspense>
            }
          />
          <Route
            key={PATHS.FORECASTPAGE}
            path={PATHS.FORECASTPAGE}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ForecastPage />
              </Suspense>
            }
          />
        </Routes>
      </AnimatePresence>
    </main>
  );
};

export default Routing;
