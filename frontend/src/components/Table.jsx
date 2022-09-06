import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteAComponent,
  getAllComponents,
} from "../features/Components/componentSlice";
import DeleteIcon from "@mui/icons-material/Delete";

const Table = () => {
  const dispatch = useDispatch();

  let components = useSelector((state) => state?.components?.components);

  const calculateBatches = (component) => {
    let temp = 0;
    component?.batches?.map((el) => (temp += el.issuedQuantityB));
    return temp;
  };
  // console.log(components);

  const handleClick = (component) => {
    // console.log(component);

    dispatch(deleteAComponent(component));
  };

  const calcCompleted = (component) => {
    let completed = 0;
    let temp;

    temp =
      component?.batches?.length > 0
        ? component?.batches?.forEach((el) => {
            // console.log(el.process.length)
            if (el.process.length > 0) {
              completed += el?.process[el.process.length - 1]?.issuedQuantity;
            }
          })
        : 0;

    return completed;
  };

  const calcRejected = (component) => {
    let batchQuantity = 0;
    let totalProcessQuantity = 0;
    batchQuantity =
      component?.batches?.length > 0
        ? component?.batches?.reduce((acc, b) => (acc += b?.issuedQuantityB), 0)
        : 0;

    let temp;
    temp =
      component?.batches?.length > 0
        ? component?.batches.forEach((el) => {
            if (el.process.length > 0) {
              if (el.process.every((el) => el?.issuedQuantity === 0)) {
                // console.log("Hi");
                batchQuantity = 0;
              }
              for (let p of el.process) {
                totalProcessQuantity += p.issuedQuantity;
              }
            }
          })
        : 0;

    return batchQuantity - totalProcessQuantity;
  };

  useEffect(() => {
    dispatch(getAllComponents());
  }, []);

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
              Completed No
            </th>
            <th scope="col" className="py-3 px-6">
              Rejected No
            </th>
            <th scope="col" className="py-3 px-6">
              Company name
            </th>
            <th scope="col" className="py-3 px-6">
              Delete Component
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
              <td className="py-4 px-6">{calculateBatches(component)}</td>
              <td className="py-4 px-6">
                {component.batches ? component.batches.length : 0}
              </td>
              <td>{calcCompleted(component)}</td>
              <td>{calcRejected(component)}</td>
              <td className="py-4 px-6">
                {component.companyName ? component.companyName : ""}
              </td>

              <button className="py-4 px-16">
                <DeleteIcon
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(component.name);
                  }}
                  fontSize="medium"
                />
              </button>
            </tr>
          ))}

          {/* </table> */}
        </tbody>
      </table>
    </>
  );
};

export default Table;
