import { OneDayForecast } from "../one_day_forecast";
import { SunnyWeatherIcon } from "../../../assets/SunnyWeatherIcon";

export const FiveDaysForecast: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 rounded-lg py-2 px-2 bg-black/25 hover:bg-black/[35%]">
      <OneDayForecast
        day={"mon"}
        minTemprature={0}
        maxTemprature={1}
        svgIcon={<SunnyWeatherIcon />}
      />
      <div className="w-full h-[1px] border border-[1px] border-white/[15%]"></div>
      <OneDayForecast
        day={"sat"}
        minTemprature={2}
        maxTemprature={3}
        svgIcon={<SunnyWeatherIcon />}
      />
      <div className="w-full h-[1px] border border-[1px] border-white/[15%]"></div>
      <OneDayForecast
        day={"sat"}
        minTemprature={25}
        maxTemprature={3}
        svgIcon={<SunnyWeatherIcon />}
      />
      <button className="rounded-lg bg-white/[20%]">5-day forecast</button>
    </div>
  );
};
