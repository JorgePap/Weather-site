interface Props {
  cityName: string;
  airQuality: string;
  minTemprature: number;
  maxTemprature: number;
  currentTemprature: number;
}

export const City: React.FC<Props> = ({
  cityName,
  airQuality,
  minTemprature,
  maxTemprature,
  currentTemprature,
}) => {
  return (
    <div className="flex content-center justify-between items-center bg-[#3366A5] rounded-xl px-3 py-4">
      <div className="flex flex-col">
        <p>{cityName}</p>
        <div className="flex gap-4">
          <p> Air Quality : </p>
          <p>{airQuality}</p>
          <p>
            {minTemprature}&deg; / {maxTemprature}
            &deg;
          </p>
        </div>
      </div>
      <h4 className="pr-3 text-2xl">{currentTemprature} &deg;</h4>
    </div>
  );
};
