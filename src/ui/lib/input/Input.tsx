import { useRef, useState } from "react";
import {
  selectAutoComplete,
  useAppDispatch,
  useAppSelector,
  fetchAutoComplete,
} from "@application";
import { IAutoComplete } from "@domain";
import { CiSearch } from "react-icons/ci";
import { FaCirclePlus } from "react-icons/fa6";

interface Props {
  onLocationSelected: (location: string) => void;
  name: string;
  extraClasses?: string;
}

export const Input: React.FC<Props> = ({
  name,
  onLocationSelected,
  extraClasses,
}) => {
  const dispatch = useAppDispatch();
  const autoCompleteData: IAutoComplete[] = useAppSelector(selectAutoComplete);

  const [query, setQuery] = useState<string>(""); //user input query

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    dispatch(fetchAutoComplete(newQuery));
  };

  const handleSelectSuggestion = (selectedLocation: string) => {
    setQuery(selectedLocation);
    onLocationSelected(selectedLocation);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const handleOuterDivClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      onClick={handleOuterDivClick}
      className={`relative bg-[#4F4F4F] cursor-text ${extraClasses} ${
        autoCompleteData?.length > 0 ? "rounded-t-xl" : "rounded-full"
      }`}
    >
      <div className="absolute box-border top-1/2 left-[2px] translate-y-[-50%] pl-2">
        <CiSearch color="black" />
      </div>
      <input
        className="h-[30px] box-border pl-10 bg-transparent w-full"
        type="text"
        placeholder="Type your location..."
        name={name}
        value={query}
        onChange={handleInputChange}
        ref={inputRef}
        autoComplete="off"
      />
      <ul
        className={`absolute flex flex-col gap-3 w-full px-4 py-2 rounded-b-xl ${
          autoCompleteData?.length > 0 ? "bg-[#4F4F4F]" : ""
        }`}
      >
        {autoCompleteData?.map((location, index) => (
          <li
            className="flex justify-between items-center"
            key={index}
            onClick={() => handleSelectSuggestion(location.name)}
          >
            {location.name}
            <button>
              <FaCirclePlus fontSize="20px" color="white" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
