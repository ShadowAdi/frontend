import { Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

function App() {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col max-w-screen gap-4 overflow-x-hidden" >
    <Navbar />
    <Container maxWidth="lg" className="py-8 w-full flex-1 ">
      <Outlet />
    </Container>
  </div>
  )
}

export default App
