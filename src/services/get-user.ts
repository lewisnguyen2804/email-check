import { callApi } from "@/lib/fetch"
import { FUNCTIONS } from "@/models/enum"

export interface GetUserDto {
  tenant?: string
  prefix?: FUNCTIONS.SERVICE
  email: string
}

export async function getUserApi(base: string, { tenant, prefix, email }: GetUserDto) {
  try {
    const query = new URLSearchParams({
      tenant: tenant?.toString() || '',
      prefix: prefix?.toString() || '',
      email: email?.toString() || ''
    })

    const { data = [] } = await callApi(base, `/auth-api/internal/users/check?${query}`, {
      method: 'GET',
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY || ''
      }
    }) || {}

    console.log({ data })
    return { data }
  } catch (error) {
    console.log({ error })
    return { data: [] }
  }
}