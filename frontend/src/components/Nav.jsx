import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 mb-2">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to={"/"} className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Unique Automation
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
