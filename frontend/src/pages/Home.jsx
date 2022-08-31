import React from "react";
import { Link } from "react-router-dom";
import Table from "../components/Table";

const Home = () => {
  return (
    <>
      <Link
        to="/component/create"
        className="duration-300 ml-4 mt-4 mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Create Component
      </Link>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <Table />
      </div>
    </>
  );
};

export default Home;
