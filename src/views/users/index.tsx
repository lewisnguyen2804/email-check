import { Menu } from "@/components/core/menu";
import { FUNCTIONS } from "@/models/enum";
import { getUserApi } from "@/services/get-user";
import { Suspense, useEffect, useState } from "react";
import FormCheck from "./form-check";
import Endpoint from "./endpoint";
import { useSearchParams } from "react-router";

const Users = () => {
  const [data, setData] = useState<any[]>([]);
  const [searchParams] = useSearchParams();

  const getData = async () => {
    const base = searchParams.get("env") || "stg";
    const tenant = searchParams.get("tenant") || "";
    const prefix = searchParams.get("prefix") as FUNCTIONS.SERVICE;
    const email = searchParams.get("email") || "";

    if (!tenant && !prefix && !email) {
      return;
    }

    const res = await getUserApi(base, {
      tenant,
      prefix,
      email,
    });

    setData(res?.data || []);
  };

  useEffect(() => {
    getData();
  }, [JSON.stringify(searchParams)]);

  return (
    <div>
      <Menu />
      <div className="container mx-auto px-4">
        <Suspense fallback={<p>Loading feed...</p>}>
          <FormCheck />

          {data.length > 0 ? (
            <div className="mx-auto max-w-3xl p-8 ">
              {data?.map((user: any, index: number) => (
                <Endpoint
                  url={user.url}
                  key={index.toString()}
                  locations={user.locations}
                  countries={user.countries}
                />
              ))}
            </div>
          ) : (
            <div className="text-center">No data</div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Users;
