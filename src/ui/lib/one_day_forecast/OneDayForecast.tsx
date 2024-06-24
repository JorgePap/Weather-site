interface Props {
  day?: string;
  minTemprature?: number;
  maxTemprature?: number;
  svgIcon: React.ReactNode;
}

export const OneDayForecast: React.FC<Props> = ({
  day,
  svgIcon,
  minTemprature,
  maxTemprature,
}) => {
  return (
    <div className="flex w-full justify-between ">
      <div className="basis-1/2">
        <p>{day}</p>
      </div>
      <div className="flex justify-between basis-1/2">
        <div>{svgIcon}</div>
        <div className="flex gap-1">
          <p className="">{minTemprature}&deg;</p>
          <p>/</p>
          <p>{maxTemprature}&deg;</p>
        </div>
      </div>
    </div>
  );
};
