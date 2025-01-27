import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types'

export type UserState = User

const initialState: UserState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload
    },
  },
})

export const { setId, setFirstName, setLastName, setEmail, setPhone } = userSlice.actions
export default userSlice.reducer
