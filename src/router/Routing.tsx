import { PATHS } from "../domain/index";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { FiveDaysForecastPage, HomePage } from "../ui";

export const Routing: React.FC = () => {
  return (
    <main>
      <Routes>
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
          key={PATHS.FIVEDAYSFORECAST}
          path={PATHS.FIVEDAYSFORECAST}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <FiveDaysForecastPage />
            </Suspense>
          }
        />
      </Routes>
    </main>
  );
};

export default Routing;
