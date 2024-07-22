import { selectActiveCityData, useAppSelector } from "@application";
import { useState } from "react";

interface Props {
  cityName: string;
  airQuality: string;
  minTemprature: number;
  maxTemprature: number;
  currentTemprature: number;
  onClickSetActiveButton?: () => void;
  onClickDeleteButton?: () => void;
}

export const City: React.FC<Props> = ({
  cityName,
  airQuality,
  minTemprature,
  maxTemprature,
  currentTemprature,
  onClickSetActiveButton,
  onClickDeleteButton,
}) => {
  const activeCityData: string = useAppSelector(selectActiveCityData);
  // const [isActive, setIsActive] = useState(false);

  let isdisabled = false;
  if (activeCityData === cityName) {
    isdisabled = true;
  }

  return (
    <div
      key={cityName}
      className="flex content-center justify-between items-center bg-[#3366A5] rounded-xl px-3 py-4"
    >
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
      <div className="flex gap-4">
        <h3 className="pr-3 text-2xl">{currentTemprature} &deg;</h3>
        <button
          onClick={onClickSetActiveButton}
          disabled={isdisabled}
          className={`${
            isdisabled ? "text-[#B0B0B0] cursor-not-allowed" : "text-[#FFFFFF]"
          }`}
        >
          Active
        </button>
        <button
          onClick={onClickDeleteButton}
          disabled={isdisabled}
          className={`${
            isdisabled ? "text-[#B0B0B0] cursor-not-allowed" : "text-[#FFFFFF]"
          }`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
