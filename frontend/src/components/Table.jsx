import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteAComponent,
  getAllComponents,
} from "../features/Components/componentSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";

const Table = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [deleteComponent, setDeleteComponent] = useState("");
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

  let components = useSelector((state) => state?.components?.components);
  let user = useSelector((state) => state.components.user);
  console.log(user);

  const calculateBatches = (component) => {
    let temp = 0;
    component?.batches?.map((el) => (temp += el.issuedQuantityB));
    return temp;
  };
  // console.log(components);

  const handleClick = (component) => {
    console.log(component);

    dispatch(deleteAComponent(component));
    setDeleteComponent("");
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
      component?.batches?.forEach((b) => {
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
            <th scope="col" className="py-3 px-6 ">
              Component name
            </th>
            {user === "admin" && (
              <>
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
              </>
            )}
          </tr>
        </thead>
        <tbody id="box">
          {/* <table border="1|1"> */}
          {components?.map((component, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              key={index}
            >
              {user === "admin" ? (
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link to={`/${component.name}/batches`}>
                    {component.name}
                  </Link>
                </th>
              ) : (
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link to={`/${component.name}/batches`}>
                    {component.name}
                  </Link>
                </th>
              )}
              {user === "admin" && (
                <>
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
                  <Modal open={openModal}>
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Are you sure want to delete?
                      </Typography>
                      <Button
                        className="py-3"
                        onClick={(e) => {
                          console.log(component.name);
                          handleClick(deleteComponent);
                          setOpenModal(false);
                          setDeleteComponent("");
                        }}
                      >
                        Yes
                      </Button>
                      <Button
                        className="py-5"
                        onClick={(e) => {
                          setOpenModal(false);
                          setDeleteComponent("");
                        }}
                      >
                        No
                      </Button>
                    </Box>
                  </Modal>

                  <button className="py-4 px-6">
                    <DeleteIcon
                      fontSize="medium"
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        setDeleteComponent(component.name);
                        setOpenModal(true);
                      }}
                    />
                  </button>
                </>
              )}
            </tr>
          ))}

          {/* </table> */}
        </tbody>
      </table>
    </>
  );
};

export default Table;
