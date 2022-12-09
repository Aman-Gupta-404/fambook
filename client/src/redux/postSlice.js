import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  postArray: [],
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPost: (state, action) => {

      // console.log('get post accessed: ', action.payload)
      state.postArray = action.payload;
      return state;
      // console.log(state.postArray);
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
export const { getPost, decrement, incrementByAmount } = postSlice.actions

export default postSlice.reducer