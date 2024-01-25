import React from "react"
import { createBrowserRouter,  createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import MainLayout from "./layouts/MainLayout.tsx"
import Appointments from "./pages/Appointments.tsx"
import Clients from "./pages/Clients.tsx"
import StaffMembers from "./pages/Staff-members.tsx"


const App: React.FC = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Appointments />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/staff-members" element={<StaffMembers />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App