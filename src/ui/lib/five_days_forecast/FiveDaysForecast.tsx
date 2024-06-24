import { OneDayForecast } from "../one_day_forecast";
import { SunnyWeatherIcon } from "../../../assets/SunnyWeatherIcon";

interface Props {
  dayOne?: string;
  minTempratureDayOne?: number;
  maxTempratureDayOne?: number;
  dayTwo?: string;
  minTempratureDayTwo?: number;
  maxTempratureDayTwo?: number;
}

export const FiveDaysForecast: React.FC<Props> = ({
  dayOne,
  minTempratureDayOne,
  maxTempratureDayOne,
  dayTwo,
  minTempratureDayTwo,
  maxTempratureDayTwo,
}) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg py-2 px-2 bg-black/25 hover:bg-black/[35%]">
      <OneDayForecast
        day={dayOne}
        minTemprature={minTempratureDayOne}
        maxTemprature={maxTempratureDayOne}
        svgIcon={<SunnyWeatherIcon />}
      />
      <div className="w-full h-[1px] border border-[1px] border-white/[15%]"></div>
      <OneDayForecast
        day={dayTwo}
        minTemprature={minTempratureDayTwo}
        maxTemprature={maxTempratureDayTwo}
        svgIcon={<SunnyWeatherIcon />}
      />
      <div className="w-full h-[1px] border border-[1px] border-white/[15%]"></div>

      <div className="flex justify-center w-full">
        <button className="rounded-lg bg-white/[20%] w-full max-w-[15rem]">
          5-day forecast
        </button>
      </div>
    </div>
  );
};
