import { NavLink } from "react-router";
import { FaBook } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import Login from "./Login";
import { useState } from "react";
import Register from "./Register";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { BiUserCircle } from "react-icons/bi";
import Welcome from "./Welcome";
import FeaturedBooks from "./FeaturedBooks";


function Navigation() {

    const [login,setLogin]=useState<boolean>(false)
    const [signUp,setSignUp]=useState<boolean>(false)

    // to handle Register Modal
    const handleRegisterModalShow:()=>void=()=>setSignUp(true);
    const handleRegisterModalClose:()=>void=()=>setSignUp(false);

    // to handle login modal
    const handelLoginModalShow:()=>void=()=>setLogin(true);
    const handleLoginModalClose:()=>void =()=>setLogin(false);

    // to gwt current user data from store
    const {currentUser}=useSelector((state: RootState)=>state.users);

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
      {/* Logo */}
      <NavLink className="navbar-brand d-flex align-items-center ms-5" to={currentUser ? "/books" : "/"}>
        <FaBook size={30} className="text-dark me-2" />
        <span className="fs-4 fw-bold">OLMS</span>
      </NavLink>
        <div className="input-group ms-auto" style={{ maxWidth: "28rem" }}>
            <span className="input-group">
                <span className="input-group-text bg-white border-end-0">
                    <BiSearch />
                </span>
                <input
                    type="text"
                    name="search"
                    id="search"
                    className="form-control border-start-0"
                    placeholder="Search by Bookname, author, title..."/>
            </span>
        </div>
      {/* Nav Links */}
      <ul className="navbar-nav d-flex flex-row ms-auto me-5 gap-1">

      { currentUser ? (
          <div className="d-flex flex-row align-items-center gap-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="">
                <span style={{fontSize:"1.2rem"}}>DashBoard</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="">
                <span style={{fontSize:"1.2rem"}}>Dues & fines</span>
              </NavLink>
            </li>


            <li className="nav-item">
              <button className="btn btn-dark text-white">Logout</button>
            </li>

            <li className="nav-link d-flex flex-column align-items-center" style={{lineHeight: "0.5rem"}}>
              <NavLink className="nav-link" to="">
                <BiUserCircle style={{width:"2.5rem", height:"2.5rem"}}/>
              </NavLink>
              <span className="text-primary small text-muted">Hello {currentUser.username}...</span>
            </li>

          </div>
        ) :(
          <>        
          {/* Login button */}
        <li className="nav-item">
            <button className="btn btn-light text-dark" onClick={handelLoginModalShow}>Login</button>
        </li>
         <Login login={login} onClose={handleLoginModalClose} />

        {/* Sign up button */}
        <li className="nav-item">
            <button className="btn btn-dark text-white" onClick={handleRegisterModalShow}>Sign Up</button>
                <Register register={signUp} onClose={handleRegisterModalClose} />
        </li>
        </>
        )}
      </ul>
    </nav>
    <Welcome />
    <FeaturedBooks/>
    </div>

  );
}

export default Navigation;