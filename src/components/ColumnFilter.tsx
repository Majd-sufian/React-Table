import { useState } from "react";
import { useAsyncDebounce } from "react-table";

interface ColumnFilterProps {
  column: {
    filterValue: string;
    setFilter: (filterValue: string) => void;
  };
}

const ColumnFilter: React.FC<ColumnFilterProps> = ({
  column: { filterValue, setFilter },
}) => {
  const [value, setValue] = useState(filterValue);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
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

export default ColumnFilter;
