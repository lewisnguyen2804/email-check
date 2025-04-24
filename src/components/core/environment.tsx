"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useCallback } from "react";

export const Environment = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  return (
    <Select
      onValueChange={(value) => {
        router.push(`${pathname}?${createQueryString("env", value)}`);
        router.refresh();
      }}
      defaultValue={searchParams.get("env") || "stg"}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a env" />
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

