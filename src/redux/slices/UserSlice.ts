import {createSlice,createAsyncThunk, type Reducer} from '@reduxjs/toolkit'
import type { UserType } from '../../types/BooksSliceType'
import type { UserSliceType } from '../../types/UserSliceType';

export const fetchUsers=createAsyncThunk('users',async(url:string,thunkApi)=>{
    try{
        // fetching user data from api
        let res:Response= await fetch(url);
        
        if(res.status===200){
            let userData:UserType[]=await res.json()
            return userData;
        }
        else{
            return thunkApi.rejectWithValue(res.statusText)
        }
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})


// initial state value
const userInitialValue:UserSliceType={
    users:[],
    currentUser: null,
    status:"idle",
    error:null
}

// create slice
const userSlice=createSlice({
    name:"users",
    initialState:userInitialValue,
    reducers:{
        setCurrentUser:(state,action)=>{
        state.currentUser=action.payload;
    },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending,(state)=>{
            state.status="loading";
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.status="successed";
            state.users=action.payload;
            state.error=null;
            // state.currentUser=action.payload;
        })
        .addCase(fetchUsers.rejected, (state) => {
            state.status="failed";
            state.error="Failed to fetch users";
        });
        
    }
})

export const userState:Reducer<UserSliceType>=userSlice.reducer

// to tell all components this user logined
export const { setCurrentUser } = userSlice.actions;
