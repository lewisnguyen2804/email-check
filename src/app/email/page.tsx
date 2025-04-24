// app/email/page.tsx (Server Component)
import { Menu } from "@/components/core/menu";
import EmailTable from "@/components/emails/EmailTable";
import Filter from "@/components/emails/Filter";
import { FUNCTIONS } from "@/models/enum";
import { getLogsApi } from "@/services/get-logs";

export default async function EmailPage({
  searchParams,
}: {
  searchParams: {
    page: string;
    template: FUNCTIONS.EMAIL_TEMPLATE;
    search: string;
    env: string;
  };
}) {
  const LIMIT = 10;
  const currentPage = parseInt(searchParams.page || "1");
  const template = searchParams?.template || "";
  const search = searchParams?.search || "";
  const base = searchParams?.env || "stg";

  const { data } = await getLogsApi(base, {
    page: currentPage,
    limit: LIMIT,
    template,
    search,
  });

  return (
    <div className="min-h-screen">
      <div className="p-4 flex flex-row w-full justify-between items-center gap-2 border-b border-b-slate-200 flex-wrap">
        <Menu />
        <Filter />
      </div>
      <div className="flex flex-col w-full p-4 overflow-hidden">
        <EmailTable data={data} />
      </div>
    </div>
  );
}
export const fetchCache = "force-no-store";
