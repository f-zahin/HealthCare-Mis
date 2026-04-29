import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUser,
  FaPrescriptionBottleAlt,
  FaUserInjured,
  FaPumpMedical,
  
} from "react-icons/fa";
const AdminSidebar = () => {
  return (
    <div className="bg-cyan-950 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-600 h-15 items-center flex justify-center">
        <h3 className="text-2xl text-center">Hospital MIS</h3>
      </div>
      <div className="px-4">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-600" : ""} flex items-center space-x-2 py-2.5 px-4 rounded`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="book-appointment"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-600" : ""} flex items-center space-x-2 py-2.5 px-4 rounded`
          }
          end
        >
          <FaBuilding />
          <span>Book Appointment</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/appointment-history"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-600" : ""} flex items-center space-x-2 py-2.5 px-4 rounded`
          }
          end
        >
          <FaUser />
          <span>Appointment History</span>
        </NavLink>

        <NavLink
          to="prescription"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-600" : ""} flex items-center space-x-2 py-2.5 px-4 rounded`
          }
          end
        >
          <FaPrescriptionBottleAlt />
          <span>Prescription</span>
        </NavLink>

        <NavLink
          to="doctors"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-600" : ""} flex items-center space-x-2 py-2.5 px-4 rounded`
          }
          end
        >
          <FaPumpMedical />
          <span>Doctors</span>
        </NavLink>

         

        <NavLink
          to="/admin-dashboard/user"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
          }
          end
        >
          <FaUser />
          <span>User</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/user/setting"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
          }
          end
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
