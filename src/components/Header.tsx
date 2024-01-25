import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {

  interface RouteData {
    label: string;
    to: string
  }

  const routesData: RouteData[] = [
    {
      label: 'Appointments',
      to: '/',
    },
    {
      label: 'Clients',
      to: '/clients',
    },
    {
      label: 'Staff Members',
      to: '/staff-members',
    }
  ]
 
  const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      fontSize: isActive ? '20px' : '18px',
      borderBottom: isActive ? 'solid 2px black' : 'none',
      color: isActive ? 'black' : '#565D6D'
    }
  }

  const renderedRoutes = routesData.map(route => {
    return (
      <NavLink key={route.label} to={route.to} style={navLinkStyles} className="flex gap-2 items-center p-4">
        <div> { route.label } </div>
      </NavLink>
    )
  })

  return (  
    <div className="flex p-2 border-b border-gray-500"> 
      { renderedRoutes }
    </div>
  );
}
 
export default Header;