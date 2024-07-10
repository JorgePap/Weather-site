import React from "react";
import { WiHumidity } from "react-icons/wi";

interface Props {
  hour?: string;
  temprature?: number;
  humidity?: number;
  imageSrc?: string;
}

export const OneHourBox: React.FC<Props> = ({
  hour,
  temprature,
  humidity,
  imageSrc,
}) => {
  return (
    <div className="flex flex-col p-4 gap-2 rounded  items-center text-center bg-[#202124]">
      <p>{hour}</p>
      <div>
        <img src={imageSrc} alt="Weather data by WeatherAPI.com" />
      </div>
      <p>{temprature} &deg;</p>
      <div className="flex items-center">
        <p className="basis-1/2">{humidity}</p>
        <WiHumidity className="w-[24px] h-[24px]" />
      </div>
    </div>
  );
};
