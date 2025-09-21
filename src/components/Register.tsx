import { Modal, ModalBody } from "react-bootstrap";
import type { UserType } from "../types/BooksSliceType";
import { useForm } from "react-hook-form";
import {useDispatch} from 'react-redux'
import { registerUser } from "../redux/slices/RegisterSlice";
import type { DispatchType } from "../redux/store";
import { useState } from "react";


// props data type
export type RegisterPropsType={
    register:boolean;
    onClose:()=>void;
}



function Register(props:RegisterPropsType) {
//   const [showModal,setShowModal]=useState<boolean>(false);

// successful registeration message to display 
const [successMesg,setSuccessMsg]=useState<string>("")

// sending userdata to store
const dispatch=useDispatch<DispatchType>()


    // react-hook-form validation
    const {register,handleSubmit,reset}=useForm<UserType>()

    // fucntion to handle submit values
   async function toHandleSubmit(data:UserType){

        try{
            await dispatch(registerUser({ url: "http://localhost:3000/users", userData: data }));
             setSuccessMsg("User Registered Successfully!");
            } 
        catch(err){
                // console.log(err)
                setSuccessMsg("Registration failed. Try again...");
            }

            // to stop modal 3secs to user read the status
            setTimeout(()=>{
                reset()
                setSuccessMsg("")
                props.onClose()

            },2000);
    }

   
    
  return (
    <div>
        <Modal show={props.register} >
            <ModalBody>
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <h4 className="text-dark lead fs-2 ms-2">REgister</h4>
                    <button type="button" className="btn btn-danger" onClick={props.onClose}>X
                    </button>
                 </div>
                
                 {/* Success message */}
                {successMesg && <p className="text-success text-center fs-4 ">{successMesg}</p>} 

                <form onSubmit={handleSubmit(toHandleSubmit)}>
                    <input type="text" {...register("username")} className="form-control mb-2" placeholder="Enter Username"/>
                    <input type="date" {...register("dob")} className="form-control mb-2" />
                    <input type="tel" {...register("mobile")} className="form-control mb-2" placeholder="Enter Contact Number"/>
                    <input type="email" {...register("email")} className="form-control mb-2" placeholder="Enter your email id" />
                    <input type="password" {...register("password")} className="form-control mb-2" placeholder="Enter your Password"/>
                    <button type="submit" className="btn btn-dark text-white">Sign Up</button>
                </form>
               
                  
            </ModalBody>
        </Modal>
    </div>
  )
}

export default Register