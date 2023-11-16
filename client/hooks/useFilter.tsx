export const useFilter = ({ ...args }: any): string => {
    const filter = {
      ...args,
      ...(args?.page && { page: args?.page?.toString() }),
    }
    const searchParams = '?' + new URLSearchParams(filter).toString()
    return searchParams
  }