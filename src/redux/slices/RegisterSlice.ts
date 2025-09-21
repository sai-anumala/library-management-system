import {createSlice,createAsyncThunk, type Reducer} from '@reduxjs/toolkit'
import type { RegisterSliceType, UserType } from '../../types/BooksSliceType'


// create api call to store data
export const registerUser=createAsyncThunk('registerUser',async(
    data:{
        url:string,
        userData:UserType
    },thunkApi)=>{
        try{
            let res:Response=await fetch(data.url,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data.userData)
            })

            // to check if user data stored or not if stored it will return 201 status 
            if(res.status===201){
                const newUser:UserType=await res.json()
                return newUser;
            }
            else{
                return thunkApi.rejectWithValue(res.statusText)
            }
        }catch(err){
            return thunkApi.rejectWithValue(err);
        }
    })


// initial state value
const registerUserInitialValue:RegisterSliceType={
    // username:"",
    // email:"",
    // dob:"",
    // mobile:"",
    // password:"",
    user:[] as UserType[],
    status:"idle",
    error:null
}
// create a slice
const registerSlice=createSlice({
    name:'registerUser',
    initialState:registerUserInitialValue,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(registerUser.pending,(state)=>{
            state.status="loading"
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.status="successed";
            state.user.push(action.payload)
            state.error=""
        })
        .addCase(registerUser.rejected,(state)=>{
            state.status="failed",
            state.error="failed to post"
        })
    },
})


// export slice reducers to store
export const registerState:Reducer=registerSlice.reducer