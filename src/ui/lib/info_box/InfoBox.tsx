interface Props {
  title: string;
  info: string | number;
  conclusion?: string;
  unit?: "percentage" | "celsius";
}

export const InfoBox: React.FC<Props> = ({ title, info, unit }) => {
  const getUnitSymbol = () => {
    switch (unit) {
      case "percentage":
        return "%";
      case "celsius":
        return <span>&deg;</span>;
      default:
        return "";
    }
  };
  return (
    <div className="flex flex-col items-center justify-between rounded-lg p-5 w-[95px] min-w-[95px] h-[95px] bg-white ">
      <h4 className="font-light">{title}</h4>
      <p className="font-semibold">
        {info} {getUnitSymbol()}
      </p>
    </div>
  );
};
