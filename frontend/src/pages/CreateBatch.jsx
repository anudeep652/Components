import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import {
  modifyBatches,
  reset,
  setBatchError,
  setIsError,
} from "../features/Components/componentSlice";

const CreateBatch = () => {
  let { isError, message, isSuccess } = useSelector(
    (state) => state?.components
  );

  const [batchItems, setBatchItems] = useState({
    batchName: "",
    issuedQuantity: 0,
  });
  const { name } = useParams();
  const { components } = useSelector((state) => state?.components);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(components)
  // console.log(name);

  const handleSubmit = (e) => {
    e.preventDefault();
    let requiredComponent = components.filter((c) => c.name === name);

    let tempArray = [];
    requiredComponent[0]?.batches.forEach((el) => tempArray.push(el));
    if (tempArray.some((el) => el.batchName === batchItems.batchName)) {
      dispatch(setBatchError());
    } else {
      tempArray.push({
        batchName: batchItems.batchName.trim(),
        issuedQuantityB: Number(batchItems.issuedQuantity),
        process: requiredComponent[0].process,
      });
      // console.log(tempArray);
      let data = { batches: tempArray };
      // console.log(data);
      // console.log(tempArray);
      dispatch(modifyBatches(data));

      setBatchItems({ batchName: "", issuedQuantity: 0 });
    }
  };

  useEffect(() => {
    if (!isError && isSuccess && message === "") {
      navigate(`/${name}/batches`);
      dispatch(reset());
    }
  }, [isError, isSuccess, navigate, name, message, dispatch]);

  return (
    <>
      <Nav />
      {isError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold mx-10">{message}</strong>
          {/* <span className="block sm:inline">{message}</span> */}

          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <button onClick={() => dispatch(setIsError())}>
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
        <div className="mt-4 ml-4 mr-4">
          <div className="mb-6">
            <h6 className="text-lg font-bold dark:text-white">
              Create a name for the Batch
            </h6>

            <div className="mt-4 ml-4 mr-4">
              <label
                htmlFor="default-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Batch Name
              </label>
              <input
                type="text"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                value={batchItems.batchName}
                onChange={(e) =>
                  setBatchItems({ ...batchItems, batchName: e.target.value })
                }
                required
              />
            </div>

            <div className="mt-4 ml-4 mr-4">
              <label
                htmlFor="default-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Issued QTY
              </label>
              <input
                type="number"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                value={batchItems.issuedQuantity}
                onChange={(e) =>
                  setBatchItems({
                    ...batchItems,
                    issuedQuantity: e.target.value,
                  })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="duration-300 ml-4 mt-4 mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateBatch;
