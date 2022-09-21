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

  const calcRemaining = (component) => {
    // console.log(component);
    if (component?.batches?.length > 0) {
      return component?.batches?.reduce((acc, b) => {
        if (b?.process?.length > 0) {
          return (acc += b?.process?.every((p) => p?.issuedQuantity === 0)
            ? b.issuedQuantityB
            : b?.process?.reduce((a, p) => (a += p?.issuedQuantity), 0) -
              b?.process[b?.process.length - 1].issuedQuantity);
        } else {
          return 0;
        }
      }, 0);
    } else {
      return 0;
    }
  };

  const calcRejected = (component) => {
    let rejected = 0;

    component?.batches?.length > 0 &&
      component?.batches.forEach((b) => {
        if (
          b.process.length > 0 &&
          b.process.every((p) => p.issuedQuantity === 0)
        ) {
          rejected += 0;
        } else {
          if (b?.process.length > 0) {
            rejected +=
              b.issuedQuantityB -
              b.process.reduce((acc, p) => (acc += p?.issuedQuantity), 0);
          }
        }
      });

    return rejected;
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
              Remaining No
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
              <td className="py-4 px-6">{calcCompleted(component)}</td>
              <td className="py-4 px-6">{calcRemaining(component)}</td>
              <td className="py-4 px-6">{calcRejected(component)}</td>
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
