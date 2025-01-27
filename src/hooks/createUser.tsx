import { useMutation, useQueryClient } from "react-query"
import { request } from "../tools/axiosUtils"

const doRequest = ({
  firstName,
  lastName,
  email,
  phone,
}: { firstName: string, lastName: string, email: string, phone: string }) => {
  const body = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone
  }
  return request({ url: `/users/save`, method: 'post', data: body })
}

export const createUser = () => {
  const queryClient = useQueryClient()
  return useMutation(
    doRequest,
    {
      onError: (_error: any, context: any) => {
        queryClient.setQueryData('users', context.previousUsers)
      },
      onSettled: () => {
        queryClient.invalidateQueries(['userById'])
      },
    }
  )
}
