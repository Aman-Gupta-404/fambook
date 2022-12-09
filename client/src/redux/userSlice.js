import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    user: {}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action) => {
      // console.log('get post accessed: ', action.payload)
      state = {...state, user: action.payload.user, isLoggedIn: true};
      // console.log(state)
      return state;
    },
    refreshUser: (state, action) => {
      // console.log('get post accessed: ', action.payload)
      state = {...state, user: action.payload.user, isLoggedIn: true};
      // console.log(state)
      return state;
    },
    deleteUser: (state, action) => {
      // console.log('get post accessed: ', action.payload)
      state = {...state, user: {}, isLoggedIn: false};
      // console.log(state)
      return state;
    },
    decrement: (state) => {
      // state.value -= 1
    },
    incrementByAmount: (state, action) => {
      // state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getUser, deleteUser, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer