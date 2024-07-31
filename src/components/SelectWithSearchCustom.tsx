import { useState, useEffect, useRef } from "react";

interface OptionType {
  label: string;
  value: string;
}

interface Props {
  placeholder?: string;
  multiple: boolean;
  outlined: boolean;
  optionLabel: string;
  id: string;
  withSearch: boolean;
  datas: OptionType[];
  onSelect: (selectedOptions: OptionType[]) => void;
}

const SelectWithSearchCustom = ({
  multiple = true,
  outlined = true,
  optionLabel,
  id,
  withSearch = true,
  datas,
  placeholder = "",
  onSelect,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<OptionType[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredOptions(
      datas.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, datas]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: OptionType) => {
    if (multiple) {
      setSelectedOptions((prevSelected) => {
        const newSelected = prevSelected.some((o) => o.value === option.value)
          ? prevSelected.filter((o) => o.value !== option.value)
          : [...prevSelected, option];
        onSelect(newSelected);
        return newSelected;
      });
    } else {
      setSelectedOptions((prevSelected) => {
        const newSelected = prevSelected.some((o) => o.value === option.value)
          ? prevSelected.filter((o) => o.value !== option.value)
          : [option];
        onSelect(newSelected);
        return newSelected;
      });
    }

    setSearchTerm("");
  };

  const handleRemove = (option: OptionType) => {
    setSelectedOptions((prevSelected) => {
      const newSelected = prevSelected.filter((o) => o.value !== option.value);
      onSelect(newSelected);
      return newSelected;
    });
  };

  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span className="bg-blue-300" key={i}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div
      id={id}
      className="relative w-full space-y-3 z-[1050]"
      ref={containerRef}
    >
      {optionLabel ? (
        <div className="w-full px-4 font-bold">{optionLabel}</div>
      ) : null}
      <div
        className={`flex flex-wrap items-center px-5 py-3 border border-gray-400 rounded-full cursor-pointer ${outlined ? "" : "bg-gray-400"}`}
        onClick={() => setShowOptions(true)}
      >
        {selectedOptions.map((option) => (
          <div
            className="flex items-center h-full mr-2 text-white bg-blue-500 rounded-full"
            key={option.value}
          >
            <span className="mx-2 my-1">{option.label}</span>
            <button
              className="flex items-center justify-center w-5 h-5 mr-1 font-bold text-black bg-red-300 border border-gray-600 rounded-full cursor-pointer"
              onClick={() => handleRemove(option)}
            >
              <span className="mb-1">x</span>
            </button>
          </div>
        ))}
        <input
          className={`flex-grow p-0 cursor-pointer focus:outline-none ${outlined ? "" : "bg-gray-400"}`}
          type="text"
        />
      </div>
      {showOptions && (
        <div className="absolute z-50 w-full p-2 mt-2 overflow-y-auto bg-white border border-gray-400 max-h-48 rounded-3xl">
          {withSearch ? (
            <div className="flex items-center w-full gap-2 p-3 mb-2 border border-gray-400 rounded-2xl">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  stroke="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </span>
              <input
                placeholder={placeholder}
                className="flex-grow w-full focus:outline-none"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          ) : null}

          {filteredOptions.map((option) => (
            <div
              className={`hover:bg-blue-300 p-2 cursor-pointer rounded-xl ${selectedOptions.some((o) => o.value === option.value) ? "bg-blue-300" : "bg-white"}`}
              key={option.value}
              onClick={() => handleSelect(option)}
            >
              {getHighlightedText(option.label, searchTerm)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectWithSearchCustom;
