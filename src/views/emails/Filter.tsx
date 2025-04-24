import { FUNCTIONS } from "@/models/enum";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useCallback, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Filter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const values = Object.values(FUNCTIONS.EMAIL_TEMPLATE);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearch = (value: string) => {
    setSearch(value);
    navigate(`${location.pathname}?${createQueryString("search", value)}`);
  };
  const debounced = useDebounceCallback(handleSearch, 1000);

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search"
        defaultValue={search}
        onChange={(e) => debounced(e.target.value)}
      />
      <Select
        onValueChange={(value) =>
          navigate(
            `${location.pathname}?${createQueryString("template", value)}`
          )
        }
      >
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Template" />
        </SelectTrigger>
        <SelectContent>
          {values.map((value, index) => (
            <SelectItem key={index} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
