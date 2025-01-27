import { useMutation, useQueryClient } from "react-query"
import { request } from "../tools/axiosUtils"

const getRequest = ({
  id,
  firstName,
  lastName,
  email,
  phone,
}: { id: string, firstName: string, lastName: string, email: string, phone: string }) => {
  const body = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone
  }
  return request({ url: `/users/${id}`, method: 'put', data: body })
}

export const updateUser = () => {
  const queryClient = useQueryClient()
  return useMutation(
    getRequest,
    {
      onError: (_error: any, context: any) => {
        queryClient.setQueryData('users', context.previousUsers)
      },
      onSettled: () => {
        queryClient.invalidateQueries('userById')
      },
    }
  )
}
