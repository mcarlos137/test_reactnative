import { useQuery } from "react-query"
//TOOLS
import { request } from "../tools/axiosUtils"

const getRequest = ({ }) => {
    return request({ url: `/users`, method: 'get' })
}

export const getUsers = () => {
    return useQuery(
        ['users'],
        getRequest,
        {
            enabled: true,
            select: (res) => {
                return res.data
            },
            onSuccess: (data) => {
                return data
            },
            staleTime: 30000
        }
    )
}
