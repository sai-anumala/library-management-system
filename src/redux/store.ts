import {configureStore} from '@reduxjs/toolkit'
import { bookState } from './slices/BooksSlice';
import { userState } from './slices/UserSlice';
import { registerState } from './slices/RegisterSlice';

// create a redux store 
export const store=configureStore({
    reducer:{
        books:bookState,
        users:userState,
        register:registerState
    }
})

// types of the store
export type RootState=ReturnType<typeof store.getState>
export type DispatchType=typeof store.dispatch;