import { callApi } from "@/lib/fetch"
import { FUNCTIONS } from "@/models/enum"

export interface GetLogDto {
  search?: string
  template?: FUNCTIONS.EMAIL_TEMPLATE
  page?: number
  limit?: number
}

export async function getLogsApi(
  base: string,
  { search, template, page = 1, limit = 10 }: GetLogDto,
  signal?: AbortSignal
) {
  try {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search: search || "",
      template: template || "",
    });

    const res = await callApi(base, `/notification-api/send-mail/logs?${query}`, {
      method: 'GET',
      signal,
    });

    return {
      data: res?.data || [],
      total: res?.total || 0,
    };
  } catch (error) {
    console.error(error);
    return {
      data: [],
      total: 0,
    };
  }
}
