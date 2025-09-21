import { Modal, ModalBody } from "react-bootstrap"
import {useForm} from 'react-hook-form'
import type { LoginType, UserType } from "../types/BooksSliceType";
import {useSelector,useDispatch} from 'react-redux'
import { fetchUsers, setCurrentUser } from "../redux/slices/UserSlice";
import type { DispatchType, RootState } from "../redux/store";
import { useEffect, useState } from "react";


type PropsLoginType={
    login:boolean;
    onClose:()=>void;
}
function Login(props:PropsLoginType) {

    // successful registeration message to display 
    const [successMesg,setSuccessMsg]=useState<string>("")

    // react-hook-form validation
    const {register,handleSubmit,reset,formState:{errors}}=useForm<LoginType>()


    // fucntion to handle submit values
    function toHandleSubmit(data:LoginType){

        // console.log(data)
        let user:UserType[]=users.filter(userObj=>data.email===userObj.email && data.password===userObj.password)

        // console.log(user)
        // to notify user successfully logined 
        if(user.length!==0){
            dispatch(setCurrentUser(user[0]));
            setSuccessMsg(`Logined Successfully as ${user[0].username}`)
            setTimeout(()=>{
                props.onClose()
                reset()
                setSuccessMsg("")
            },2000)
        }
        else{
            setSuccessMsg("Invalid Credntials. Login Again....")
            setTimeout(()=>{
                props.onClose()
                setSuccessMsg(""); 
            },2400);
           
        }
        
    }
    
    // get and send data to store
    let {users}=useSelector((state:RootState)=>state.users)
    //   console.log(users)
    let dispatch=useDispatch<DispatchType>()

    useEffect(()=>{
            const actionObj: ReturnType<typeof fetchUsers> = fetchUsers("http://localhost:3000/users");
            dispatch(actionObj);
        },[]);

  return (
    <div>
        <Modal show={props.login}>
            <ModalBody>
               <div className="d-flex align-items-center justify-content-between mb-3">
                    <h4 className="text-dark lead fs-2 ms-2">Login</h4>
                    <button type="button" className="btn btn-danger" onClick={props.onClose}>X
                    </button>
                    
                 </div>
                 {successMesg && <p className="text-success text-center lead mx-auto">{successMesg}</p>}
                <form onSubmit={handleSubmit(toHandleSubmit)}>
                    <input type="email" {...register("email", {required:"Email is required",
                        pattern:{
                            value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+(.com)$/,
                            message: "Invalid email address"
                        }
                        })}
                        className="form-control mb-2"
                        placeholder="Enter your registered email id"
                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}

                    <input type="password"
                        {...register("password",{ required: "Password is required", minLength:{value:4, message:"Minimum 4 characters reuired"}})} className="form-control mb-2" placeholder="Enter your password"/>
                    {errors.password && <p className="text-danger">{errors.password.message}</p>}

                    <button type="submit" className="btn btn-dark text-white w-100">
                        Login
                    </button>
                </form>
            </ModalBody>
        </Modal>
    </div>
  )
}

export default Login