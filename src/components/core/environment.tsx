import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useCallback } from "react";

export const Environment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <Select
      onValueChange={(value) => {
        navigate(`${location.pathname}?${createQueryString("env", value)}`, {
          replace: true,
        });
      }}
      defaultValue={searchParams.get("env") || "stg"}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select an env" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="int">Integration</SelectItem>
          <SelectItem value="dev">Dev</SelectItem>
          <SelectItem value="stg">Staging</SelectItem>
          <SelectItem value="prod">Production</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
