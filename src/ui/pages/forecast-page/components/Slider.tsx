import { useEffect, useRef } from "react";
import { OneHourBox } from "./OneHourBox";
import { ForecastState } from "@application";
import { format } from "date-fns";

interface Props {
  extraClasses?: string;
  activeCityForecastObject?: ForecastState;
  forecastday: number;
  imageSrc?: string;
}

export const Slider: React.FC<Props> = ({
  extraClasses,
  activeCityForecastObject,
  forecastday,
  imageSrc,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const slider = sliderRef.current;

    const handleWheel = (e: WheelEvent) => {
      if (slider) {
        // Prevent vertical scrolling
        e.preventDefault();
        // Scroll horizontally
        slider.scrollLeft += e.deltaY;
      }
    };

    if (slider) {
      slider.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (slider) {
        slider.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (sliderRef.current) {
      isDragging.current = true;
      startX.current = e.pageX - sliderRef.current.offsetLeft;
      scrollLeft.current = sliderRef.current.scrollLeft;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    if (sliderRef.current) {
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX.current) * 2; // The multiplier can be adjusted for faster or slower scroll
      sliderRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (sliderRef.current) {
      isDragging.current = true;
      startX.current = e.touches[0].pageX - sliderRef.current.offsetLeft;
      scrollLeft.current = sliderRef.current.scrollLeft;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    if (sliderRef.current) {
      const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX.current) * 2; // The multiplier can be adjusted for faster or slower scroll
      sliderRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={sliderRef}
      className={`w-full overflow-x-auto cursor-grab ${extraClasses}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex space-x-4">
        {activeCityForecastObject?.data?.forecast?.forecastday[
          forecastday
        ]?.hour.map((data, index) => {
          const date = new Date(data?.time_epoch * 1000);
          const formattedDate: string = format(date, "h:mm a");
          return (
            <div
              key={index}
              className="min-w-[30%] sm:min-w-[20%] md:min-w-[15%] lg:min-w-[10%] flex-shrink-0 rounded-lg"
            >
              <OneHourBox
                hour={formattedDate}
                temprature={data?.temp_c}
                humidity={data?.humidity}
                imageSrc={data?.condition?.icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
