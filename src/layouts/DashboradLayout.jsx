import {
  FaBook,
  FaHome,
  FaSearch,
  FaUser,
  FaBars,
  FaTimes,
  FaTasks,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Outlet } from "react-router";
import { Link } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../pages/providers/AuthProvider";
const DashboradLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-white shadow-md p-5 h-screen flex flex-col fixed lg:relative transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64 lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold ml-3">TaskPro</h2>
          {/* Close Icon for Mobile */}
          <button
            className="lg:hidden text-gray-700 cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="flex-1">
          <ul>
            <li className="mb-3">
              <Link
                to="/dashboard"
                className="flex items-center space-x-3 text-gray-700 hover:bg-gray-200 p-3 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                {/* <FaHome /> */}
                <FaTasks />
                <span>Task</span>
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/dashboard/profile"
                className="flex items-center space-x-3 text-gray-700 hover:bg-gray-200 p-3 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaUser />
                <span>Profile</span>
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/dashboard/notes"
                className="flex items-center space-x-3 text-gray-700 hover:bg-gray-200 p-3 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaBook />
                <span>Notes</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <Link
            to="/dashboard/settings"
            className="flex items-center space-x-3 text-gray-700 hover:bg-gray-200 p-3 rounded"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiSettings />
            <span>Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <header className="bg-white shadow px-6 py-3 flex justify-between items-center">
          {/* Mobile Sidebar Toggle */}
          <button
            className="lg:hidden text-gray-700 cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars size={24} />
          </button>

          {/* Search Box */}
          <div className="flex items-center flex-1 lg:justify-between justify-end">
            <div className="hidden w-[300px] lg:block">
              <label className="input">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input type="search" required placeholder="Search" />
              </label>
            </div>
            {/* User Profile Image */}
            <div className="flex items-center gap-3">
              <button onClick={logOut} className="btn btn-neutral mb-2 mt-4 ">
                Logout
              </button>
              <img
                src={user?.photoURL}
                className="w-12 h-12 rounded-full"
                alt="User Profile"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboradLayout;
