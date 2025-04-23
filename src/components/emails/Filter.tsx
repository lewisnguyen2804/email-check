"use client"

import { FUNCTIONS } from "@/models/enum";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useCallback, useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Filter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const values = Object.values(FUNCTIONS.EMAIL_TEMPLATE);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debounced = useDebounceCallback(setSearch, 3000);

  useEffect(() => {
    router.push(`${pathname}?${createQueryString("search", search)}`);
  }, [search, createQueryString, router, pathname]);

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search"
        defaultValue={search}
        onChange={(e) => debounced(e.target.value)}
      />
      <Select
        onValueChange={(value) =>
          router.push(`${pathname}?${createQueryString("template", value)}`)
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

export default Filter
