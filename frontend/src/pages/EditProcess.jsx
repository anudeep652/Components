import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import {
  modifyProcess,
  reset,
  setCurrBatch,
} from "../features/Components/componentSlice";

const EditProcess = () => {
  let [accepted, setAccepted] = useState([]);
  let [rejected, setRejected] = useState([]);
  const [error, setError] = useState(false);

  let { isError, message, isSuccess } = useSelector(
    (state) => state?.components
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, batchName } = useParams();

  let { currComponent } = useSelector(
    (state) => state?.components?.currComponent
  );

  currComponent = useSelector((state) => state.components?.currComponent);
  currComponent = JSON.parse(JSON.stringify(currComponent));
  dispatch(setCurrBatch(batchName));
  // const { currBatchName } = useSelector((state) => state?.components);
  // console.log(currBatchName);
  // console.log(currComponent);
  let { components } = useSelector((state) => state.components);

  let batchIndex = currComponent[0].batches?.map(
    (el, index) => el.batchName === batchName && index
  );
  batchIndex = batchIndex.filter((el) => typeof el === "number");

  let component = components?.filter((c) => c.name === name);
  // console.log(component);

  let currBatch = component[0]?.batches.map(
    (el) => el.batchName === batchName && el
  );
  currBatch = currBatch?.filter((el) => typeof el === "object");

  // console.log(currBatch);

  let isProcessQuantityEmpty = currComponent[0]?.batches[
    batchIndex[0]
  ]?.process.every((el) => el.issuedQuantity === 0);

  // console.log(isProcessQuantityEmpty);

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

  // console.log(tempArray);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // accepted.forEach((el) => console.log(typeof el));
    accepted = accepted.filter((el) => el !== undefined);
    rejected = rejected.filter((el) => el !== undefined);
    // console.log(accepted);
    // console.log(rejected);
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
      // console.log(isProcessQuantityEmpty);
      tempArray = tempArray[0];

      tempArray?.map(
        (el, index, array) => typeof el === "number" && array.splice(index, 1)
      );
    }
    // console.log(accepted);
    // console.log(tempArray);

    // console.log(data);
    if (accepted.length > 0) {
      tempArray = accepted?.map((el, index) => {
        if (tempArray?.[el.index] && el?.issuedQuantity) {
          return [
            ...tempArray,
            (tempArray[el.index].issuedQuantity -= el.issuedQuantity),
            // tempArray[el.index + 1]?.issuedQuantity &&
            (tempArray[el.index + 1].issuedQuantity += el?.issuedQuantity),
          ];
        } else {
          return el;
        }
      });
      //accepted =[{processName:"rdf",issuedQuantity:30,index:0}]

      // console.log(tempArray);

      tempArray = tempArray[0];
    }

    if (rejected.length > 0) {
      tempArray = rejected?.map((el, index) => {
        if (tempArray?.[el.index] && el?.issuedQuantity) {
          return [
            ...tempArray,
            (tempArray[el.index].issuedQuantity -= el.issuedQuantity),
          ];
        } else {
          return el;
        }
      });
      // console.log(tempArray);
      tempArray = tempArray[0];
    }

    const calcRejected = (el, index) => {
      for (let r of rejected) {
        if (r.processName === el.processName) {
          return el.rejected + r.issuedQuantity;
        }
      }
      return 0;
    };

    tempArray?.forEach((el, index) => {
      if (typeof el !== "number" && typeof el !== "undefined") {
        data.push({
          processName: el?.processName,
          issuedQuantity: el?.issuedQuantity,
          rejected: calcRejected(el, index),
        });
      }
    });

    // console.log(data);
    // console.log(tempArray);
    if (data.some((el) => el.issuedQuantity < 0)) {
      setError(true);
    } else {
      setError(false);

      // console.log(data);
      dispatch(modifyProcess({ process: data }));
    }

    // console.log(rejected);
  };

  useEffect(() => {
    if (!isError && isSuccess && message === "") {
      navigate(`/${name}/${batchName}/process`, { replace: true });
      dispatch(reset());
    }
  }, [isError, isSuccess, navigate, name, message, dispatch, batchName]);

  return (
    <>
      <Nav />
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold mx-10">
            Issued quantity is negative
          </strong>
          {/* <span className="block sm:inline">{message}</span> */}

          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <button onClick={() => setError(false)}>
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </button>
          </span>
        </div>
      )}
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
                (comp, index, arr) => (
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
                      {!(index === arr.length - 1) && (
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
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:fo
                        cus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {!(index === arr.length - 1) && (
                        <input
                          aria-hidden
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
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                        />
                      )}
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
