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
  function getDayName(
    dateString: string | undefined,
    locale: string = "en-US"
  ): string {
    // Check if the dateString is undefined
    if (!dateString) {
      throw new Error("Date string is undefined");
    }

    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Ensure the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }

    // Get the day name
    return date.toLocaleDateString(locale, { weekday: "long" });
  }

  function convertDateString(dateString: string | undefined): string {
    // Check if the dateString is undefined or empty
    if (!dateString) {
      throw new Error("Date string is undefined or empty");
    }

    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Ensure the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }

    // Extract month and day
    const month = date.getMonth() + 1; // Months are 0-based in JavaScript
    const day = date.getDate();

    // Return formatted date as m-d
    return `${month}-${day}`;
  }

  function formatNumber(num: number | undefined): string {
    // Check if the number is undefined or empty
    if (!num) {
      throw new Error("Date string is undefined or empty");
    }
    // Use toFixed(1) to ensure one decimal place
    const formatted = num.toFixed(1);
    // If the formatted number ends with ".0", remove it
    return formatted.endsWith(".0") ? formatted.slice(0, -2) : formatted;
  }

  return (
    <div className="flex flex-col w-full items-center px-2 gap-6">
      <div className="flex flex-col text-center">
        <p className="font-medium">{getDayName(day)}</p>
        <p className="font-light">{convertDateString(day)}</p>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col basis-1/3 items-center gap-4">
          <div>9 A.M.</div>
          <div>Picture</div>
          <div>{minTemp}</div>
        </div>
        <div className="flex flex-col basis-1/3 items-center gap-4">
          <div>9 P.M.</div>
          <div>Picture</div>
          <div>{maxTemp}</div>
        </div>
        <div className="flex flex-col basis-1/3 items-center gap-4">
          <div>Average</div>
          <div>Picture</div>
          <div>{formatNumber(avgTemp)}</div>
        </div>
      </div>
    </div>
  );
};
