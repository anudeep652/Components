import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllComponents } from "../features/Components/componentSlice";

const Table = () => {
  const dispatch = useDispatch();

  let components = useSelector(
    (state) => state?.components?.components?.components
  );

  

  const calculateBatches = (component) => {
    let temp = 0
    component?.batches?.map((el) => temp += el.issuedQuantityB)
    return temp
  }
  console.log(components)
  

  useEffect(() => {
    dispatch(getAllComponents());
  },[]);

  return (
    <>
      <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Component name
            </th>
            <th scope="col" className="py-3 px-6">
              Total no
            </th>
            <th scope="col" className="py-3 px-6">
              No of Batch
            </th>
            <th scope="col" className="py-3 px-6">
              Company name
            </th>
          </tr>
        </thead>
        <tbody id="box">
          {/* <table border="1|1"> */}
          {components?.map((component, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              key={index}
            >
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Link to={`/${component.name}/batches`}>{component.name}</Link>
              </th>
              <td className="py-4 px-6">
                {calculateBatches(component)}
              </td>
              <td className="py-4 px-6">
                {component.batches ? component.batches.length : 0}
              </td>
              <td className="py-4 px-6">
                {component.companyName ? component.companyName : ""}
              </td>
            </tr>
          ))}

          {/* </table> */}
        </tbody>
      </table>
    </>
  );
};

export default Table;
