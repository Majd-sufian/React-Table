import { useState } from "react";
import { useAsyncDebounce } from "react-table";

interface GlobalFilterProps {
  globalFilter: any;
  setGlobalFilter: any;
}

const GlobalFilter: React.FC<GlobalFilterProps> = ({
  globalFilter,
  setGlobalFilter,
}) => {
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 1000);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
};

export default GlobalFilter;
