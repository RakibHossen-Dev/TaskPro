import { FaPen, FaPenAlt } from "react-icons/fa";
import {
  FaFacebook,
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";

import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
const Profile = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div>
      <div className=" bg-gray-100 ">
        <div className="  lg:px-6">
          <h3 className="mb-5 text-2xl font-semibold mt-3">Profile</h3>
          <div className=" bg-white  rounded-lg p-6 border border-gray-200">
            {/* Profile Header */}
            <h3 className="text-lg font-semibold mb-3">Profile</h3>

            <div className="flex lg:flex-row flex-col justify-center items-center gap-4 border border-gray-200 rounded-lg p-4">
              <img
                src={user?.photoURL}
                alt="Profile"
                className="w-20 h-20 rounded-full border"
              />
              <div>
                <h2 className="text-xl font-bold lg:text-start text-center">
                  {user?.displayName}
                </h2>
                <p className="text-gray-600 lg:text-start text-center">
                  Team Manager | Leeds, United Kingdom
                </p>
              </div>
              <div className="lg:ml-auto flex gap-3">
                <FaFacebook className="text-4xl text-gray-500 border-gray-200 cursor-pointer hover:text-blue-600 border p-1.5 rounded-full" />
                <FaXTwitter className="text-4xl text-gray-500 border-gray-200  cursor-pointer hover:text-black border p-1.5 rounded-full" />
                <FaLinkedin className="text-4xl text-gray-500 border-gray-200 cursor-pointer hover:text-blue-500 border p-1.5 rounded-full" />
                <FaInstagram className="text-4xl text-gray-500 border-gray-200  cursor-pointer hover:text-pink-500 border p-1.5 rounded-full" />
              </div>
              <button className="text-gray-500 border-gray-200   lg:w-auto w-full justify-center flex items-center gap-2 border px-3 py-1 rounded-full">
                <FaPen></FaPen>
                Edit
              </button>
            </div>

            {/* Personal Information */}
            <div className="mt-8 p-4 border border-gray-200 rounded-lg">
              <div className="flex lg:flex-row flex-col justify-between items-center">
                <h3 className="text-lg font-semibold">Personal Information</h3>

                <button className="text-gray-500 border-gray-200  hidden lg:flex items-center gap-2 border px-3 py-1 rounded-full">
                  <FaPen></FaPen>
                  Edit
                </button>
              </div>
              <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-4 text-gray-700">
                <p>
                  <span className="text-sm text-gray-500">First Name</span>
                  <br />
                  <strong>{user?.displayName?.split(" ")[0]}</strong>
                </p>
                <p>
                  <span className="text-sm text-gray-500">Last Name</span>
                  <br />
                  <strong>{user?.displayName?.split(" ")[1]}</strong>
                </p>
                <p>
                  <span className="text-sm text-gray-500">Email</span>
                  <br />
                  <strong>{user?.email}</strong>
                </p>
                <p>
                  <span className="text-sm text-gray-500">Phone</span>
                  <br />
                  <strong>+09 363 398 46</strong>
                </p>
                <p>
                  <span className="text-sm text-gray-500">Bio</span>

                  <br />
                  <strong>Team Manager</strong>
                </p>
                <button className="text-gray-500 border-gray-200  lg:hidden justify-center flex items-center gap-2 border px-3 py-1 rounded-full">
                  <FaPen></FaPen>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
