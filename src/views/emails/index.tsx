import Loading from "@/components/core/loading";
import { Menu } from "@/components/core/menu";
import { FUNCTIONS } from "@/models/enum";
import { SendMail } from "@/models/send-mail";
import { getLogsApi } from "@/services/get-logs";
import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import { useDebounceCallback } from "usehooks-ts";
import EmailTable from "./EmailTable";
import Filter from "./Filter";

const LIMIT = 10;

const Emails = () => {
  const [data, setData] = useState<SendMail[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const controllerRef = useRef<AbortController | null>(null);

  const getData = async () => {
    setLoading(true);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const currentPage = parseInt(searchParams.get("page") || "1");
      const template: FUNCTIONS.EMAIL_TEMPLATE = searchParams.get(
        "template"
      ) as FUNCTIONS.EMAIL_TEMPLATE;
      const search = searchParams.get("search") || "";
      const base = searchParams.get("env") || "stg";

      const res = await getLogsApi(
        base,
        {
          page: currentPage,
          limit: LIMIT,
          template,
          search,
        },
        controller.signal
      );

      setData(res?.data);
      setTotalPages(Math.ceil(res?.total / LIMIT));
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("Request aborted");
        return; // Don't call `complete()` if aborted
      } else {
        console.error("Fetch error", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const debouceGetData = useDebounceCallback(getData, 0);

  useEffect(() => {
    debouceGetData();
    return () => {
      controllerRef.current?.abort();
    };
  }, [location.search]);

  return (
    <div className="min-h-screen">
      <div className="p-4 flex flex-row w-full justify-between items-center gap-2 border-b border-b-slate-200 flex-wrap">
        <Menu />
        <Filter />
      </div>
      <div className="flex flex-col w-full p-4 overflow-hidden">
        {loading ? (
          <Loading text="Loading emails..." />
        ) : (
          <EmailTable data={data} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
};

export default Emails;
