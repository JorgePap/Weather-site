interface Props {
  day?: string;
  maxTemp?: number;
  minTemp?: number;
  avgTemp?: number;
}

export const OneDayForecast: React.FC<Props> = ({
  day,
  maxTemp,
  minTemp,
  avgTemp,
}) => {
  return (
    <div className="flex flex-col w-full items-center px-2 gap-6">
      <div>{day}</div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col basis-1/3 items-center gap-6">
          <div>Min Temprature</div>
          <div>Picture</div>
          <div>{minTemp}</div>
        </div>
        <div className="flex flex-col basis-1/3 items-center gap-6">
          <div>Max Temprature</div>
          <div>Picture</div>
          <div>{maxTemp}</div>
        </div>
        <div className="flex flex-col basis-1/3 items-center gap-6">
          <div>Avg Temprature</div>
          <div>Picture</div>
          <div>{avgTemp}</div>
        </div>
      </div>
    </div>
  );
};
