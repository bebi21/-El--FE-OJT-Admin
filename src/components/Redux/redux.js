import { configureStore } from '@reduxjs/toolkit'
import counterVideo from './counterVideo/counterVideo'

export const store = configureStore({
  reducer: {
    counter: counterVideo,
  },
})