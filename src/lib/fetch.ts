
export const rootUrl = "https://stghrms.paxanimi.ai"

const urlMap: {
  [key: string]: string;
} = {
  int: "https://inthrms.paxanimi.ai",
  dev: "https://devhrms.paxanimi.ai",
  stg: "https://stghrms.paxanimi.ai",
  prod: "https://terralogic.paxanimi.ai",
};

export const callApi = async (base: string, url: string, options?: RequestInit) => {
  const baseUrl = urlMap[base] || rootUrl

  try {
    const result = await fetch(baseUrl + url, {
      ...options,
      cache: "no-store",
    })

    if (result.ok) {
      return await result.json()
    }
    const msg = await result.text()
    console.log(`Error: ${msg} ${result.statusText} when call api ${baseUrl}${url}`)
  } catch (error) {
    console.log(error)
  }
}
