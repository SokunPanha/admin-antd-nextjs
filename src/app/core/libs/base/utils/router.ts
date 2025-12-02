import {useNavigate, useSearchParams} from 'react-router-dom'

export type UseRouterReturnType = ReturnType<typeof useRouter>

export const useRouter = () => {
  let navigate = useNavigate()
  let [searchParams] = useSearchParams()
  return {
    push: ({path, query = {},pageSearch = false ,excludeQuery = [],replace = false}: {path: string, query?: any,pageSearch?:boolean,excludeQuery?: string[],replace?: boolean}) => {
      let search = pageSearch ? searchParams : new URLSearchParams()
      Object.keys(query).forEach(key => {
        search.set(key, query[key])
      })
      excludeQuery.forEach(key => {
        search.delete(key)
      })
      navigate(`${path}${search}` , {replace})
    },
    replace: ({path, query = {},pageSearch = false ,excludeQuery = []}: {path: string, query?: any,pageSearch?:boolean,excludeQuery?: string[]}) => {
      let search = pageSearch ? searchParams : new URLSearchParams()
      Object.keys(query).forEach(key => {
        search.set(key, query[key])
      })
      excludeQuery.forEach(key => {
        search.delete(key)
      })
      navigate(`${path}?${search}` , {replace: true})
    },
    back: () => {
      navigate(-1)
    }
  }
}



export const useQuery = () : any => {
  // todo check
  let urlSearchParams = new URLSearchParams(location.search)
  let query: any = {}
  urlSearchParams.forEach((value, key) => {
    query[key] = value
  })
  return query;
}
