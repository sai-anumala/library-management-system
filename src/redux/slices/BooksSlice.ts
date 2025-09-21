import {createAsyncThunk, createSlice, type Reducer} from '@reduxjs/toolkit'
import type { BooksSliceType, BookType } from '../../types/BooksSliceType'


// api call to get books
export  const fetchBooks=createAsyncThunk('books',async(url:string,thunkApi)=>{

    try{
            let res:Response=await fetch(url)
            // status of api call
            if(res.status===200){
                let booksData:BookType[] = await res.json()
                return booksData
            }
            else{
                return thunkApi.rejectWithValue(res.statusText);
            }
        }
    catch(err){
            return thunkApi.rejectWithValue(err)
        }
})
// intial value
const booksInitialState:BooksSliceType={
    books:[],
    status:"idle",
    error:null
}

export const booksSlice=createSlice({
    name:"books",
    initialState:booksInitialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchBooks.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchBooks.fulfilled,(state,action)=>{
            state.status="successed"
            state.books=action.payload;
            state.error=null;
        })
        .addCase(fetchBooks.rejected,(state)=>{
            state.status="failed";
            state.error="failed to fetch try again...!";
        })
    }
})

export const bookState:Reducer<BooksSliceType>=booksSlice.reducer;