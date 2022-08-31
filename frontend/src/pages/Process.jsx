import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllComponents, setCurrComponent } from "../features/Components/componentSlice";
const Process = () => {
  const { name,batchName } = useParams();

  

  let { currComponent } = useSelector(
    (state) => state.components
  );
  // currComponent = useSelector((state) => state.components?.currComponent);
  console.log(currComponent);
  let batchIndex =currComponent[0].batches.map((el,index) => el.batchName === batchName && index )
  batchIndex = batchIndex.filter((el) => typeof el==='number')
  console.log(batchIndex)
  let { components } = useSelector((state) => state.components?.components);
  
  const dispatch = useDispatch();

 
  
  let component = components?.filter((c) => c.name === name);

  let isProcessQuantityEmpty = currComponent[0]?.batches[
    batchIndex[0]
  ]?.process.every((el) => el.issuedQuantity ===0)
  
  useEffect(() => {
    dispatch(getAllComponents())
    dispatch(setCurrComponent(component))


  },[])
  // const isProcessQuantityEmpty = (index) => {

  //   return component[0]?.batches[batchIndex[0]]?.process[index]?.issuedQuantity === 0
  // }
  
  let issuedQuantity = currComponent[0].batches.filter((c) => c.batchName === batchName)
  console.log(issuedQuantity)  

  return (
    <>
      <Link
        to={`/${name}/${batchName}/edit-process`}
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
        Edit
      </Link>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Process
              </th>
              <th scope="col" className="py-3 px-6">
                Issued QTY
              </th>
            </tr>
          </thead>
          <tbody id="box">
            {currComponent[0]?.batches[batchIndex[0]]?.process?.map((comp,index) => (
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={index}>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {comp.processName}
                </th>
                <td className="py-4 px-6">{ isProcessQuantityEmpty ? (index === 0 ? issuedQuantity[index]?.issuedQuantityB : 0) :comp?.issuedQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Process;
