import React from "react";
import "./records-count-selector.css"
type RecordCountProps = {
  max: number;
  handleSelect: (selectedPageCount: number) => void;
};

const RecordsCountSelector: React.FC<RecordCountProps> = (props) => {
  const { max, handleSelect } = props;
  const optionsList = Array.from({ length: max }, (_, index) => index + 1);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleSelect(Number(event.target.value));
  };
  return (
    <select onChange={handleChange}>
      <option value="" disabled>
        Select number of records
      </option>
      {optionsList.map((value) => {
        return (
          <option key={value} value={value}>
            {value}
          </option>
        );
      })}
    </select>
  );
};

export default RecordsCountSelector;
