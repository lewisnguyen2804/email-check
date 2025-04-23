import { callApi } from "@/lib/fetch"
import { FUNCTIONS } from "@/models/enum"

export interface GetLogDto {
  search?: string
  template?: FUNCTIONS.EMAIL_TEMPLATE
  page?: number
  limit?: number
}

export async function getLogsApi(base: string, { search, template, page = 1, limit = 10 }: GetLogDto) {
  let loading = true
  try {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search: search?.toString() || '',
      template: template?.toString() || ''
    })
    const { data } = await callApi(base, `/notification-api/send-mail/logs?${query}`, {
      method: 'GET',
    })

    loading = false
    return { data, loading }
  } catch (error) {
    console.log(error)
    loading = false
    return { data: [], loading }
  }
}
