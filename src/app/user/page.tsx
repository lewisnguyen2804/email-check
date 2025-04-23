import { Menu } from "@/components/core/menu";
import Endpoint from "@/components/user/endpoint";
import FormCheck from "@/components/user/form-check";
import { FUNCTIONS } from "@/models/enum";
import { getUserApi } from "@/services/get-user";
import { Suspense } from "react";


export default async function User({ searchParams }: {
  searchParams: {
    tenant?: string
    prefix?: FUNCTIONS.SERVICE
    email: string,
    env: string
  }
}) {
  const email = searchParams.email || ''
  const prefix = searchParams.prefix
  const tenant = searchParams?.tenant || ''
  const base = searchParams?.env || ''

  const { data } = await getUserApi(base, { tenant, prefix, email })

  return (
    <div>
        <Menu />
        <div className="container mx-auto px-4">
          <Suspense fallback={<p>Loading feed...</p>}>
            <FormCheck />

            {data.length > 0 ?
              (<div className="mx-auto max-w-3xl p-8 ">
                {data?.map((user: any, index: number) => (
                  <Endpoint url={user.url} key={index.toString()} locations={user.locations} countries={user.countries} />
                ))}
              </div>)
              : (
                <div className="text-center">No data</div>
              )}
          </Suspense>
      </div>
    </div>

  )
}