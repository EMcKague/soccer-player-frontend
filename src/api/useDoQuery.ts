import { useQuery } from "react-query"
import { isSingleObject } from "../helpers/array"
import { doGet } from "./api"

interface queryProps {
    path: string
    objectClass?: any
}

const defaultData = {
    list: [],
    dict: {}
  }

export interface queryResult {
    data: any,
    isLoading: boolean,
    refetch: () => void
}

export const useDoQuery = (parameters: queryProps): queryResult => {
    const { objectClass } = parameters
    let path = parameters.path
  
    let key = path.substr(1).split('/')
    key = key.slice(0, -1).concat(key.slice(-1)[0].split('?'))
  
    const queryFunction = (): Promise<any> => doGet({ path })
      .then((response: any) => { 
        console.log({response})
        return handleResponse(response, objectClass)
        }
      )

  
    const fallbackData = isSingleObject(key) ? null : defaultData
    const { data, isFetched, isFetching, refetch } = useQuery(key, queryFunction, {
      staleTime: 120000,
      retry: false,
      placeholderData: fallbackData,
    })

    const isLoading = isFetching && !isFetched
  
    return { data, isLoading, refetch }
  }

  export const handleResponse = (response: any, ObjectClass: any): any => {
    if (Array.isArray(response)) {
      return handleListResponse(response, ObjectClass)
    } else {
      return new ObjectClass({ row: response })
    }
  }

  const handleListResponse = (data: any, ObjectClass: any): any => {
    const list = data.map((row: any) => { const obj = new ObjectClass({ row }); return obj })
    const dict: any = {}
    for (const item of list) { dict[item.id] = item }
    return ({ list, dict })
  }