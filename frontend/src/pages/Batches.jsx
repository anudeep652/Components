import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  deleteABatch,
  setCurrComponent,
} from "../features/Components/componentSlice";
import Nav from "../components/Nav";
import { Box, Button, Modal, Typography } from "@mui/material";

const Batch = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [deleteBatch, setDeleteBatch] = useState("");
  // const navigate = useNavigate();
  const { name } = useParams();
  let { components, user } = useSelector((state) => state?.components);
  // let currComponent = useSelector((state) => state?.components?.currComponent);

  let component = components?.filter((c) => c.name === name);
  // console.log(component);
  useEffect(() => {
    // dispatch(getAllComponents());
    dispatch(setCurrComponent(component));
  }, []);

  // console.log(currComponent);
  // console.log(components)
  // console.log(currComponent);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const handleClick = (batchName) => {
    // console.log(component);
    dispatch(deleteABatch(batchName));
    setDeleteBatch("");
  };

  const calcProgress = (name) => {
    const reqBatch = component[0].batches.filter((b) => b.batchName === name);
    // console.log(reqBatch);
    if (
      reqBatch[0]?.process[0]?.issuedQuantity === 0 &&
      reqBatch[0]?.process[1]?.issuedQuantity !== 0
    ) {
      return "Completed";
    } else {
      return "Progress";
    }
  };

  const calcCompleted = (name) => {
    const reqBatch = component[0].batches.filter((b) => b.batchName === name);
    // console.log(reqBatch[0].process.length);
    return reqBatch[0].process[reqBatch[0].process.length - 1]?.issuedQuantity;
  };

  const calcRemaining = (name) => {
    const reqBatch = component[0].batches.filter((b) => b.batchName === name);
    if (reqBatch[0].process.every((el) => el.issuedQuantity === 0)) {
      return reqBatch[0].issuedQuantityB;
    }

    const lastIndex = reqBatch[0].process.length - 1;
    let remaining = 0;
    reqBatch[0].process.forEach((p, index) =>
      index !== lastIndex ? (remaining += p.issuedQuantity) : p
    );
    // const reqArr = reqBatch[0].process.filter((p,index) => index !== reqBatch[0].process.length - 1 )
    return remaining;
  };

  const calcTotalQuantity = (index) => {
    return component[0]?.batches?.reduce((acc, b) => {
      if (b?.process.every((p) => p?.issuedQuantity === 0) && index === 0) {
        return acc + b.issuedQuantityB;
      } else {
        return acc + b.process[index].issuedQuantity;
      }
    }, 0);
  };

  const calcTotalQuantityRejected = (index) => {
    return component[0]?.batches?.reduce((acc, b) => {
      return acc + b.process[index].rejected;
    }, 0);
  };

  const calcRejected = (batchName) => {
    const reqBatch = component[0].batches.filter(
      (b) => b.batchName === batchName
    );

    return (
      reqBatch[0].issuedQuantityB -
      reqBatch[0]?.process.reduce((acc, p) => acc + p.issuedQuantity, 0)
    );
  };

  return (
    <div>
      <Nav />
      <Link
        to={`/${name}/create-batch`}
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
        Create Batch
      </Link>
      {user === "admin" && (
        <>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg my-10">
            <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Process name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Total quantity running in all batches per process
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Total quantity rejected in all batches per process
                  </th>
                </tr>
              </thead>
              <tbody id="box">
                {component[0]?.process.map((p, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    key={p._id}
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {p.processName}
                    </th>
                    <td className="py-4 px-6">{calcTotalQuantity(index)}</td>
                    <td className="py-4 px-6">
                      {calcTotalQuantityRejected(index)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Batch
              </th>
              {user === "admin" && (
                <>
                  <th scope="col" className="py-3 px-6">
                    Progress
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Remaining no
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Completed no
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Rejected no
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Delete batch
                  </th>
                </>
              )}
            </tr>
          </thead>
          <Modal open={openModal}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure want to delete?
              </Typography>
              <Button
                className="py-3"
                onClick={(e) => {
                  handleClick(deleteBatch);
                  setOpenModal(false);
                  setDeleteBatch("");
                }}
              >
                Yes
              </Button>
              <Button
                className="py-5"
                onClick={(e) => {
                  setOpenModal(false);
                  setDeleteBatch("");
                }}
              >
                No
              </Button>
            </Box>
          </Modal>
          <tbody id="box">
            {component[0]?.batches?.map((batch) => (
              <tr
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                key={batch._id}
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link to={`/${name}/${batch.batchName}/process`}>
                    {batch.batchName}
                  </Link>
                </th>
                {user === "admin" && (
                  <>
                    <td className="py-4 px-6">
                      {calcProgress(batch.batchName)}
                    </td>
                    <td className="py-4 px-6">
                      {calcRemaining(batch.batchName)}
                    </td>
                    <td className="py-4 px-6">
                      {calcCompleted(batch.batchName)}
                    </td>
                    <td className="py-4 px-6">
                      {calcRejected(batch.batchName)}
                    </td>

                    <button className="py-4 px-16">
                      <DeleteIcon
                        onClick={(e) => {
                          e.preventDefault();
                          setDeleteBatch(batch.batchName);
                          setOpenModal(true);
                        }}
                        fontSize="medium"
                      />
                    </button>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Batch;
