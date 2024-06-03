import {
  fetchForecast,
  selectForecastData,
  useAppDispatch,
  useAppSelector,
} from "@application";
import { AIRQUALITY, IForecast, PATHS } from "@domain";
import { AnimatedPage, Input } from "@ui";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export const CitiesManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const forecastData: IForecast = useAppSelector(selectForecastData);

  const [upperCitiesManagementClasses, setUpperCitiesManagementClasses] =
    useState<string>("hidden");
  const [
    secondCitiesManagementItemClasses,
    setSecondCitiesManagementItemClasses,
  ] = useState<string>("");

  const hasScrolled = useRef(false); // useRef to track if the dispatch has occurred

  const handleCitiesManagementShow = () => {
    // Check if the user has scrolled more than 100px from the top
    if (window.scrollY > 10) {
      if (hasScrolled.current === false) {
        setUpperCitiesManagementClasses("block");
        setSecondCitiesManagementItemClasses("hidden");
        hasScrolled.current = true;
      }
    } else {
      if (hasScrolled.current === true) {
        setUpperCitiesManagementClasses("hidden");
        setSecondCitiesManagementItemClasses("block");
        hasScrolled.current = false;
      }
    }
  };

  useEffect(() => {
    dispatch(fetchForecast({ location: "Xanthi", days: 5 }));

    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleCitiesManagementShow);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleCitiesManagementShow);
    };
  }, []);

  return (
    <AnimatedPage>
      <div className="px-2 py-6 flex flex-col w-full items-center min-h-screen bg-black text-white">
        <div className="grid grid-cols-[40px,1fr,40px] inset-x-4 top-[10px] fixed">
          <Link to={PATHS.HOME}>
            <FaArrowLeft />
          </Link>
          <p className={`text-center ${upperCitiesManagementClasses}`}>
            Cities Management
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 px-2 py-5">
          <h1 className={`${secondCitiesManagementItemClasses}`}>
            Cities Management
          </h1>
          <div className="px-2">
            <form>
              <Input
                name={"SearchCity"}
                onLocationSelected={() => console.log("Selected Location:")}
              />
            </form>
          </div>
          <div className="flex content-center justify-between items-center bg-[#3366A5] rounded-xl px-3 py-4">
            <div className="flex flex-col">
              <p>{forecastData?.location?.name}</p>
              <div className="flex gap-4">
                <p> Air Quality : </p>
                <p>
                  {
                    AIRQUALITY[
                      forecastData?.forecast?.forecastday[0]?.day
                        ?.air_quality?.["us-epa-index"]
                    ]
                  }
                </p>
                <p>
                  {forecastData?.forecast?.forecastday[0]?.day?.mintemp_c}&deg;
                  / {forecastData?.forecast?.forecastday[0]?.day?.maxtemp_c}
                  &deg;
                </p>
              </div>
            </div>
            <h4 className="pr-3 text-2xl">
              {forecastData?.current?.temp_c} &deg;
            </h4>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default CitiesManagement;
