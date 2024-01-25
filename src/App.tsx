import React from "react"
import { createBrowserRouter,  createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { Provider } from 'react-redux';
import { store } from "./store/index.ts";
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App