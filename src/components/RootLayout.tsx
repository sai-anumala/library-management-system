import { Outlet } from "react-router"
import Navgation from "./Navgation"


function RootLayout() {
  return (
    <div>
        <Navgation/>
        <Outlet/>
    </div>
  )
}

export default RootLayout