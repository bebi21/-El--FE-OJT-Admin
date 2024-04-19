import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "https://www.youtube.com/watch?v=h6RONxjPBf4&list=RD1qFzxH3R9rQ&index=2",
}

export const counterVideo = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   
    newVideo: (state, action) => {
      console.log(action.payload)
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { newVideo } = counterVideo.actions

export default counterVideo.reducer