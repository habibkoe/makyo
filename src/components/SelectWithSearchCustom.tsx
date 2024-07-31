import React, { useState, useEffect, useRef } from "react";

interface OptionType {
  label: string;
  value: string;
}

interface Props {
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
    <div id={id} className="relative w-full space-y-3 z-[1050]" ref={containerRef}>
      {optionLabel ? (
        <div className="w-full px-4 font-bold">{optionLabel}</div>
      ) : null}
      <div
        className={`flex flex-wrap items-center px-5 py-3 border border-gray-400 rounded-full cursor-pointer ${outlined ? '' : 'bg-gray-400'}`}
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
              x
            </button>
          </div>
        ))}
        <input className={`flex-grow p-0 cursor-pointer focus:outline-none ${outlined ? '' : 'bg-gray-400'}`} type="text" />
      </div>
      {showOptions && (
        <div className="absolute z-50 w-full p-2 mt-2 overflow-y-auto bg-white border border-gray-400 max-h-48 rounded-3xl">
          {withSearch ? (
            <input
              className="flex-grow w-full px-5 py-3 mb-2 border border-gray-400 rounded-2xl focus:outline-none"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
