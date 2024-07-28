import {
  fetchForecast,
  selectForecastData,
  useAppDispatch,
  useAppSelector,
  selectAllCitiesData,
  ForecastState,
  removeCity,
  clearForecast,
  setActiveCity,
} from "@application";
import { AIRQUALITY, PATHS } from "@domain";
import { AnimatedPage, Input } from "@ui";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { City } from "./components";

export const CitiesManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const allCitiesData: string[] = useAppSelector(selectAllCitiesData);
  const forecastData: { [key: string]: ForecastState } =
    useAppSelector(selectForecastData);
  const [secondScrollY, setSecondScrollY] = useState(0);
  const [upperCitiesManagementClasses, setUpperCitiesManagementClasses] =
    useState<string>("hidden");
  const [
    secondCitiesManagementItemClasses,
    setSecondCitiesManagementItemClasses,
  ] = useState<string>("");

  useEffect(() => {
    dispatch(clearForecast());
    allCitiesData.map((city) => {
      dispatch(fetchForecast({ location: city, days: 2 }));
    });
  }, [dispatch, allCitiesData]);

  const hasScrolled = useRef(false); // useRef to track if the dispatch has occurred

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition <= 50) {
      setSecondScrollY(scrollPosition);
    }
  };

  const handleCitiesManagementShow = () => {
    // Check if the user has scrolled more than 100px from the top
    if (window.scrollY > 200) {
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
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleCitiesManagementShow);
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleCitiesManagementShow);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate the scale factor based on the scroll position
  const scaleFactor = 1 - secondScrollY / 50; // Scale from 1 to 0 as the user scrolls from 0px to 100px
  const opacityFactor = 1 - secondScrollY / 50; // Opacity from 1 to 0 as the user scrolls from 0px to 100px

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
          <div
            className="px-2"
            style={{
              transform: `scaleY(${scaleFactor})`,
              opacity: opacityFactor,
            }}
          >
            <form className="w-full transition-all duration-300 focus:outline-none">
              <Input name={"SearchCity"} />
            </form>
          </div>

          <ul className="flex flex-col gap-2">
            {Object.values(forecastData).map(({ data: city }) => {
              if (!city) return null;

              return (
                <li
                  key={`${city.location.name}${city.location.country}${city.location.region}`}
                >
                  <City
                    cityName={city?.location?.name}
                    airQuality={
                      AIRQUALITY[
                        city?.forecast?.forecastday[0]?.day?.air_quality?.[
                          "us-epa-index"
                        ]
                      ]
                    }
                    minTemprature={
                      city?.forecast?.forecastday[0]?.day?.mintemp_c
                    }
                    maxTemprature={
                      city?.forecast?.forecastday[0]?.day?.maxtemp_c
                    }
                    currentTemprature={city?.current?.temp_c}
                    onClickDeleteButton={() => {
                      dispatch(removeCity(city.location.name));
                    }}
                    onClickSetActiveButton={() => {
                      dispatch(setActiveCity(city.location.name));
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </AnimatedPage>
  );
};
