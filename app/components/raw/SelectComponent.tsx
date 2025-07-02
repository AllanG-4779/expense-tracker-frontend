import React from "react";
import Select from "react-select";

const SelectComponent: React.FC<{
  data: { id: unknown; name: string }[];
  title: string;
  value: unknown;
  onChange?: (e: unknown) => void;
}> = ({ data, title, value, onChange }) => {
  return (
    <div className="flex-2">
      <label htmlFor="Select" className="font-semibold text-sm text-slate-600">
        {title}
      </label>
      <Select
        value={value}
        onChange={onChange}
        className="my-2 w-full text-slate-600 focus:ring-2  focus:ring-amber-500 focus:border-amber-500 "
        isSearchable
        options={[
          {
            options: data.map((item) => ({ value: item.id, label: item.name })),
          },
        ]}
      />
    </div>
  );
};

export default SelectComponent;
