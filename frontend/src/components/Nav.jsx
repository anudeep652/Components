import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/Components/componentSlice";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 mb-2 flex">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to={"/"} className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Unique Automation
          </span>
        </Link>
      </div>
      <div className="logout p-2">
        <button
          className="bg-blue-700 text-white mr-5 pl-3 pr-3 pb-1 pt-1 hover:bg-blue-800 rounded"
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Nav;
