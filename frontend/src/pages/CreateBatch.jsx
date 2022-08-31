import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { modifyBatches } from "../features/Components/componentSlice";

const CreateBatch = () => {
  const [batchItems, setBatchItems] = useState({
    batchName: "",
    issuedQuantity: 0,
  });
  const { name } = useParams();
  const { components } = useSelector((state) => state?.components);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(components)
  console.log(name);

  const handleSubmit = (e) => {
    e.preventDefault();
    let requiredComponent = components.components.filter(
      (c) => c.name === name
    );

    let tempArray = [];
    requiredComponent[0]?.batches.forEach((el) => tempArray.push(el));
    tempArray.push({
      batchName: batchItems.batchName,
      issuedQuantityB: Number(batchItems.issuedQuantity),
      process: requiredComponent[0].process,
    });
    console.log(tempArray);
    let data = { batches: tempArray };
    console.log(data);

    dispatch(modifyBatches(data));
    navigate(`/${name}/batches`);

    setBatchItems({ batchName: "", issuedQuantity: 0 });
  };

  return (
    <>
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
