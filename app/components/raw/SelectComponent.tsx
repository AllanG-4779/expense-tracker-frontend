import React from "react";
import Select from "react-select";
type OptionType = { value: unknown; label: string };
const SelectComponent: React.FC<{
  data: { id: unknown; name: string }[];
  title: string;
  value: unknown;
  onChange?: (selectedOption: OptionType | null) => void;
}> = ({ data, title, value, onChange }) => {
  const dataMap = data.map((each) => ({ value: each.id, label: each.name }));
  const modifiedValue = dataMap.find((item) => item.value === value);
  return (
    <div className="flex-2">
      <label htmlFor="Select" className="font-semibold text-sm text-slate-600">
        {title}
      </label>
      <Select
        value={modifiedValue}
        onChange={onChange}
        className="my-2 w-full text-slate-600 focus:ring-2  focus:ring-amber-500 focus:border-amber-500 "
        isSearchable
        options={[
          {
            options: dataMap,
          },
        ]}
      />
    </div>
  );
};

export default SelectComponent;
