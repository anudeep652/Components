import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllComponents } from "../features/Components/componentSlice";

const Nav = () => {
   return (
     <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 mb-2">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
          <a href="index.html" class="flex items-center">
              <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Unique Automation</span>
          </a>
      </nav>
   );
};
