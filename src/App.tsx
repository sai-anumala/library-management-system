
import Books from "./components/Books"
import {createBrowserRouter,RouterProvider} from 'react-router'
import RootLayout from "./components/RootLayout"


function App() {

  // create browser obj to provide paths to components
  let browserObj=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      children:[
        {
        index:true,
        element:<Books/>
      },
      {
        path:"books",
        element:<Books/>
      }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={browserObj}/>
    </div>
    
  )
}

export default App