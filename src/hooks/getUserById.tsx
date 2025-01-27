import { useQuery } from "react-query"
//TOOLS
import { request } from "../tools/axiosUtils"

const getRequest = ({ queryKey }: { queryKey: string[] }) => {
    return request({ url: `/users/${queryKey[1]}`, method: 'get' })
}

export const getUserById = (id: string = '') => {
    return useQuery(
        ['userById', id],
        getRequest,
        {
            enabled: id !== '',
            select: (res) => res.data,
            onSuccess: (data) => {
                return data
            },
            staleTime: 30000
        }
    )
}
