import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllComponents,
  modifyProcess,
  setCurrBatch,
  setCurrComponent,
} from "../features/Components/componentSlice";

const EditProcess = () => {
  let [accepted, setAccepted] = useState([]);
  let [rejected, setRejected] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, batchName } = useParams();

  let { currComponent } = useSelector(
    (state) => state?.components?.currComponent
  );

  currComponent = useSelector((state) => state.components?.currComponent);
  currComponent = JSON.parse(JSON.stringify(currComponent));
  dispatch(setCurrBatch(batchName));
  const { currBatchName } = useSelector((state) => state?.components);
  console.log(currBatchName);
  console.log(currComponent);
  let { components } = useSelector((state) => state.components?.components);

  let batchIndex = currComponent[0].batches?.map(
    (el, index) => el.batchName === batchName && index
  );
  batchIndex = batchIndex.filter((el) => typeof el === "number");

  let component = components?.filter((c) => c.name === name);
  console.log(component);

  let currBatch = component[0].batches.map(
    (el) => el.batchName === batchName && el
  );
  currBatch = currBatch.filter((el) => typeof el === "object");

  console.log(currBatch);

  let isProcessQuantityEmpty = currComponent[0]?.batches[
    batchIndex[0]
  ]?.process.every((el) => el.issuedQuantity === 0);

  console.log(isProcessQuantityEmpty);

  // const isProcessQuantityEmptyF = (index) => {
  //   return (
  //     component[0]?.batches[batchIndex[0]]?.process[index]?.issuedQuantity === 0
  //   );
  // };

  let issuedQuantity = currComponent[0].batches.filter(
    (c) => c.batchName === batchName
  );
  let tempArray = [];
  let data = [];
  currComponent[0]?.batches[batchIndex[0]]?.process?.map((el) =>
    tempArray.push(el)
  );

  console.log(tempArray);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isProcessQuantityEmpty) {
      tempArray = tempArray?.map((el, index, arr) => {
        if (isProcessQuantityEmpty) {
          if (index === 0) {
            return [
              ...arr,
              (el.issuedQuantity = Number(issuedQuantity[0]?.issuedQuantityB)),
            ];
          } else {
            return el;
          }
          // return el;
        }
      });
      console.log(isProcessQuantityEmpty);
      tempArray = tempArray[0];

      tempArray?.map(
        (el, index, array) => typeof el === "number" && array.splice(index, 1)
      );
    }
    console.log(accepted);
    console.log(tempArray);

    // console.log(data);
    tempArray = accepted?.map((el, index) => {
      if (tempArray[el.index] && el?.issuedQuantity) {
        return [
          ...tempArray,
          (tempArray[el.index].issuedQuantity -= el.issuedQuantity),
          (tempArray[el.index + 1].issuedQuantity += el.issuedQuantity),
        ];
      } else {
        return el;
      }
    });
    //accepted =[{processName:"rdf",issuedQuantity:30,index:0}]

    console.log(tempArray);

    tempArray = tempArray[0];

    if (rejected.length > 0) {
      tempArray = rejected?.map((el, index) => {
        if (tempArray[el.index] && el?.issuedQuantity) {
          return [
            ...tempArray,
            (tempArray[el.index].issuedQuantity -= el.issuedQuantity),
          ];
        } else {
          return el;
        }
      });
      tempArray = tempArray[0];
    }

    tempArray?.map((el) => {
      if (typeof el !== "number") {
        data.push({
          processName: el.processName,
          issuedQuantity: el.issuedQuantity,
        });
      }
    });

    console.log(data);
    console.log(tempArray);
    console.log(data);
    await dispatch(modifyProcess({ process: data }));
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className=" mt-8 overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Process
                </th>
                <th scope="col" className="py-3 px-6">
                  Issued QTY
                </th>
                <th scope="col" className="py-3 px-6">
                  Accepted
                </th>
                <th scope="col" className="py-3 px-6">
                  Rejected
                </th>
              </tr>
            </thead>
            <tbody id="box">
              {currComponent[0]?.batches[batchIndex[0]]?.process?.map(
                (comp, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {comp.processName}
                    </th>
                    <td className="py-4 px-6">
                      {isProcessQuantityEmpty
                        ? index === 0
                          ? issuedQuantity[index]?.issuedQuantityB
                          : 0
                        : comp?.issuedQuantity}
                    </td>
                    <td className="py-4 px-6">
                      <input
                        value={accepted[index]?.value}
                        onChange={(e) =>
                          (accepted[index] = {
                            processName: comp.processName,
                            issuedQuantity: Number(e.target.value),
                            index: Number(index),
                          })
                        }
                        type="number"
                        id="visitors"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        value={rejected[index]?.value}
                        onChange={(e) =>
                          (rejected[index] = {
                            processName: comp.processName,
                            issuedQuantity: Number(e.target.value),
                            index: Number(index),
                          })
                        }
                        type="number"
                        id="visitors"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <button
          type="submit"
          className="duration-300 ml-4 mt-4 mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default EditProcess;
